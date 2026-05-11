import { AlertItem, Patient, RecordItem } from './types';

export const mockPatient: Patient = {
  id: 'VP-2024-001', name: 'Ramesh Kumar', age: 62, room: 'ICU-4', bed: '7', ward: 'Cardiac ICU', doctor: 'Dr. Anjali Sharma', admitted: '15 January 2024', relation: 'Father', status: 'stable',
  vitals: { heartRate: 88, spo2: 97, systolic: 124, diastolic: 82, temperature: 98.6, respiratoryRate: 16 }, updatedAt: new Date().toISOString(),
};

export const mockAlerts: AlertItem[] = [
  { id: 'A1', message: 'Oxygen dipped to 93%, now recovering.', severity: 'warning', timestamp: new Date().toISOString(), resolved: false },
];

export const mockRecords: RecordItem[] = [
  { id: 'R1', title: 'Admission Prescription', date: '15 Jan 2024', doctor: 'Dr. Anjali Sharma', type: 'Prescription' },
];
