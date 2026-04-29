'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [patientId, setPatientId] = useState('P001');
  const router = useRouter();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/dashboard?patientId=${patientId}`);
  };

  return (
    <div className="mx-auto max-w-md panel p-6">
      <h1 className="text-2xl font-semibold">Family Login</h1>
      <p className="mt-2 text-sm text-soft">Enter patient ID / ABHA reference for demo access.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-navy px-4 py-3 outline-none ring-teal focus:ring-2"
          placeholder="Patient ID"
          required
        />
        <button className="w-full rounded-xl bg-teal px-4 py-3 font-medium text-navy" type="submit">
          OTP / Demo Access
        </button>
      </form>
    </div>
  );
}
