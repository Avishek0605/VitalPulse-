import { NextRequest, NextResponse } from 'next/server';
import { demoStore } from '@/lib/demo-store';

export async function GET() { return NextResponse.json(demoStore.alerts); }

export async function POST(req: NextRequest) {
  const body = await req.json();
  demoStore.addAlert(body.message, body.severity);
  return NextResponse.json({ ok: true });
}
