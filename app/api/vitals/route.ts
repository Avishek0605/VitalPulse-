import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patient_id = 'VP-2024-001', heart_rate, spo2,
      bp_systolic, bp_diastolic, temperature, resp_rate, status } = body;

    const updates: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    };

    if (heart_rate   !== undefined) updates.heart_rate   = Number(heart_rate);
    if (spo2         !== undefined) updates.spo2         = Number(spo2);
    if (bp_systolic  !== undefined) updates.bp_systolic  = Number(bp_systolic);
    if (bp_diastolic !== undefined) updates.bp_diastolic = Number(bp_diastolic);
    if (temperature  !== undefined) updates.temperature  = Number(temperature);
    if (resp_rate    !== undefined) updates.resp_rate    = Number(resp_rate);
    if (status       !== undefined) updates.status       = status;

    const { data, error } = await supabase
      .from('patients').update(updates)
      .eq('id', patient_id).select().single();

    if (error) throw error;

    if (status === 'critical') {
      await supabase.from('alerts').insert({
        patient_id, resolved: false, severity: 'critical',
        message: '🚨 Critical vitals detected — medical team alerted.'
      });
    } else if (status === 'warning') {
      await supabase.from('alerts').insert({
        patient_id, resolved: false, severity: 'warning',
        message: '⚠️ Vitals need attention. Monitoring closely.'
      });
    } else if (status === 'stable') {
      await supabase.from('alerts').insert({
        patient_id, resolved: true, severity: 'info',
        message: '✓ Patient vitals returned to normal. Stable.'
      });
    }

    return NextResponse.json({ success: true, patient: data });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from('patients').select('*').eq('id', 'VP-2024-001').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
