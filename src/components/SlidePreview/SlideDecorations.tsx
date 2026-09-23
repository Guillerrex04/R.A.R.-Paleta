import { defaultTokens } from '../../data/palettes';

interface SlideDecorationsProps {
  tokens: typeof defaultTokens;
  showDecorations: boolean;
  showGrid: boolean;
}

export function SlideDecorations({ tokens, showDecorations, showGrid }: SlideDecorationsProps) {
  const { graphics, accent } = tokens;

  if (!showDecorations) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div className="absolute top-4 left-4 w-32 h-32 rounded-full border border-[var(--color-graphics-border)]/20" />
      <div className="absolute top-4 right-4 w-24 h-24 rounded-full border border-[var(--color-graphics-border)]/15" />
      <div className="absolute bottom-4 left-4 w-40 h-40 rounded-full border border-[var(--color-graphics-border)]/10" />
      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border border-[var(--color-graphics-border)]/20" />

      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-1 h-24" style={{ background: `linear-gradient(180deg, transparent, ${graphics.line}, transparent)`, opacity: 0.3 }} />
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-1 h-32" style={{ background: `linear-gradient(180deg, transparent, ${graphics.line}, transparent)`, opacity: 0.2 }} />

      <div className="absolute top-16 left-16 w-2 h-2 rounded-full" style={{ backgroundColor: accent.primary, opacity: 0.4 }} />
      <div className="absolute top-32 left-20 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.secondary, opacity: 0.3 }} />
      <div className="absolute top-48 left-12 w-1 h-1 rounded-full" style={{ backgroundColor: accent.highlight, opacity: 0.5 }} />

      <div className="absolute bottom-20 right-20 w-3 h-3 rounded-full border" style={{ borderColor: accent.primary, opacity: 0.2 }} />
      <div className="absolute bottom-32 right-28 w-2 h-2 rounded-full border" style={{ borderColor: accent.secondary, opacity: 0.15 }} />

      <svg className="absolute bottom-8 left-8 w-24 h-24" style={{ opacity: 0.1 }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke={graphics.signal} strokeWidth="0.5" strokeDasharray="4,4" />
        <circle cx="50" cy="50" r="35" fill="none" stroke={graphics.signal} strokeWidth="0.5" strokeDasharray="3,6" />
        <circle cx="50" cy="50" r="25" fill="none" stroke={graphics.signal} strokeWidth="0.5" strokeDasharray="2,8" />
      </svg>

      <svg className="absolute top-8 right-8 w-32 h-32" style={{ opacity: 0.1 }} viewBox="0 0 100 100">
        <polygon points="50,5 95,95 5,95" fill="none" stroke={graphics.chart} strokeWidth="0.5" strokeDasharray="5,5" />
        <polygon points="50,15 85,85 15,85" fill="none" stroke={graphics.chart} strokeWidth="0.5" strokeDasharray="4,6" />
        <polygon points="50,25 75,75 25,75" fill="none" stroke={graphics.chart} strokeWidth="0.5" strokeDasharray="3,7" />
      </svg>

      {showGrid && (
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${graphics.grid} 0.5px, transparent 0.5px), linear-gradient(90deg, ${graphics.grid} 0.5px, transparent 0.5px)`,
          backgroundSize: '20px 20px',
          opacity: 0.15,
        }} />
      )}
    </div>
  );
}