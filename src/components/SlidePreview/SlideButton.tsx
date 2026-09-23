interface SlideButtonProps {
  tokens: {
    accent: {
      button: string;
      buttonText: string;
      primary: string;
    };
    typography: {
      body: string;
    };
    fonts: {
      bodyFamily: string;
    };
  };
}

export function SlideButton({ tokens }: SlideButtonProps) {
  const { accent, typography, fonts } = tokens;

  return (
    <div className="flex items-center gap-4 animate-in" style={{ animationDelay: '600ms' }}>
      <button
        className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          fontFamily: fonts.bodyFamily,
          backgroundColor: accent.button,
          color: accent.buttonText,
          border: 'none',
          boxShadow: `0 4px 14px ${accent.button}40`,
        }}
      >
        INICIAR SECUENCIA DE LANZAMIENTO
      </button>
      <button
        className="px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-200 hover:bg-[var(--color-bg-panel)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          fontFamily: fonts.bodyFamily,
          color: typography.body,
          borderColor: 'var(--color-graphics-border)',
          backgroundColor: 'transparent',
        }}
      >
        ABORTAR MISIÓN
      </button>
    </div>
  );
}