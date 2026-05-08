'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { iso, monthMatrix } from '@/lib/date';
import { useAuraStore } from '@/lib/store';
import type { CalendarView, LifeTask, TaskCategory } from '@/lib/types';

const categories: TaskCategory[] = ['study', 'revision', 'sleep', 'meal', 'work', 'habit', 'break', 'exercise'];

export function CalendarSystem() {
  const { tasks, selectedDate, setDate, view, setView, addTask, toggleTask, startFocus } = useAuraStore();
  const [cursor, setCursor] = useState(new Date());
  const [draftOpen, setDraftOpen] = useState(false);
  const days = useMemo(() => monthMatrix(cursor), [cursor]);
  const selectedTasks = tasks.filter((task) => task.date === selectedDate);
  const monthLabel = cursor.toLocaleDateString('en', { month: 'long', year: 'numeric' });

  function shift(delta: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.55fr_.85fr]">
      <div className="glass-panel rounded-[2rem] p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="tiny-label">Life command calendar</p>
            <h1 className="font-display text-3xl font-black md:text-5xl">{monthLabel}</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['day', 'week', 'month', 'year'] as CalendarView[]).map((item) => <button key={item} onClick={() => setView(item)} className={`rounded-xl px-3 py-2 text-sm capitalize ${view === item ? 'bg-aura text-void' : 'bg-white/5 text-white/70'}`}>{item}</button>)}
            <button onClick={() => shift(-1)} className="ghost-button !p-3"><ChevronLeft /></button>
            <button onClick={() => shift(1)} className="ghost-button !p-3"><ChevronRight /></button>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-widest text-white/45">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => <span key={d}>{d}</span>)}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={`${cursor.toISOString()}-${view}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="mt-3 grid grid-cols-7 gap-2">
            {days.map((day) => {
              const dayIso = iso(day);
              const dayTasks = tasks.filter((task) => task.date === dayIso);
              const studyHours = dayTasks.filter((task) => task.category === 'study' || task.category === 'revision').length * 1.5;
              const score = Math.min(99, 58 + dayTasks.filter((t) => t.completed).length * 11 + dayTasks.length * 4);
              const active = selectedDate === dayIso;
              return (
                <button key={dayIso} onClick={() => setDate(dayIso)} className={`min-h-[7.5rem] rounded-3xl border p-3 text-left transition hover:-translate-y-1 hover:border-aura/70 ${active ? 'border-aura bg-aura/15 shadow-aura' : 'border-white/10 bg-white/[.035]'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className={`font-display text-lg font-bold ${day.getMonth() === cursor.getMonth() ? 'text-white' : 'text-white/30'}`}>{day.getDate()}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-cyanGlow/30 text-[10px] text-cyanGlow">{score}</span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {dayTasks.slice(0, 3).map((task) => <span key={task.id} className="h-1.5 flex-1 rounded-full" style={{ background: task.color }} />)}
                  </div>
                  <p className="mt-3 text-xs text-white/55">{dayTasks.length} tasks · {studyHours}h study</p>
                  <p className="mt-1 text-xs text-silverAura">Mood: {dayTasks[0]?.mood ?? 'ready'}</p>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <aside className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center justify-between gap-3">
          <div><p className="tiny-label">Selected day</p><h2 className="font-display text-2xl font-black">{selectedDate}</h2></div>
          <button onClick={() => setDraftOpen((v) => !v)} className="aura-button !p-3"><Plus /></button>
        </div>
        {draftOpen && <TaskComposer date={selectedDate} onAdd={(task) => { addTask(task); setDraftOpen(false); }} />}
        <div className="mt-5 space-y-3">
          {selectedTasks.map((task) => (
            <article key={task.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-3"><div><p className="font-bold">{task.title}</p><p className="text-sm text-white/55">{task.startTime}–{task.endTime} · {task.category} · focus {task.focusLevel}/5</p></div><span className="h-3 w-3 rounded-full" style={{ background: task.color }} /></div>
              <p className="mt-3 text-sm text-white/65">{task.description}</p>
              <div className="mt-4 flex gap-2"><button onClick={() => toggleTask(task.id)} className="ghost-button !px-3 !py-2 text-xs">{task.completed ? 'Complete' : 'Mark done'}</button><button onClick={() => startFocus(task.id)} className="aura-button !px-3 !py-2 text-xs">Start focus</button></div>
            </article>
          ))}
        </div>
      </aside>
    </section>
  );
}

function TaskComposer({ date, onAdd }: { date: string; onAdd: (task: LifeTask) => void }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory>('study');
  return (
    <form className="mt-5 rounded-3xl border border-aura/20 bg-aura/5 p-4" onSubmit={(e) => { e.preventDefault(); if (!title.trim()) return; onAdd({ id: crypto.randomUUID(), title, description: 'AI-ready session with reminders and auto pomodoro.', date, startTime: '18:00', endTime: '19:30', priority: 'high', category, difficulty: 3, focusLevel: 4, color: '#00BFFF', reminderMinutes: [5, 0], completed: false, mood: 'locked-in' }); }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add mission title..." className="w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-3 outline-none focus:border-aura" />
      <select value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} className="mt-3 w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-3 outline-none focus:border-aura">{categories.map((c) => <option key={c}>{c}</option>)}</select>
      <button className="aura-button mt-3 w-full">Create mission</button>
    </form>
  );
}
