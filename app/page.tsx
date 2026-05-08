import { AssistantPanel } from '@/components/assistant-panel';
import { AuraBackground } from '@/components/aura-background';
import { CalendarSystem } from '@/components/calendar-system';
import { ExamCountdown } from '@/components/exam-countdown';
import { FocusMode } from '@/components/focus-mode';
import { Nav } from '@/components/nav';
import { ThemeSystem } from '@/components/theme-system';
import { Bell, Crown, Flame, Smartphone } from 'lucide-react';

export default function Home() {
  return (
    <>
      <AuraBackground />
      <Nav />
      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <div className="glass-panel rounded-[2rem] p-6 md:p-10">
            <p className="tiny-label">Futuristic anime-powered life control system</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl">Turn exam pressure into Ultra Instinct discipline.</h1>
            <p className="mt-5 max-w-3xl text-lg text-white/68">Calendar, pomodoro, habits, sleep, revision, AI coaching, push notifications, anime themes, analytics, and immersive focus mode in one cinematic student operating system.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[['XP Level', '27', Crown], ['Study streak', '14 days', Flame], ['Push ready', 'Browser + PWA', Bell], ['Native feel', 'Mobile gestures', Smartphone]].map(([label, value, Icon]) => <div key={label as string} className="rounded-3xl border border-white/10 bg-white/5 p-4"><Icon className="text-cyanGlow"/><p className="mt-3 tiny-label">{label as string}</p><p className="font-display text-2xl font-black">{value as string}</p></div>)}
            </div>
          </div>
          <ExamCountdown />
        </section>
        <CalendarSystem />
        <AssistantPanel />
        <ThemeSystem />
      </main>
      <FocusMode />
    </>
  );
}
