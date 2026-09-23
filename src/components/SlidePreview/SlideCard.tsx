interface SlideCardProps {
  tokens: {
    typography: {
      heading: string;
      body: string;
      muted: string;
    };
    accent: {
      info: string;
      success: string;
    };
    graphics: {
      border: string;
    };
    fonts: {
      bodyFamily: string;
      monoFamily: string;
    };
    background: {
      surface: string;
      panel: string;
    };
  };
}

export function SlideCard({ tokens }: SlideCardProps) {
  const { typography, accent, graphics, fonts, background } = tokens;

  return (
    <div
      className="relative p-5 rounded-xl border animate-in"
      style={{
        animationDelay: '500ms',
        backgroundColor: background.surface,
        borderColor: graphics.border,
        borderWidth: '1px',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="badge px-2 py-1 text-xs mb-2"
            style={{
              backgroundColor: applyOpacity(accent.info, 0.2),
              color: accent.info,
              border: `1px solid ${applyOpacity(accent.info, 0.3)}`,
              fontFamily: fonts.monoFamily,
              textTransform: 'uppercase',
            }}
          >
            ESPECIFICACIONES TÉCNICAS
          </span>
          <h4
            className="font-semibold"
            style={{
              fontFamily: fonts.bodyFamily,
              color: typography.heading,
            }}
          >
            Perfil de Misión Estándar
          </h4>
        </div>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent.success }} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Propulsión</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>Ramjet + Cohete</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Guiado</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>IR + Radar Activo</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Carga útil</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>Impacto Cinético</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Envergadura</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>1.8 m</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Longitud</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>4.2 m</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: background.panel }}>
            <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Masa</span>
            <span className="text-sm font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: typography.heading }}>340 kg</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor: graphics.border }}>
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ fontFamily: fonts.bodyFamily, color: typography.muted }}>Estado del sistema</span>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full overflow-hidden" style={{ backgroundColor: graphics.border }}>
              <div className="h-full rounded-full" style={{ width: '92%', backgroundColor: accent.success }} />
            </div>
            <span className="text-xs font-mono font-medium" style={{ fontFamily: fonts.monoFamily, color: accent.success }}>92% OPERATIVO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function applyOpacity(hex: string, opacity: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}