import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { goal } = await request.json();
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ message: `Offline AI plan for: ${goal}\n\n1. Protect 7.5h sleep as a non-negotiable recovery anchor.\n2. Put the hardest subject in the first 90-minute ultra-focus block.\n3. Use 50/10 cycles for revision and 25/5 cycles for memorization.\n4. End every day with error-log review and tomorrow's top 3 missions.\n5. Burnout guard: if sleep score <70 twice, reduce intensity by 20% and add active recovery.` });
  }
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages: [{ role: 'system', content: 'You are a motivational, burnout-aware AI study coach for high-stakes exams. Give concrete schedules and advice.' }, { role: 'user', content: goal }], temperature: 0.7 })
  });
  const data = await res.json();
  return NextResponse.json({ message: data.choices?.[0]?.message?.content ?? 'I could not generate a plan right now.' });
}
