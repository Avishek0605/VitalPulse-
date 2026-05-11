import { clsx } from 'clsx';
import { PatientStatus } from './types';

export const cn = (...inputs: Array<string | boolean | undefined | null>) => clsx(inputs);

export const statusPill = (status: PatientStatus) => {
  switch (status) {
    case 'stable':
      return 'bg-[#00C48C]/20 text-[#00C48C] border-[#00C48C]/30';
    case 'warning':
      return 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30';
    case 'critical':
      return 'bg-[#E53E3E]/20 text-[#E53E3E] border-[#E53E3E]/30';
  }
};

export const timeAgo = (iso: string) => {
  const sec = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  return `${hr}h ago`;
};
