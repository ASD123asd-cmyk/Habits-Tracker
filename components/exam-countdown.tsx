'use client';
import { useEffect, useState } from 'react';
import { diffToExam, examDate } from '@/lib/date';

export function ExamCountdown() {
  const [time, setTime] = useState(diffToExam());
  useEffect(() => {
    const id = setInterval(() => setTime(diffToExam()), 30_000);
    return () => clearInterval(id);
  }, []);
  const total = 365;
  const progress = Math.min(100, Math.max(0, ((total - time.days) / total) * 100));
  return (
    <section className="glass-panel rounded-[2rem] p-6">
      <p className="tiny-label">National exam countdown</p>
      <h2 className="mt-2 font-display text-3xl font-black">June 4, {examDate().getFullYear()}</h2>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[['Days', time.days], ['Hours', time.hours], ['Minutes', time.minutes]].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="font-display text-4xl font-black text-silverAura">{value}</p>
            <p className="tiny-label mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-aura to-silverAura shadow-aura" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-sm text-white/70">Training arc progress: every focused hour converts fear into proof.</p>
    </section>
  );
}
