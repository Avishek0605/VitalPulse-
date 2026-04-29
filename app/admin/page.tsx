'use client';

import { FormEvent, useState } from 'react';

export default function AdminPage() {
  const [form, setForm] = useState({ heart_rate: 82, spo2: 98, bp: '122/78', temp: 98.6, status: 'Stable' });
  const [message, setMessage] = useState('');

  const update = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/patients', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'P001', ...form }),
    });

    if (res.ok) {
      setMessage('Vitals updated. Family dashboard will refresh within 5 seconds.');
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: 'P001',
          severity: form.status === 'Critical' ? 'critical' : form.status === 'Warning' ? 'warning' : 'info',
          message: `Status changed to ${form.status}. HR ${form.heart_rate}, SpO2 ${form.spo2}%`,
        }),
      });
    } else {
      setMessage('Could not update vitals right now.');
    }
  };

  return (
    <div className="mx-auto max-w-2xl panel p-6">
      <h1 className="text-xl font-semibold">Admin Demo Panel</h1>
      <p className="mt-2 text-sm text-soft">Use this to simulate bedside updates for pilot demo.</p>
      <form onSubmit={update} className="mt-6 grid grid-cols-2 gap-3">
        <label className="text-sm">HR
          <input type="number" className="mt-1 w-full rounded-lg border border-white/20 bg-navy px-3 py-2" value={form.heart_rate} onChange={(e) => setForm({ ...form, heart_rate: Number(e.target.value) })} />
        </label>
        <label className="text-sm">SpO2
          <input type="number" className="mt-1 w-full rounded-lg border border-white/20 bg-navy px-3 py-2" value={form.spo2} onChange={(e) => setForm({ ...form, spo2: Number(e.target.value) })} />
        </label>
        <label className="text-sm">BP
          <input className="mt-1 w-full rounded-lg border border-white/20 bg-navy px-3 py-2" value={form.bp} onChange={(e) => setForm({ ...form, bp: e.target.value })} />
        </label>
        <label className="text-sm">Temperature
          <input type="number" step="0.1" className="mt-1 w-full rounded-lg border border-white/20 bg-navy px-3 py-2" value={form.temp} onChange={(e) => setForm({ ...form, temp: Number(e.target.value) })} />
        </label>
        <label className="col-span-2 text-sm">Status
          <select className="mt-1 w-full rounded-lg border border-white/20 bg-navy px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Stable</option>
            <option>Warning</option>
            <option>Critical</option>
          </select>
        </label>
        <button className="col-span-2 rounded-xl bg-teal px-4 py-3 font-medium text-navy" type="submit">Push Live Update</button>
      </form>
      {message && <p className="mt-3 text-sm text-soft">{message}</p>}
    </div>
  );
}
