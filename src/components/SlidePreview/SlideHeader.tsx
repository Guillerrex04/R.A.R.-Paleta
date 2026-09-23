interface SlideHeaderProps {
  tokens: {
    typography: {
      title: string;
      heading: string;
      subtitle: string;
    };
    fonts: {
      titleFamily: string;
      bodyFamily: string;
      monoFamily: string;
      titleWeight: number;
      titleSize: string;
      letterSpacing: string;
      badgeTransform: 'uppercase' | 'none';
    };
  };
}

export function SlideHeader({ tokens }: SlideHeaderProps) {
  const { typography, fonts } = tokens;

  return (
    <div className="mb-8 animate-in" style={{ animationDelay: '100ms' }}>
      <span
        className="badge inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium tracking-wider"
        style={{
          backgroundColor: 'var(--color-accent-primary)',
          color: 'var(--color-accent-button-text)',
          textTransform: fonts.badgeTransform,
          fontFamily: fonts.monoFamily,
        }}
      >
        MISIÓN ALPHA-7
      </span>
      <h1
        className="mb-3 leading-tight"
        style={{
          fontFamily: fonts.titleFamily,
          fontWeight: fonts.titleWeight,
          fontSize: fonts.titleSize,
          letterSpacing: fonts.letterSpacing,
          color: typography.title,
          lineHeight: 1.1,
        }}
      >
        Interceptor UAV<br />Sistema de Defensa Autónomo
      </h1>
      <p
        className="max-w-2xl text-lg"
        style={{
          fontFamily: fonts.bodyFamily,
          color: typography.subtitle,
          lineHeight: 1.6,
        }}
      >
        Plataforma de intercepción autónoma de última generación para neutralización
        de amenazas aéreas no tripuladas en entornos contenciosos.
      </p>
    </div>
  );
}