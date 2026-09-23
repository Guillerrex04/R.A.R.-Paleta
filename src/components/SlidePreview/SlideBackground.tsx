import { defaultTokens } from '../../data/palettes';
import { applyOpacity } from '../../utils/colorUtils';

interface SlideBackgroundProps {
  tokens: typeof defaultTokens.background;
  showGrid: boolean;
  showDecorations: boolean;
}

export function SlideBackground({ tokens, showGrid, showDecorations }: SlideBackgroundProps) {
  const gradientCSS = tokens.gradientEnabled
    ? (tokens.gradientType === 'radial'
        ? `radial-gradient(circle at ${tokens.gradientRadialPosition?.x || 50}% ${tokens.gradientRadialPosition?.y || 50}%, ${applyOpacity(tokens.gradientStart, tokens.gradientOpacity)}, transparent 70%)`
        : `linear-gradient(${tokens.gradientAngle}deg, ${applyOpacity(tokens.gradientStart, tokens.gradientOpacity)}, transparent)`)
    : 'none';

  const gridCSS = showGrid
    ? `linear-gradient(${tokens.grid} 1px, transparent 1px), linear-gradient(90deg, ${tokens.grid} 1px, transparent 1px)`
    : 'none';

  return (
    <div className="absolute inset-0 z-0" style={{
      background: tokens.primary,
      backgroundImage: `${gradientCSS}, ${gridCSS}`,
      backgroundSize: '100% 100%, 40px 40px',
      opacity: showGrid ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      {showDecorations && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: tokens.gradientStart }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15" style={{ background: tokens.gradientEnd }} />
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-[var(--color-graphics-border)]/30" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-[var(--color-graphics-border)]/20" />
        </>
      )}
    </div>
  );
}