'use client';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Patient, Alert } from '@/types/database';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const supabase = getSupabaseClient();
      const [patientRes, alertsRes] = await Promise.all([
        supabase.from('patients').select('*').eq('id', 'VP-2024-001').single(),
        supabase.from('alerts').select('*').eq('patient_id', 'VP-2024-001').order('timestamp', { ascending: false }).limit(5),
      ]);

      if (patientRes.error) throw patientRes.error;
      if (alertsRes.error) throw alertsRes.error;

      setPatient(patientRes.data as Patient);
      setAlerts((alertsRes.data as Alert[]) ?? []);
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const auth = localStorage.getItem('vp_auth');
    if (!auth) {
      router.push('/login');
      return;
    }
    void fetchData();

    const supabase = getSupabaseClient();
    const patientChannel = supabase
      .channel('vp-patient-realtime')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'patients', filter: 'id=eq.VP-2024-001' }, (payload) => {
        setConnected(true);
        setPatient(payload.new as Patient);
      })
      .subscribe();

    const alertsChannel = supabase
      .channel('vp-alerts-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts', filter: 'patient_id=eq.VP-2024-001' }, (payload) => {
        setConnected(true);
        setAlerts((prev) => [payload.new as Alert, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(patientChannel);
      supabase.removeChannel(alertsChannel);
    };
  }, [router]);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vp_auth');
      localStorage.removeItem('vp_patient_id');
    }
    router.push('/login');
  };

  const badge = patient?.status === 'critical' ? 'bg-red-500/20 text-red-300 border-red-400' : patient?.status === 'warning' ? 'bg-amber-500/20 text-amber-300 border-amber-400' : 'bg-emerald-500/20 text-emerald-300 border-emerald-400';

  if (loading) {
    return <div className='min-h-screen bg-[#0A1628] p-4'><div className='mx-auto max-w-lg space-y-3'><div className='h-24 animate-pulse rounded-2xl bg-[#0F2033]' /><div className='grid grid-cols-2 gap-3'>{Array.from({ length: 4 }).map((_, i) => <div key={i} className='h-24 animate-pulse rounded-2xl bg-[#0F2033]' />)}</div></div></div>;
  }

  if (error || !patient) {
    return <div className='min-h-screen bg-[#0A1628] p-4 text-red-300'><div className='mx-auto max-w-lg rounded-2xl bg-[#0F2033] p-4'>{error || 'No patient data found.'}</div></div>;
  }

  return (
    <div className='min-h-screen bg-[#0A1628] pb-24 text-white'>
      <div className='mx-auto max-w-lg space-y-3 p-4'>
        <div className='rounded-2xl bg-[#0F2033] p-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-semibold'>VitalPulse</h1>
            <button onClick={logout} className='rounded-lg border border-cyan-400/40 px-3 py-1 text-sm text-cyan-400'>Logout</button>
          </div>
        </div>

        <section className='rounded-2xl bg-[#0F2033] p-4'>
          <h2 className='text-2xl font-bold'>{patient.name}</h2>
          <p className='text-sm text-[#A0AEC0]'>{patient.ward} · Bed {patient.bed} · Dr. {patient.doctor}</p>
          <div className='mt-2 flex items-center gap-2'>
            <span className={`rounded-full border px-3 py-1 text-xs uppercase ${badge}`}>{patient.status}</span>
            <span className={`h-2 w-2 rounded-full ${connected ? 'animate-pulse bg-cyan-400' : 'bg-gray-500'}`} />
            <span className='text-xs text-[#A0AEC0]'>Live</span>
          </div>
        </section>

        <div className='grid grid-cols-2 gap-3'>
          <div className='rounded-2xl bg-[#0F2033] p-3'><p className='text-xs text-[#A0AEC0]'>Heart Rate</p><p className='text-2xl font-bold'>{patient.heart_rate}</p><p className='text-xs text-cyan-400'>bpm</p></div>
          <div className='rounded-2xl bg-[#0F2033] p-3'><p className='text-xs text-[#A0AEC0]'>SpO2</p><p className='text-2xl font-bold'>{patient.spo2}</p><p className='text-xs text-cyan-400'>%</p></div>
          <div className='rounded-2xl bg-[#0F2033] p-3'><p className='text-xs text-[#A0AEC0]'>Blood Pressure</p><p className='text-2xl font-bold'>{patient.bp_systolic}/{patient.bp_diastolic}</p><p className='text-xs text-cyan-400'>mmHg</p></div>
          <div className='rounded-2xl bg-[#0F2033] p-3'><p className='text-xs text-[#A0AEC0]'>Temperature</p><p className='text-2xl font-bold'>{patient.temperature}</p><p className='text-xs text-cyan-400'>°F</p></div>
        </div>

        <section className='rounded-2xl bg-[#0F2033] p-4'>
          <h3 className='mb-2 font-semibold'>Recent Alerts</h3>
          {alerts.length === 0 ? <p className='text-sm text-[#A0AEC0]'>No alerts yet.</p> : alerts.map((a) => <div key={a.id} className='mb-2 rounded-lg border-l-2 border-cyan-400 bg-white/5 p-2 text-sm'>{a.message}</div>)}
        </section>
      </div>

      <nav className='fixed bottom-0 left-0 right-0 mx-auto flex max-w-lg justify-around border-t border-cyan-400/20 bg-[#071016] p-3 text-sm text-cyan-400'>
        <Link href='/dashboard'>Home</Link><Link href='/alerts'>Alerts</Link><Link href='/records'>Records</Link><Link href='/admin'>Admin</Link>
      </nav>
    </div>
  );
}
