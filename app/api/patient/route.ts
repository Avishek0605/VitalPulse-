import { NextResponse } from 'next/server';
import { demoStore } from '@/lib/demo-store';

export async function GET() {
  return NextResponse.json({ ...demoStore.patient, aiSummary: 'Patient is stable. Vitals are near expected range. Care team is monitoring continuously.' });
}
