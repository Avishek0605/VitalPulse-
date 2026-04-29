export type Status = 'Stable' | 'Warning' | 'Critical';

export interface Patient {
  id: string;
  name: string;
  room: string;
  status: Status;
  heart_rate: number;
  spo2: number;
  bp: string;
  temp: number;
  updated_at: string;
}

export interface AlertItem {
  id: string;
  patient_id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}

export interface RecordItem {
  id: string;
  patient_id: string;
  title: string;
  file_url: string;
}
