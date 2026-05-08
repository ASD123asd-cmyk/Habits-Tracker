'use client';
import { AuraBackground } from '@/components/aura-background';
import { createClient } from '@/lib/supabase';
import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Choose a strong password for your exam command center.');
  async function update() {
    const result = await createClient().auth.updateUser({ password });
    setMessage(result.error?.message ?? 'Password updated.');
  }
  return <main className="grid min-h-screen place-items-center px-4"><AuraBackground /><section className="glass-panel w-full max-w-md rounded-[2rem] p-6"><p className="tiny-label">Password reset</p><h1 className="font-display text-4xl font-black">Restore access</h1><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-5 w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-3 outline-none focus:border-aura" placeholder="New password"/><button onClick={update} className="aura-button mt-4 w-full">Update password</button><p className="mt-4 text-sm text-white/65">{message}</p></section></main>;
}
