import { NextRequest, NextResponse } from 'next/server';
import { mockAlerts } from '@/lib/mockData';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const patientId = request.nextUrl.searchParams.get('patientId') ?? 'P001';
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json(mockAlerts);

  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('patient_id', patientId)
    .order('timestamp', { ascending: false })
    .limit(20);

  if (error || !data) return NextResponse.json(mockAlerts);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, mode: 'mock' });

  const payload = {
    patient_id: body.patient_id,
    message: body.message,
    severity: body.severity,
    timestamp: new Date().toISOString(),
  };

  const { error } = await supabase.from('alerts').insert(payload);
  if (error) return NextResponse.json({ ok: false }, { status: 500 });

  return NextResponse.json({ ok: true });
}
