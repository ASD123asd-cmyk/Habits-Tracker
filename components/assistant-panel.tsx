'use client';
import { BrainCircuit, Send } from 'lucide-react';
import { useState } from 'react';

export function AssistantPanel() {
  const [goal, setGoal] = useState('Build a 7-day physics and math revision plan without burnout.');
  const [answer, setAnswer] = useState('AI coach ready: I will protect sleep first, schedule hard subjects when your energy is highest, and turn fear into specific next actions.');
  const [loading, setLoading] = useState(false);
  async function ask() {
    setLoading(true);
    const res = await fetch('/api/assistant', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ goal }) });
    const data = await res.json();
    setAnswer(data.message);
    setLoading(false);
  }
  return (
    <section id="assistant" className="glass-panel rounded-[2rem] p-6">
      <div className="flex items-center gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-aura text-void"><BrainCircuit /></span><div><p className="tiny-label">AI Study Assistant</p><h2 className="font-display text-3xl font-black">Burnout-aware exam strategist</h2></div></div>
      <textarea value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-5 min-h-28 w-full rounded-3xl border border-white/10 bg-void/60 p-4 outline-none focus:border-aura" />
      <button onClick={ask} disabled={loading} className="aura-button mt-3 flex items-center gap-2"><Send size={18} /> {loading ? 'Thinking...' : 'Generate plan'}</button>
      <div className="mt-5 rounded-3xl border border-cyanGlow/20 bg-cyanGlow/5 p-5 text-white/75 whitespace-pre-wrap">{answer}</div>
    </section>
  );
}
