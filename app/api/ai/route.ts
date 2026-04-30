import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const SAFETY_NOTE =
  'This is educational support only, not medical advice. For diagnosis/treatment, contact your doctor.';

export async function POST(request: Request) {
  try {
    const { message } = (await request.json()) as { message?: string };

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply:
          `${SAFETY_NOTE}\n\nAI is not configured yet. Add GEMINI_API_KEY in environment variables to enable chat.`,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are VitalPulse Assistant for patient families.
Rules:
- Use plain, calm language.
- Do not diagnose with certainty.
- Do not suggest medicine names or doses.
- If emergency red-flag symptoms are mentioned (severe chest pain, unconsciousness, stroke signs, severe breathing distress), instruct immediate emergency care.
- Keep answer short and structured.
Output format:
1) Simple Summary
2) What this may mean
3) What to ask the doctor
4) Safety note: This is not medical advice.

User message:\n${message}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text || `${SAFETY_NOTE}\n\nI could not generate a response.` });
  } catch {
    return NextResponse.json(
      {
        error: 'AI service failed. Please try again.',
      },
      { status: 500 }
    );
  }
}
