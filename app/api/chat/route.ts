import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { demoStore } from '@/lib/demo-store';

export async function POST(req: NextRequest) {
  const { message, history, language } = await req.json();
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ reply: 'Patient is stable. Vitals are within normal range. Final decisions are your doctor\'s.' });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const p = demoStore.patient;
  const prompt = `You are VitalPulse AI... Respond in ${language}. Name ${p.name}, Age ${p.age}, Ward ${p.ward}, Bed ${p.bed}, Doctor ${p.doctor}, Status ${p.status}, HR ${p.vitals.heartRate}, SpO2 ${p.vitals.spo2}, BP ${p.vitals.systolic}/${p.vitals.diastolic}, Temp ${p.vitals.temperature}. History:${JSON.stringify(history?.slice(-10)||[])} User:${message}`;
  const out = await model.generateContent(prompt);
  return NextResponse.json({ reply: out.response.text() });
}
