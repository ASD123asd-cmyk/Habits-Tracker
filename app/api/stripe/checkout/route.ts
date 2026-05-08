import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM) return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 400 });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({ mode: 'subscription', line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM, quantity: 1 }], success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?premium=1`, cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?premium=0` });
  return NextResponse.json({ url: session.url });
}
