-- VitalPulse MVP schema
create table if not exists patients (
  id text primary key,
  name text not null,
  room text not null,
  status text not null,
  heart_rate int not null,
  spo2 int not null,
  bp text not null,
  temp numeric not null,
  updated_at timestamptz default now()
);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  patient_id text references patients(id) on delete cascade,
  message text not null,
  severity text not null,
  timestamp timestamptz default now()
);

create table if not exists records (
  id uuid primary key default gen_random_uuid(),
  patient_id text references patients(id) on delete cascade,
  title text not null,
  file_url text not null
);

insert into patients (id, name, room, status, heart_rate, spo2, bp, temp)
values ('P001', 'Rohan Sharma', 'Ward B · Bed 12', 'Stable', 82, 98, '122/78', 98.6)
on conflict (id) do nothing;

insert into alerts (patient_id, message, severity)
values
  ('P001', 'Oxygen dipped to 93%, now recovering.', 'warning'),
  ('P001', 'Doctor reviewed latest vitals.', 'info'),
  ('P001', 'Medication dose updated as planned.', 'info');

insert into records (patient_id, title, file_url)
values
  ('P001', 'Prescription (placeholder)', '#'),
  ('P001', 'Lab Report (placeholder)', '#'),
  ('P001', 'Discharge Summary (placeholder)', '#');
