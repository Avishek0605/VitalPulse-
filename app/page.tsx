import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

const steps = [
  'Hospital staff updates patient vitals securely.',
  'Family sees a simplified live status dashboard.',
  'Smart alerts highlight when action is needed.',
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 md:p-12">
        <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:24px_24px] opacity-40" />
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-medium text-teal">Healthcare Family Communication Platform</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Calm updates for families, right when they need them.
          </h1>
          <p className="text-soft">
            VitalPulse reduces anxiety during hospitalization with clear patient status, live vitals, and timely care alerts.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 font-medium text-navy shadow-glow">
              Family Demo Access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/admin" className="rounded-xl border border-white/20 px-5 py-3 font-medium">
              Admin Demo Panel
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="panel p-5">
          <ShieldCheck className="h-5 w-5 text-teal" />
          <h3 className="mt-3 font-semibold">Problem we solve</h3>
          <p className="mt-2 text-sm text-soft">Families feel anxious due to delayed updates during admission.</p>
        </article>
        <article className="panel p-5">
          <Activity className="h-5 w-5 text-teal" />
          <h3 className="mt-3 font-semibold">How it works</h3>
          <ul className="mt-2 space-y-2 text-sm text-soft">
            {steps.map((s) => (
              <li key={s} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-teal" />{s}</li>
            ))}
          </ul>
        </article>
        <article className="panel p-5">
          <h3 className="font-semibold">Dashboard preview</h3>
          <p className="mt-2 text-sm text-soft">Status-first mobile layout showing Stable / Warning / Critical instantly.</p>
          <Link href="/dashboard" className="mt-4 inline-block text-sm font-medium text-teal">View demo dashboard →</Link>
        </article>
      </section>
    </div>
  );
}
