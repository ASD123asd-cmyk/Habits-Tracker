import Link from 'next/link';
import { BrainCircuit, CalendarDays, Focus, LayoutDashboard, Sparkles } from 'lucide-react';

export function Nav() {
  const items = [
    ['Command', '/', CalendarDays],
    ['Focus', '/focus', Focus],
    ['Dashboard', '/dashboard', LayoutDashboard],
    ['AI Coach', '/#assistant', BrainCircuit]
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-void/70 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-aura text-void shadow-aura"><Sparkles /></span>
          <div>
            <p className="font-display text-lg font-black tracking-wide">Aura Exam OS</p>
            <p className="tiny-label">Ultra Instinct Study System</p>
          </div>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {items.map(([label, href, Icon]) => <Link key={label} href={href} className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"><Icon size={17} />{label}</Link>)}
        </div>
        <Link href="/login" className="aura-button hidden md:inline-flex">Enter OS</Link>
      </nav>
    </header>
  );
}
