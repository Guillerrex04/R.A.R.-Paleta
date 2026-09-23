interface SlideMetricProps {
  tokens: {
    typography: {
      title: string;
      heading: string;
      body: string;
      muted: string;
    };
    accent: {
      primary: string;
      success: string;
    };
    graphics: {
      border: string;
      progress: string;
    };
    fonts: {
      titleFamily: string;
      bodyFamily: string;
      monoFamily: string;
      titleWeight: number;
      lineHeight: number;
    };
  };
}

export function SlideMetric({ tokens }: SlideMetricProps) {
  const { typography, accent, graphics, fonts } = tokens;

  const metrics = [
    { label: 'VELOCIDAD MÁX', value: 'Mach 4.2', unit: '', color: accent.primary },
    { label: 'ALTITUD OP.', value: '25,000', unit: 'm', color: accent.success },
    { label: 'RANGO EFECT.', value: '180', unit: 'km', color: accent.primary },
    { label: 'TIEMPO REAC.', value: '< 0.8', unit: 's', color: accent.success },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-in" style={{ animationDelay: '200ms' }}>
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="relative p-4 rounded-xl border"
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderColor: graphics.border,
            borderWidth: '1px',
            transition: 'all 0.3s ease',
          }}
        >
          <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{
              fontFamily: fonts.monoFamily,
              color: typography.muted,
            }}
          >
            {metric.label}
          </p>
          <div className="flex items-baseline gap-1">
            <span
              className="font-mono"
              style={{
                fontFamily: fonts.monoFamily,
                fontSize: '2.5rem',
                fontWeight: fonts.titleWeight,
                color: typography.title,
                lineHeight: 1,
              }}
            >
              {metric.value}
            </span>
            {metric.unit && (
              <span
                className="text-sm font-medium"
                style={{
                  fontFamily: fonts.bodyFamily,
                  color: typography.body,
                }}
              >
                {metric.unit}
              </span>
            )}
          </div>
          <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: graphics.border }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${70 + index * 8}%`,
                backgroundColor: metric.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}