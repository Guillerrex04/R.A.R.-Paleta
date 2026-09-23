import { applyOpacity } from '../../utils/colorUtils';

interface SlideTimelineProps {
  tokens: {
    typography: {
      body: string;
      muted: string;
      heading: string;
    };
    accent: {
      primary: string;
      success: string;
      warning: string;
    };
    graphics: {
      line: string;
      border: string;
      progress: string;
    };
    fonts: {
      monoFamily: string;
      bodyFamily: string;
    };
  };
}

export function SlideTimeline({ tokens }: SlideTimelineProps) {
  const { typography, accent, graphics, fonts } = tokens;

  const phases = [
    { id: 1, label: 'DETECCIÓN', time: 'T-00:00', status: 'complete', color: accent.success, desc: 'Radar AESA detecta objetivo a 200km' },
    { id: 2, label: 'TRACKING', time: 'T+00:12', status: 'complete', color: accent.success, desc: 'Bloqueo de radar y clasificación de amenaza' },
    { id: 3, label: 'LANZAMIENTO', time: 'T+00:45', status: 'active', color: accent.primary, desc: 'Interceptor UAV-7X lanzado desde silo' },
    { id: 4, label: 'CRUCERO', time: 'T+02:30', status: 'pending', color: accent.warning, desc: 'Vuelo supersónico hacia punto de intercepción' },
    { id: 5, label: 'INTERCEPCIÓN', time: 'T+04:15', status: 'pending', color: accent.warning, desc: 'Maniobra terminal y impacto cinético' },
    { id: 6, label: 'CONFIRMACIÓN', time: 'T+04:20', status: 'pending', color: accent.warning, desc: 'Verificación de neutralización de objetivo' },
  ];

  return (
    <div className="relative animate-in" style={{ animationDelay: '400ms' }}>
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="font-semibold"
          style={{
            fontFamily: fonts.bodyFamily,
            color: typography.heading,
          }}
        >
          CRONOLOGÍA DE MISIÓN
        </h3>
        <span
          className="badge px-2 py-1 text-xs"
          style={{
            backgroundColor: applyOpacity(accent.primary, 0.2),
            color: accent.primary,
            border: `1px solid ${accent.primary}`,
            fontFamily: fonts.monoFamily,
          }}
        >
          EN PROGRESO
        </span>
      </div>

      <div className="relative pl-8">
        <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ backgroundColor: graphics.line }} />
        
        {phases.map((phase) => (
          <div key={phase.id} className="relative pb-8 last:pb-0 flex items-start gap-4">
            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center z-10">
              <div
                className="relative w-3 h-3 rounded-full border-4 transition-all duration-300"
                style={{
                  backgroundColor: phase.status === 'complete' ? phase.color : 'var(--color-bg-surface)',
                  borderColor: phase.color,
                  boxShadow: phase.status === 'active' ? `0 0 0 4px ${applyOpacity(phase.color, 0.2)}` : 'none',
                }}
              >
                {phase.status === 'complete' && (
                  <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {phase.status === 'active' && (
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: phase.color, opacity: 0.6 }} />
                )}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className="font-semibold text-sm"
                  style={{
                    fontFamily: fonts.bodyFamily,
                    color: phase.status === 'pending' ? typography.muted : typography.heading,
                  }}
                >
                  {phase.label}
                </span>
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded"
                  style={{
                    fontFamily: fonts.monoFamily,
                    backgroundColor: applyOpacity(phase.color, 0.15),
                    color: phase.color,
                    border: `1px solid ${applyOpacity(phase.color, 0.3)}`,
                  }}
                >
                  {phase.time}
                </span>
              </div>
              <p
                className="text-sm"
                style={{
                  fontFamily: fonts.bodyFamily,
                  color: phase.status === 'pending' ? typography.muted : typography.body,
                }}
              >
                {phase.desc}
              </p>
              <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: graphics.border }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: phase.status === 'complete' ? '100%' : phase.status === 'active' ? '65%' : '0%',
                    backgroundColor: phase.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}