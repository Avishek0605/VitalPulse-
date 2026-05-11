'use client';

import Link from 'next/link';
import { UserCircle2 } from 'lucide-react';

export function AppShellHeader() {
  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-white/10 bg-surface px-4 py-3">
      <div>
        <p className="text-xs uppercase tracking-wider text-soft">VitalPulse</p>
        <h2 className="text-lg font-semibold">Care Monitoring Console</h2>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <Link href="/admin" className="rounded-lg border border-white/20 px-3 py-1.5 hover:border-teal/60">Admin Login</Link>
        <button className="rounded-lg border border-white/20 px-3 py-1.5">Family Login</button>
        <UserCircle2 className="h-7 w-7 text-teal" />
      </div>
    </header>
  );
}
