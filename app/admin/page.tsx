'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function AdminPage() {
  const [heartRate, setHeartRate] = useState(78);
  const [spo2, setSpo2] = useState(98);
  const [bpSystolic, setBpSystolic] = useState(120);
  const [bpDiastolic, setBpDiastolic] = useState(80);
  const [temperature, setTemperature] = useState(98.6);
  const [respRate, setRespRate] = useState(16);
  const [status, setStatus] = useState<'stable' | 'warning' | 'critical'>('stable');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseClient();
      const { data } = await supabase.from('patients').select('*').eq('id', 'VP-2024-001').single();
      if (data) {
        setHeartRate(data.heart_rate ?? 78);
        setSpo2(data.spo2 ?? 98);
        setBpSystolic(data.bp_systolic ?? 120);
        setBpDiastolic(data.bp_diastolic ?? 80);
        setTemperature(data.temperature ?? 98.6);
        setRespRate(data.resp_rate ?? 16);
        setStatus((data.status as 'stable' | 'warning' | 'critical') ?? 'stable');
      }
    };
    void load();
  }, []);

  const push = async () => {
    setMessage('');
    const res = await fetch('/api/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: 'VP-2024-001', heart_rate: heartRate, spo2, bp_systolic: bpSystolic,
        bp_diastolic: bpDiastolic, temperature, resp_rate: respRate, status,
      }),
    });
    if (res.ok) setMessage('✅ Vitals updated successfully.');
    else setMessage('❌ Failed to update vitals.');
  };

  return (
    <main className='min-h-screen bg-[#0A1628] p-4 text-white'>
      <div className='mx-auto max-w-lg space-y-4 rounded-2xl bg-[#0F2033] p-5'>
        <h1 className='text-xl font-bold text-cyan-400'>Admin Controls</h1>

        {[['HR', heartRate, setHeartRate, 40, 150], ['SpO2', spo2, setSpo2, 80, 100], ['BP Systolic', bpSystolic, setBpSystolic, 80, 200], ['BP Diastolic', bpDiastolic, setBpDiastolic, 50, 130], ['Temp', temperature, setTemperature, 95, 105], ['Resp', respRate, setRespRate, 8, 35]].map(([label, val, setVal, min, max]) => (
          <div key={String(label)}>
            <div className='mb-1 flex justify-between text-sm'><span>{String(label)}</span><span>{String(val)}</span></div>
            <input type='range' min={Number(min)} max={Number(max)} step={label === 'Temp' ? 0.1 : 1} value={Number(val)} onChange={(e) => (setVal as (n: number) => void)(Number(e.target.value))} className='w-full accent-cyan-400' />
          </div>
        ))}

        <div className='grid grid-cols-3 gap-2'>
          {(['stable', 'warning', 'critical'] as const).map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={`rounded-lg px-3 py-2 text-sm ${status === s ? 'bg-cyan-400 text-[#06101D]' : 'bg-[#0A1628] text-cyan-300'}`}>{s}</button>
          ))}
        </div>

        <button onClick={push} className='w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-[#06101D]'>Push to Patient Dashboard</button>
        {message ? <p className='text-sm text-cyan-300'>{message}</p> : null}
      </div>
    </main>
  );
}
