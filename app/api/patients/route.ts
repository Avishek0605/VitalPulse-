import { NextRequest, NextResponse } from 'next/server';
import { mockPatient } from '@/lib/mockData';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') ?? 'P001';
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json(mockPatient);

  const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();
  if (error || !data) return NextResponse.json(mockPatient);

  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ ok: true, mode: 'mock' });

  const payload = {
    heart_rate: Number(body.heart_rate),
    spo2: Number(body.spo2),
    bp: body.bp,
    temp: Number(body.temp),
    status: body.status,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from('patients').update(payload).eq('id', body.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
