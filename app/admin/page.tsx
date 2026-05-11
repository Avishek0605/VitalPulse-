'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [form, setForm] = useState({ heart_rate: 88, spo2: 97, bp_systolic: 124, bp_diastolic: 82, temperature: 98.6, resp_rate: 16, status: 'stable' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    void fetch('/api/vitals').then((r) => r.json()).then((d) => setForm((f) => ({ ...f, ...d })));
  }, []);

  const push = async () => {
    const res = await fetch('/api/vitals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setMsg(res.ok ? '✓ Pushed! Family dashboard updated via Realtime' : 'Push failed');
  };

  return <div className='mx-auto max-w-lg space-y-3 bg-[#0A1628] pb-8 text-white'>
    <Link href='/dashboard' className='text-cyan-400'>← Back</Link>
    <div className='rounded-xl bg-cyan-500/20 p-2 text-sm text-cyan-200'>Changes push to Supabase and update family dashboard in real time</div>
    {[
      ['heart_rate', 'Heart Rate', 40, 150, 1], ['spo2', 'SpO2', 80, 100, 1], ['bp_systolic', 'BP Systolic', 80, 200, 1], ['bp_diastolic', 'BP Diastolic', 50, 130, 1], ['temperature', 'Temperature', 95, 105, 0.1], ['resp_rate', 'Resp Rate', 8, 35, 1],
    ].map(([key, label, min, max, step]) => <div key={String(key)} className='rounded-xl bg-[#0F2033] p-3'><p>{label}: {String((form as Record<string, number | string>)[String(key)])}</p><input type='range' min={Number(min)} max={Number(max)} step={Number(step)} value={Number((form as Record<string, number | string>)[String(key)])} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} className='w-full' /></div>)}
    <div className='grid grid-cols-3 gap-2'>{['stable', 'warning', 'critical'].map((s) => <button key={s} onClick={() => setForm({ ...form, status: s })} className={`rounded-xl p-2 ${form.status === s ? 'bg-cyan-400 text-black' : 'bg-[#0F2033]'}`}>{s}</button>)}</div>
    <button onClick={() => void push()} className='w-full rounded-xl bg-cyan-400 p-3 font-semibold text-black'>Push to Family Dashboard</button>
    {msg && <p className='text-sm text-cyan-300'>{msg}</p>}
  </div>;
}
