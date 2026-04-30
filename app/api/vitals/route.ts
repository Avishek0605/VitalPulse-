import { NextRequest, NextResponse } from 'next/server';
import { demoStore } from '@/lib/demo-store';

export async function GET() { return NextResponse.json(demoStore.patient); }

export async function POST(req: NextRequest) {
  const body = await req.json();
  demoStore.updateVitals(body.vitals, body.status);
  return NextResponse.json({ ok: true });
}
