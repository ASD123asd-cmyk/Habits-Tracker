'use client';
import { AuraBackground } from '@/components/aura-background';
import { createClient } from '@/lib/supabase';
import { Chrome, Mail, Shield } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState('Secure Supabase sessions support email, Google OAuth, and password reset.');
  async function submit() {
    const result = mode === 'login' ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setMessage(result.error?.message ?? 'Check your session or confirmation email.');
  }
  async function google() {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } });
  }
  async function reset() {
    if (!email) return setMessage('Enter your email first.');
    const result = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/reset-password` });
    setMessage(result.error?.message ?? 'Password reset email sent.');
  }
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10"><AuraBackground /><section className="glass-panel w-full max-w-md rounded-[2rem] p-6"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-aura text-void"><Shield /></div><p className="tiny-label mt-5">Secure authentication</p><h1 className="font-display text-4xl font-black">Enter Aura OS</h1><div className="mt-6 flex gap-2"><button onClick={() => setMode('login')} className={`flex-1 rounded-2xl py-3 ${mode === 'login' ? 'bg-aura text-void' : 'bg-white/5'}`}>Login</button><button onClick={() => setMode('signup')} className={`flex-1 rounded-2xl py-3 ${mode === 'signup' ? 'bg-aura text-void' : 'bg-white/5'}`}>Sign up</button></div><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-4 w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-3 outline-none focus:border-aura"/><input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="mt-3 w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-3 outline-none focus:border-aura"/><button onClick={submit} className="aura-button mt-4 flex w-full items-center justify-center gap-2"><Mail size={18}/>{mode === 'login' ? 'Login' : 'Create account'}</button><button onClick={google} className="ghost-button mt-3 flex w-full items-center justify-center gap-2"><Chrome size={18}/> Continue with Google</button><button onClick={reset} className="mt-4 text-sm text-cyanGlow">Reset password</button><p className="mt-5 rounded-2xl bg-white/5 p-3 text-sm text-white/65">{message}</p></section></main>
  );
}
