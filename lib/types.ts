export type PatientStatus = 'stable' | 'warning' | 'critical';
export type AlertSeverity = 'info' | 'warning' | 'critical';

export type Vitals = {
  heartRate: number;
  spo2: number;
  systolic: number;
  diastolic: number;
  temperature: number;
  respiratoryRate: number;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  room: string;
  bed: string;
  ward: string;
  doctor: string;
  admitted: string;
  relation: string;
  status: PatientStatus;
  vitals: Vitals;
  updatedAt: string;
};

export type AlertItem = {
  id: string;
  severity: AlertSeverity;
  message: string;
  timestamp: string;
  resolved: boolean;
};

export type RecordItem = {
  id: string;
  title: string;
  date: string;
  doctor?: string;
  type: 'Prescription' | 'Report' | 'Notes' | 'Summary';
};
