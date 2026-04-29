'use client';

import { useEffect, useState } from 'react';
import { AISummary } from '@/components/ai-summary';
import { LiveChip } from '@/components/live-chip';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { StatusCard } from '@/components/status-card';
import { VitalsGrid } from '@/components/vitals-grid';
import { Patient } from '@/lib/types';

export default function DashboardPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const res = await fetch('/api/patients?id=P001', { cache: 'no-store' });
      if (!res.ok) throw new Error('Could not load patient status.');
      const data = (await res.json()) as Patient;
      setPatient(data);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unexpected error.');
    }
  };

  useEffect(() => {
    void load();
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, []);

  if (error) return <div className="panel p-5 text-critical">{error}</div>;
  if (!patient) return <LoadingSkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Family Dashboard</h1>
        <LiveChip updatedAt={patient.updated_at} />
      </div>
      <StatusCard patient={patient} />
      <VitalsGrid patient={patient} />
      <AISummary patient={patient} />
    </div>
  );
}
