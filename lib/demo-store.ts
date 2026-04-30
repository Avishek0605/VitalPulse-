import { AlertItem, Patient, PatientStatus, Vitals } from './types';

const defaultVitals: Vitals = { heartRate: 88, spo2: 97, systolic: 124, diastolic: 82, temperature: 98.6, respiratoryRate: 16 };

const patient: Patient = {
  id: 'VP-2024-001', name: 'Ramesh Kumar', age: 62, room: 'ICU-4', bed: '7', ward: 'Cardiac ICU',
  doctor: 'Dr. Anjali Sharma', admitted: '15 January 2024', relation: 'Father', status: 'stable', vitals: defaultVitals, updatedAt: new Date().toISOString(),
};

const alerts: AlertItem[] = [
  { id: 'al-1', severity: 'info', message: 'Patient shifted to Cardiac ICU monitoring.', timestamp: new Date(Date.now()-3600e3).toISOString(), resolved: true },
  { id: 'al-2', severity: 'warning', message: 'Mild BP fluctuation observed. Team informed.', timestamp: new Date(Date.now()-1200e3).toISOString(), resolved: true },
];

export const demoStore = {
  patient,
  alerts,
  updateVitals(v: Vitals, status: PatientStatus) { this.patient.vitals=v; this.patient.status=status; this.patient.updatedAt=new Date().toISOString(); },
  addAlert(message: string, severity: AlertItem['severity']) { this.alerts.unshift({ id: `al-${Date.now()}`, message, severity, resolved:false, timestamp:new Date().toISOString()}); },
  reset() { this.patient.vitals = { ...defaultVitals }; this.patient.status='stable'; this.patient.updatedAt=new Date().toISOString(); },
};
