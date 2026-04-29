import { AlertItem, Patient, RecordItem } from './types';

export const mockPatient: Patient = {
  id: 'P001',
  name: 'Rohan Sharma',
  room: 'Ward B · Bed 12',
  status: 'Stable',
  heart_rate: 82,
  spo2: 98,
  bp: '122/78',
  temp: 98.6,
  updated_at: new Date().toISOString(),
};

export const mockAlerts: AlertItem[] = [
  { id: 'A1', patient_id: 'P001', message: 'Oxygen dipped to 93%, now recovering.', severity: 'warning', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
  { id: 'A2', patient_id: 'P001', message: 'Doctor reviewed latest vitals.', severity: 'info', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
  { id: 'A3', patient_id: 'P001', message: 'Medication dose updated as planned.', severity: 'info', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
];

export const mockRecords: RecordItem[] = [
  { id: 'R1', patient_id: 'P001', title: 'Prescription (placeholder)', file_url: '#' },
  { id: 'R2', patient_id: 'P001', title: 'Lab Report (placeholder)', file_url: '#' },
  { id: 'R3', patient_id: 'P001', title: 'Discharge Summary (placeholder)', file_url: '#' },
];
