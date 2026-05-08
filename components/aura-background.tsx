export function AuraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-aura/20 blur-3xl animate-aurora" />
      <div className="absolute bottom-[-18%] right-[-8%] h-[34rem] w-[34rem] rounded-full bg-silverAura/10 blur-3xl animate-float" />
      {Array.from({ length: 42 }).map((_, i) => (
        <span key={i} className="absolute h-1 w-1 rounded-full bg-cyanGlow/70 animate-pulseGlow" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 19) % 100}%`, animationDelay: `${i * 0.13}s` }} />
      ))}
    </div>
  );
}
