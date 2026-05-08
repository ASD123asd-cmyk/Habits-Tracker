'use client';
import { motion } from 'framer-motion';
import { Pause, Play, ShieldCheck, Volume2, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { generatePomodoro } from '@/lib/pomodoro';
import { useAuraStore } from '@/lib/store';

export function FocusMode({ standalone = false }: { standalone?: boolean }) {
  const { tasks, focusTaskId, stopFocus } = useAuraStore();
  const task = tasks.find((item) => item.id === focusTaskId) ?? tasks[0];
  const cycle = useMemo(() => generatePomodoro(90), []);
  const [seconds, setSeconds] = useState(cycle.focus * 60);
  const [running, setRunning] = useState(false);
  const [theme, setTheme] = useState('Ultra Instinct blue aura');
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  if (!standalone && !focusTaskId) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 overflow-auto bg-void text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,.25),transparent_34%),linear-gradient(135deg,rgba(207,239,255,.12),transparent)]" />
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle, #CFEFFF 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <button onClick={stopFocus} className="absolute right-5 top-5 ghost-button !p-3" aria-label="Exit focus"><X /></button>
        <p className="tiny-label">Distraction shield active · whitelist: docs, calculator, school portal</p>
        <h1 className="mt-4 font-display text-4xl font-black md:text-7xl">{task?.title ?? 'Deep Focus Mission'}</h1>
        <p className="mt-4 max-w-2xl text-white/65">{task?.description ?? 'Breathe slowly. One mission. No tabs. No excuses. Convert pressure into evidence.'}</p>
        <div className="my-10 grid h-72 w-72 place-items-center rounded-full border border-aura/50 bg-white/5 shadow-aura-strong md:h-96 md:w-96">
          <div><p className="tiny-label">{cycle.label}</p><p className="font-display text-7xl font-black md:text-8xl">{mm}:{ss}</p><p className="mt-3 text-cyanGlow">Round 1/{cycle.rounds} · break {cycle.break}m</p></div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => setRunning((value) => !value)} className="aura-button flex items-center gap-2">{running ? <Pause /> : <Play />} {running ? 'Pause aura' : 'Start aura'}</button>
          <button className="ghost-button flex items-center gap-2"><Volume2 /> Rain · Space · Anime lo-fi</button>
          <button className="ghost-button flex items-center gap-2"><ShieldCheck /> Intensity level 5</button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {['Black minimal','White minimal','Ultra Instinct blue aura','Galaxy','Stars','Space','Clouds','Cyberpunk','Neon city','Calm sky','Anime energy aura','Gradient themes'].map((item) => <button key={item} onClick={() => setTheme(item)} className={`rounded-full border px-3 py-2 text-xs ${theme === item ? 'border-aura bg-aura text-void' : 'border-white/10 bg-white/5 text-white/65'}`}>{item}</button>)}
        </div>
      </main>
    </motion.div>
  );
}
