import { Brain } from 'lucide-react';
import { Patient } from '@/lib/types';

function getSummary(patient: Patient) {
  if (patient.status === 'Critical') {
    return 'Patient needs urgent attention. Care team has been alerted immediately.';
  }
  if (patient.status === 'Warning') {
    return 'Patient is under close observation. Minor fluctuations detected, team is tracking.';
  }
  return 'Patient is stable. No immediate concern at this time.';
}

export function AISummary({ patient }: { patient: Patient }) {
  return (
    <section className="panel p-5">
      <div className="flex items-center gap-2 text-sm text-soft">
        <Brain className="h-4 w-4 text-teal" /> AI Care Summary
      </div>
      <p className="mt-2 text-sm leading-relaxed">{getSummary(patient)}</p>
    </section>
  );
}
