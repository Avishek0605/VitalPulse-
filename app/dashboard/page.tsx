'use client';

import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Alert, Patient, getVitalStatus, statusBg, statusColor, timeAgo } from '@/types/database';

function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const isAuthed = typeof window !== 'undefined' && window.localStorage.getItem('vp_auth') === 'true';

    if (!isAuthed) {
      router.replace('/login');
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#0A1628]'>
        <div className='flex flex-col items-center gap-3 text-cyan-300'>
          <div className='h-10 w-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent' />
          <p className='text-sm'>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function DashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');

    try {
      const supabase = getSupabaseClient();
      const [pRes, aRes] = await Promise.all([
        supabase.from('patients').select('*').eq('id', 'VP-2024-001').single(),
        supabase.from('alerts').select('*').eq('patient_id', 'VP-2024-001').order('timestamp', { ascending: false }).limit(5),
      ]);

      if (pRes.error || aRes.error) {
        setError(pRes.error?.message || aRes.error?.message || 'Failed to load dashboard data');
        return;
      }

      setPatient(pRes.data as Patient);
      setAlerts((aRes.data as Alert[]) ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();

    const supabase = getSupabaseClient();

    const patientChannel = supabase
      .channel('patient-realtime')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'patients', filter: 'id=eq.VP-2024-001' },
        (payload) => {
          setConnected(true);
          setPatient(payload.new as Patient);
        }
      )
      .subscribe();

    const alertChannel = supabase
      .channel('alert-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'alerts', filter: 'patient_id=eq.VP-2024-001' },
        (payload) => {
          setConnected(true);
          setAlerts((prev) => [payload.new as Alert, ...prev].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(patientChannel);
      supabase.removeChannel(alertChannel);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('vp_auth');
    localStorage.removeItem('vp_patient_id');
    router.replace('/login');
  };

  return (
    <AuthGuard>
      <div className='min-h-screen bg-[#0A1628] pb-24 text-white'>
        <div className='mx-auto max-w-lg space-y-3 p-3'>
          <TopBar />

          {loading ? (
            <div className='space-y-3'>
              <div className='h-20 animate-pulse rounded-2xl bg-[#0F2033]' />
              <div className='grid grid-cols-2 gap-3'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='h-24 animate-pulse rounded-2xl bg-[#0F2033]' />
                ))}
              </div>
            </div>
          ) : error || !patient ? (
            <div className='rounded-2xl bg-[#0F2033] p-5 text-red-300'>
              <p>{error || 'No patient data found.'}</p>
              <button
                className='mt-3 rounded bg-cyan-500 px-3 py-1 font-semibold text-black'
                onClick={() => void load()}
              >
                Retry
              </button>
            </div>
          ) : (
            <>
              {patient.status === 'critical' && (
                <div className='animate-pulse rounded-xl border border-red-400 bg-red-500/20 p-2 text-red-200'>
                  🚨 Critical condition: Medical team is aware and responding.
                </div>
              )}

              <section className={`rounded-2xl border p-4 ${statusBg(patient.status)}`}>
                <h1 className='text-2xl font-bold'>{patient.name}</h1>
                <p className='text-sm text-[#A0AEC0]'>
                  {patient.ward} · Bed {patient.bed} · Dr. {patient.doctor} · Age {patient.age}
                </p>
                <div className='mt-2 flex items-center gap-2'>
                  <span className={`rounded-full px-3 py-1 text-xs uppercase ${statusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-emerald-400' />
                  Updated {timeAgo(patient.updated_at)}
                  <span className={`ml-auto h-2 w-2 rounded-full ${connected ? 'bg-cyan-400' : 'bg-gray-500'}`} />
                </div>
              </section>

              <div className='grid grid-cols-2 gap-3'>
                {[
                  ['Heart Rate', patient.heart_rate, 'bpm', 'heart_rate', 'border-red-400'],
                  ['SpO2', patient.spo2, '%', 'spo2', 'border-cyan-400'],
                  ['BP Systolic', patient.bp_systolic, 'mmHg', null, 'border-amber-400'],
                  ['BP Diastolic', patient.bp_diastolic, 'mmHg', null, 'border-amber-400'],
                  ['Temperature', patient.temperature, '°F', 'temperature', 'border-purple-400'],
                ].map(([label, val, unit, key, border]) => (
                  <div key={String(label)} className={`rounded-2xl border-t-2 ${border} bg-[#0F2033] p-3`}>
                    <p className='text-xs text-[#A0AEC0]'>{label}</p>
                    <p className='text-2xl font-bold'>{val}</p>
                    <p className={`text-xs ${key ? statusColor(getVitalStatus(key as never, Number(val))) : 'text-[#A0AEC0]'}`}>{unit}</p>
                  </div>
                ))}
              </div>

              <div className='rounded-2xl border-t-2 border-emerald-400 bg-[#0F2033] p-3'>
                <p className='text-xs text-[#A0AEC0]'>Respiratory Rate</p>
                <p className='text-2xl font-bold'>{patient.resp_rate}</p>
                <p className='text-xs'>breaths/min</p>
              </div>

              <section className='rounded-2xl bg-[#0F2033] p-3'>
                <h3 className='mb-2 font-semibold'>Recent Alerts</h3>
                {alerts.slice(0, 2).map((a) => (
                  <div key={a.id} className='mb-2 rounded-lg border-l-2 border-cyan-400 bg-white/5 p-2 text-sm'>
                    {a.message}
                  </div>
                ))}
                <Link href='/alerts' className='text-sm text-cyan-400'>
                  View all alerts →
                </Link>
              </section>
            </>
          )}

          <button
            onClick={logout}
            className='w-full rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-200'
          >
            Logout
          </button>
        </div>

        <BottomNav />
        <Footer />
      </div>
    </AuthGuard>
  );
}
