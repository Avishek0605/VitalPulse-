'use client';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { TopBar } from '@/components/layout/TopBar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase/client';
import { Alert, Patient, getVitalStatus, statusColor, statusBg, timeAgo } from '@/types/database';

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
    const supabase = getSupabaseClient();
    const [pRes, aRes] = await Promise.all([
      supabase.from('patients').select('*').eq('id', 'VP-2024-001').single(),
      supabase.from('alerts').select('*').eq('patient_id', 'VP-2024-001').order('timestamp', { ascending: false }).limit(5),
    ]);
    if (pRes.error || aRes.error) setError(pRes.error?.message || aRes.error?.message || 'Failed to load');
    else {
      setPatient(pRes.data as Patient);
      setAlerts((aRes.data as Alert[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('vp_auth') !== 'true') router.replace('/login');
    void load();

    const supabase = getSupabaseClient();

    const patientChannel = supabase.channel('patient-realtime').on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'patients', filter: 'id=eq.VP-2024-001' },
      (payload) => { setConnected(true); setPatient(payload.new as Patient); }
    ).subscribe();

    const alertChannel = supabase.channel('alert-realtime').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'alerts', filter: 'patient_id=eq.VP-2024-001' },
      (payload) => setAlerts((prev) => [payload.new as Alert, ...prev].slice(0, 5))
    ).subscribe();

    return () => { supabase.removeChannel(patientChannel); supabase.removeChannel(alertChannel); };
  }, [router]);

  if (loading) return <div className='mx-auto max-w-lg space-y-3 pb-24'><div className='h-20 animate-pulse rounded-2xl bg-[#0F2033]' /><div className='grid grid-cols-2 gap-3'>{Array.from({ length: 4 }).map((_, i) => <div key={i} className='h-24 animate-pulse rounded-2xl bg-[#0F2033]' />)}</div></div>;
  if (error || !patient) return <div className='mx-auto max-w-lg rounded-2xl bg-[#0F2033] p-5 text-red-300'>{error || 'No patient data'}<button className='ml-2 rounded bg-cyan-500 px-3 py-1 text-black' onClick={() => void load()}>Retry</button></div>;

  const logout = () => { localStorage.removeItem('vp_auth'); localStorage.removeItem('vp_patient_id'); router.push('/login'); };

  return <div className='mx-auto max-w-lg space-y-3 bg-[#0A1628] pb-24 text-white'>
    <div className='sticky top-0 z-20 rounded-2xl bg-[#0F2033] p-3'><div className='flex items-center justify-between'><span>VitalPulse</span><div className='flex gap-3'><span>🔔</span><button onClick={logout}>↪</button></div></div></div>
    {patient.status === 'critical' && <div className='animate-pulse rounded-xl border border-red-400 bg-red-500/20 p-2 text-red-200'>🚨 Critical condition: Medical team is aware and responding.</div>}
    <section className={`rounded-2xl border p-4 ${statusBg(patient.status)}`}><h1 className='text-2xl font-bold'>{patient.name}</h1><p className='text-sm text-[#A0AEC0]'>{patient.ward} · Bed {patient.bed} · Dr. {patient.doctor} · Age {patient.age}</p><div className='mt-2 flex items-center gap-2'><span className={`rounded-full px-3 py-1 text-xs uppercase ${statusColor(patient.status)}`}>{patient.status}</span><span className='h-2 w-2 animate-pulse rounded-full bg-emerald-400' />Updated {timeAgo(patient.updated_at)}<span className={`ml-auto h-2 w-2 rounded-full ${connected ? 'bg-cyan-400' : 'bg-gray-500'}`} /></div></section>
    <div className='grid grid-cols-2 gap-3'>{[
      ['Heart Rate', patient.heart_rate, 'bpm', 'heart_rate', 'border-red-400'],
      ['SpO2', patient.spo2, '%', 'spo2', 'border-cyan-400'],
      ['BP Systolic', patient.bp_systolic, 'mmHg', 'heart_rate', 'border-amber-400'],
      ['Temperature', patient.temperature, '°F', 'temperature', 'border-purple-400'],
    ].map(([label, val, unit, key, border]) => <div key={String(label)} className={`rounded-2xl border-t-2 ${border} bg-[#0F2033] p-3`}><p className='text-xs text-[#A0AEC0]'>{label}</p><p className='text-2xl font-bold'>{val}</p><p className={`text-xs ${statusColor(getVitalStatus(key as never, Number(val)))}`}>{unit}</p></div>)}</div>
    <div className='rounded-2xl border-t-2 border-emerald-400 bg-[#0F2033] p-3'><p className='text-xs text-[#A0AEC0]'>Respiratory Rate</p><p className='text-2xl font-bold'>{patient.resp_rate}</p><p className='text-xs'>breaths/min</p></div>
    <section className='rounded-2xl bg-[#0F2033] p-3'><h3 className='mb-2 font-semibold'>Recent Alerts</h3>{alerts.slice(0,2).map(a=><div key={a.id} className='mb-2 rounded-lg border-l-2 border-cyan-400 bg-white/5 p-2 text-sm'>{a.message}</div>)}<Link href='/alerts' className='text-cyan-400 text-sm'>View all alerts →</Link></section>
    <nav className='fixed bottom-0 left-0 right-0 mx-auto flex max-w-lg justify-around border-t border-cyan-400/20 bg-[#071016] p-3 text-sm'><Link href='/dashboard'>Home</Link><Link href='/alerts'>Alerts</Link><Link href='/records'>Records</Link><Link href='/admin'>Admin</Link></nav>
  </div>;
}
