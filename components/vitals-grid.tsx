import { motion } from 'framer-motion';
import { Activity, Thermometer, Waves, Heart } from 'lucide-react';
import { Patient } from '@/lib/types';

const cards = (patient: Patient) => [
  { label: 'Heart Rate', value: `${patient.heart_rate} bpm`, icon: Heart },
  { label: 'SpO2', value: `${patient.spo2}%`, icon: Activity },
  { label: 'Blood Pressure', value: patient.bp, icon: Waves },
  { label: 'Temperature', value: `${patient.temp.toFixed(1)} °F`, icon: Thermometer },
];

export function VitalsGrid({ patient }: { patient: Patient }) {
  return (
    <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards(patient).map((card, idx) => (
        <motion.article
          key={card.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="panel p-4"
        >
          <card.icon className="h-4 w-4 text-teal" />
          <p className="mt-2 text-xs text-soft">{card.label}</p>
          <p className="text-lg font-semibold">{card.value}</p>
        </motion.article>
      ))}
    </section>
  );
}
