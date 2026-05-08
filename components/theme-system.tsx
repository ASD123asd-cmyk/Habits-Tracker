'use client';
import { animeThemes } from '@/lib/anime-themes';
import { useAuraStore } from '@/lib/store';

export function ThemeSystem() {
  const { themeId, setTheme } = useAuraStore();
  return (
    <section className="glass-panel rounded-[2rem] p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between"><div><p className="tiny-label">Anime theme engine</p><h2 className="font-display text-3xl font-black">50 safe cinematic study auras</h2></div><p className="max-w-xl text-sm text-white/55">Themes adjust colors, dashboard glow, motivational quotes, loading pulses, icons, and timer energy while avoiding inappropriate character choices.</p></div>
      <div className="mt-6 grid max-h-[38rem] gap-3 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
        {animeThemes.map((theme) => (
          <button key={theme.id} onClick={() => setTheme(theme.id)} className={`rounded-3xl border p-4 text-left transition hover:-translate-y-1 ${themeId === theme.id ? 'border-aura bg-aura/15 shadow-aura' : 'border-white/10 bg-white/5'}`}>
            <div className="flex items-center justify-between"><span className="text-2xl">{theme.icon}</span><div className="flex gap-1">{theme.colors.map((c) => <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />)}</div></div>
            <h3 className="mt-3 font-display text-lg font-bold">{theme.anime}</h3>
            <p className="mt-1 text-xs text-white/50">{theme.characters.join(' · ')}</p>
            <p className="mt-3 text-sm text-silverAura">“{theme.quote}”</p>
          </button>
        ))}
      </div>
    </section>
  );
}
