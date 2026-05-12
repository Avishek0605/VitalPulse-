// VitalPulse — Database Types
// These match the Supabase table columns exactly

export type PatientStatus = 'stable' | 'warning' | 'critical';
export type AlertSeverity = 'info' | 'warning' | 'critical';
export type RecordType = 'prescription' | 'report' | 'discharge' | 'notes';

export interface Patient {
  id: string;
  name: string;
  age: number;
  room: string;
  bed: string;
  ward: string;
  doctor: string;
  admitted_on: string;
  status: PatientStatus;
  heart_rate: number;
  spo2: number;
  bp_systolic: number;
  bp_diastolic: number;
  temperature: number;
  resp_rate: number;
  updated_at: string;
}

export interface Alert {
  id: string;
  patient_id: string;
  message: string;
  severity: AlertSeverity;
  timestamp: string;
  resolved: boolean;
  resolved_by?: string;
}

export interface MedicalRecord {
  id: string;
  patient_id: string;
  title: string;
  type: RecordType;
  date: string;
  doctor?: string;
  file_url?: string;
}

// Vital thresholds for status coloring
export const THRESHOLDS = {
  heart_rate:  { low: 60,   high: 100,  cLow: 40,  cHigh: 130  },
  spo2:        { low: 95,   high: 100,  cLow: 88,  cHigh: 100  },
  temperature: { low: 97,   high: 99.5, cLow: 95,  cHigh: 103  },
  resp_rate:   { low: 12,   high: 20,   cLow: 8,   cHigh: 30   },
};

export type VitalKey = keyof typeof THRESHOLDS;

export function getVitalStatus(key: VitalKey, value: number): 'normal' | 'warning' | 'critical' {
  const t = THRESHOLDS[key];
  if (value <= t.cLow || value >= t.cHigh) return 'critical';
  if (value < t.low  || value > t.high)   return 'warning';
  return 'normal';
}

export function statusColor(s: 'normal' | 'warning' | 'critical' | PatientStatus): string {
  const map: Record<string, string> = {
    normal:   'text-emerald-400',
    stable:   'text-emerald-400',
    warning:  'text-amber-400',
    critical: 'text-red-400',
  };
  return map[s] ?? 'text-white';
}

export function statusBg(s: PatientStatus): string {
  return {
    stable:   'bg-emerald-400/10 border-emerald-400/30',
    warning:  'bg-amber-400/10 border-amber-400/30',
    critical: 'bg-red-400/10 border-red-400/30 animate-pulse',
  }[s];
}

export function timeAgo(dateStr: string): string {
  const secs = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (secs < 10) return 'just now';
  if (secs < 60) return `${secs}s ago`;
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  return `${Math.floor(secs / 3600)}h ago`;
      }
