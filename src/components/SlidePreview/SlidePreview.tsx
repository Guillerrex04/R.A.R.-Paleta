import { defaultTokens } from '../../data/palettes';
import { SlideBackground } from './SlideBackground';
import { SlideHeader } from './SlideHeader';
import { SlideMetric } from './SlideMetric';
import { SlideDiagram } from './SlideDiagram';
import { SlideTimeline } from './SlideTimeline';
import { SlideCard } from './SlideCard';
import { SlideButton } from './SlideButton';
import { SlideDecorations } from './SlideDecorations';

interface SlidePreviewProps {
  tokens: typeof defaultTokens;
  showGrid: boolean;
  showDecorations: boolean;
  fullscreen: boolean;
  zoom: number;
  onFullscreenToggle: () => void;
  onGridToggle: () => void;
  onDecorationsToggle: () => void;
  onZoomReset: () => void;
}

export function SlidePreview({
  tokens,
  showGrid,
  showDecorations,
  fullscreen,
  zoom,
  onFullscreenToggle,
  onGridToggle,
  onDecorationsToggle,
  onZoomReset,
}: SlidePreviewProps) {
  const { typography, accent, background, fonts, graphics } = tokens;

  const containerStyle = {
    transform: `scale(${zoom})`,
    transformOrigin: 'center center',
    transition: 'transform 0.2s ease',
  } as React.CSSProperties;

  return (
    <div className="relative flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto" style={containerStyle}>
      <div className="slide-container relative w-full max-w-5xl" style={{ maxWidth: '1200px' }}>
        <SlideBackground tokens={background} showGrid={showGrid} showDecorations={showDecorations} />
        <SlideDecorations tokens={tokens} showDecorations={showDecorations} showGrid={showGrid} />

        <div className="slide-content relative z-10" style={{ fontFamily: fonts.bodyFamily }}>
          <SlideHeader tokens={{ typography, fonts }} />
          <SlideMetric tokens={{ typography, accent, graphics, fonts }} />
          <SlideDiagram tokens={tokens} showDecorations={showDecorations} />
          <SlideTimeline tokens={{ typography, accent, graphics, fonts }} />
          <SlideCard tokens={{ typography, accent, graphics, fonts, background }} />
          <SlideButton tokens={{ accent, typography, fonts }} />
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20" style={{ pointerEvents: 'auto' }}>
          <button
            onClick={onFullscreenToggle}
            className="btn-secondary p-2"
            aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            title={fullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {fullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4h4m0 0l8 8M12 20V16m0 0h4m-4 0l8-8m-12 12h4m-4 0l8 8" />
              )}
            </svg>
          </button>
          <button
            onClick={onGridToggle}
            className={`btn-secondary p-2 ${showGrid ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]' : ''}`}
            aria-label={showGrid ? 'Ocultar retícula' : 'Mostrar retícula'}
            aria-pressed={showGrid}
            title={showGrid ? 'Ocultar retícula' : 'Mostrar retícula'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16M4 4h16M4 4l16 16" />
            </svg>
          </button>
          <button
            onClick={onDecorationsToggle}
            className={`btn-secondary p-2 ${showDecorations ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]' : ''}`}
            aria-label={showDecorations ? 'Ocultar decoraciones' : 'Mostrar decoraciones'}
            aria-pressed={showDecorations}
            title={showDecorations ? 'Ocultar decoraciones' : 'Mostrar decoraciones'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>
          <button
            onClick={onZoomReset}
            className="btn-secondary p-2"
            aria-label="Restablecer zoom"
            title="Restablecer zoom (R)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}