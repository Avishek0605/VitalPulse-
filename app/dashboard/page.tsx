'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ActivitySquare, HeartPulse, Stethoscope, Thermometer } from 'lucide-react';
import { AppShellHeader } from '@/components/app-shell-header';
import { isDemoLoggedIn } from '@/lib/demo-auth';

const statusMap = {
  stable: 'text-green-400 border-green-400/40 bg-green-500/10',
  warning: 'text-yellow-300 border-yellow-400/40 bg-yellow-500/10',
  critical: 'text-red-300 border-red-400/40 bg-red-500/10',
};

export default function DashboardPage() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [status, setStatus] = useState<'stable' | 'warning' | 'critical'>('stable');

  useEffect(() => {
    if (!isDemoLoggedIn()) router.replace('/login');
    const timer = setInterval(() => setSeconds((prev) => (prev >= 59 ? 0 : prev + 5)), 5000);
    const statusTimer = setInterval(() => {
      setStatus((prev) => (prev === 'stable' ? 'warning' : prev === 'warning' ? 'critical' : 'stable'));
    }, 12000);
    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, [router]);

  return (
    <div className="space-y-4">
      <AppShellHeader />
      <div className="panel rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-soft">Patient Name</p>
            <h1 className="text-2xl font-semibold">Demo Patient</h1>
            <p className="text-sm text-soft">Room: 203B</p>
          </div>
          <span className={`rounded-full border px-4 py-2 text-sm font-semibold capitalize ${statusMap[status]}`}>{status}</span>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Heart Rate', value: '78 bpm', icon: HeartPulse },
          { label: 'SpO2', value: '98 %', icon: ActivitySquare },
          { label: 'BP', value: '120/80', icon: Stethoscope },
          { label: 'Temperature', value: '98.6°F', icon: Thermometer },
        ].map((vital) => (
          <article key={vital.label} className="panel rounded-2xl p-4">
            <vital.icon className="h-5 w-5 text-teal" />
            <p className="mt-2 text-sm text-soft">{vital.label}</p>
            <p className="text-xl font-semibold">{vital.value}</p>
          </article>
        ))}
      </section>

      <section className="panel rounded-2xl p-5">
        <h2 className="font-semibold">AI Summary</h2>
        <p className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-soft">
          Patient is stable. No immediate concern.
        </p>
        <p className="mt-3 text-xs text-soft">Updated {seconds} seconds ago</p>
      </section>
    </div>
  );
}
