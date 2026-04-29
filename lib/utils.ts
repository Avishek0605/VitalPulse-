import { clsx } from 'clsx';
import { Status } from './types';

export const cn = (...inputs: Array<string | boolean | undefined | null>) => clsx(inputs);

export const statusPill = (status: Status) => {
  switch (status) {
    case 'Stable':
      return 'bg-stable/20 text-stable border-stable/30';
    case 'Warning':
      return 'bg-warning/20 text-warning border-warning/30';
    case 'Critical':
      return 'bg-critical/20 text-critical border-critical/30';
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
