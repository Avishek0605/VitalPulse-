import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import { Patient } from '@/lib/types';
import { statusPill } from '@/lib/utils';

export function StatusCard({ patient }: { patient: Patient }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-soft">Patient overview</p>
          <h2 className="mt-1 text-xl font-semibold">{patient.name}</h2>
          <p className="text-sm text-soft">{patient.room}</p>
        </div>
        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusPill(patient.status)}`}>
          {patient.status}
        </span>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-soft">
        <HeartPulse className="h-4 w-4 text-teal" />
        Current care team monitoring continuously.
      </div>
    </motion.section>
  );
}
