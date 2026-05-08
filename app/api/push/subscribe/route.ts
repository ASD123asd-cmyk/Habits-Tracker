import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const subscription = await request.json();
  // Production deployments should persist this subscription in Supabase and use VAPID to send scheduled reminders.
  return NextResponse.json({ ok: true, endpoint: subscription.endpoint });
}
