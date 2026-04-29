import { NextRequest, NextResponse } from 'next/server';
import { mockRecords } from '@/lib/mockData';
import { getSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const patientId = request.nextUrl.searchParams.get('patientId') ?? 'P001';
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json(mockRecords);

  const { data, error } = await supabase.from('records').select('*').eq('patient_id', patientId);
  if (error || !data) return NextResponse.json(mockRecords);

  return NextResponse.json(data);
}
