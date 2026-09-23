import { defaultTokens } from '../../data/palettes';
import { getContrastRatio, getContrastResult, areColorsSimilar, hexToRgb } from '../../utils/colorUtils';

interface AnalysisPanelProps {
  tokens: typeof defaultTokens;
}

const COLOR_BLIND_FILTERS = {
  protanopia: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='protanopia'><feColorMatrix type='matrix' values='0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0'/></filter></svg>#protanopia")`,
  deuteranopia: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='deuteranopia'><feColorMatrix type='matrix' values='0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0'/></filter></svg>#deuteranopia")`,
  tritanopia: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='tritanopia'><feColorMatrix type='matrix' values='0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0'/></filter></svg>#tritanopia")`,
  grayscale: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0'/></filter></svg>#grayscale")`,
};

export function AnalysisPanel({ tokens }: AnalysisPanelProps) {
  const { background, typography, accent, graphics } = tokens;

  const contrasts = [
    { name: 'Título / Fondo', fg: typography.title, bg: background.primary },
    { name: 'Título / Superficie', fg: typography.title, bg: background.surface },
    { name: 'Cuerpo / Fondo', fg: typography.body, bg: background.primary },
    { name: 'Cuerpo / Superficie', fg: typography.body, bg: background.surface },
    { name: 'Subtítulo / Fondo', fg: typography.subtitle, bg: background.primary },
    { name: 'Botón / Texto botón', fg: accent.buttonText, bg: accent.button },
    { name: 'Primario / Fondo', fg: accent.primary, bg: background.primary },
    { name: 'Éxito / Fondo', fg: accent.success, bg: background.primary },
    { name: 'Alerta / Fondo', fg: accent.warning, bg: background.primary },
  ];

  const contrastResults = contrasts.map(c => ({
    ...c,
    result: getContrastResult(c.fg, c.bg),
  }));

  const allColors = [
    { name: 'Fondo principal', color: background.primary },
    { name: 'Fondo secundario', color: background.secondary },
    { name: 'Superficie', color: background.surface },
    { name: 'Panel', color: background.panel },
    { name: 'Título', color: typography.title },
    { name: 'Encabezado', color: typography.heading },
    { name: 'Subtítulo', color: typography.subtitle },
    { name: 'Cuerpo', color: typography.body },
    { name: 'Atenuado', color: typography.muted },
    { name: 'Primario', color: accent.primary },
    { name: 'Secundario', color: accent.secondary },
    { name: 'Resaltado', color: accent.highlight },
    { name: 'Alerta', color: accent.warning },
    { name: 'Éxito', color: accent.success },
    { name: 'Información', color: accent.info },
    { name: 'Botón', color: accent.button },
    { name: 'Texto botón', color: accent.buttonText },
    { name: 'Líneas', color: graphics.line },
    { name: 'Retícula', color: graphics.grid },
    { name: 'Bordes', color: graphics.border },
  ];

  const similarPairs: string[] = [];
  for (let i = 0; i < allColors.length; i++) {
    for (let j = i + 1; j < allColors.length; j++) {
      if (areColorsSimilar(allColors[i].color, allColors[j].color, 25)) {
        similarPairs.push(`${allColors[i].name} ≈ ${allColors[j].name}`);
      }
    }
  }

  const lowContrastTexts = contrastResults
    .filter(c => !c.result.aa && !c.result.aaLarge)
    .map(c => `${c.name} (${c.result.ratio}:1)`);

  const warnings: string[] = [];
  if (lowContrastTexts.length > 0) {
    warnings.push(`Textos con bajo contraste: ${lowContrastTexts.join(', ')}`);
  }
  if (similarPairs.length > 0) {
    warnings.push(`Colores muy similares: ${similarPairs.slice(0, 3).join(', ')}`);
  }
  if (getContrastRatio(accent.button, accent.buttonText) < 3) {
    warnings.push('Contraste botón/texto insuficiente para texto grande (WCAG AA Large)');
  }
  if (getContrastRatio(typography.body, background.primary) < 4.5) {
    warnings.push('Texto principal no cumple WCAG AA sobre fondo principal');
  }

  const passingAA = contrastResults.filter(c => c.result.aa).length;
  const passingAAA = contrastResults.filter(c => c.result.aaa).length;
  const total = contrastResults.length;

  return (
    <div className="panel overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[var(--color-graphics-border)]">
        <h3 className="font-semibold text-[var(--color-text-heading)] flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Análisis de Accesibilidad
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="text-2xl font-bold text-[var(--color-accent-success)]">{passingAA}</div>
            <div className="text-xs text-[var(--color-text-muted)]">WCAG AA</div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="text-2xl font-bold text-[var(--color-accent-info)]">{passingAAA}</div>
            <div className="text-xs text-[var(--color-text-muted)]">WCAG AAA</div>
          </div>
          <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
            <div className="text-2xl font-bold text-[var(--color-text-heading)]">{total}</div>
            <div className="text-xs text-[var(--color-text-muted)]">Total pares</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-[var(--color-text-heading)] mb-3">Contraste de pares clave</h4>
          <div className="space-y-2">
            {contrastResults.map(({ name, result }) => (
              <div key={name} className="flex items-center justify-between p-2 rounded" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <span className="text-sm text-[var(--color-text-body)]">{name}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${result.aaa ? 'bg-[var(--color-accent-success)]/20 text-[var(--color-accent-success)]' : result.aa ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]' : result.aaLarge ? 'bg-[var(--color-accent-warning)]/20 text-[var(--color-accent-warning)]' : 'bg-[var(--color-accent-highlight)]/20 text-[var(--color-accent-highlight)]'}`}
                  >
                    {result.ratio}:1
                  </span>
                  <div className="flex gap-1">
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${result.aa ? 'bg-[var(--color-accent-success)]/30 text-[var(--color-accent-success)]' : 'bg-[var(--color-bg-panel)] text-[var(--color-text-muted)]'}`}>AA</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${result.aaa ? 'bg-[var(--color-accent-info)]/30 text-[var(--color-accent-info)]' : 'bg-[var(--color-bg-panel)] text-[var(--color-text-muted)]'}`}>AAA</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${result.aaLarge ? 'bg-[var(--color-accent-primary)]/30 text-[var(--color-accent-primary)]' : 'bg-[var(--color-bg-panel)] text-[var(--color-text-muted)]'}`}>AA Lg</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded ${result.aaaLarge ? 'bg-[var(--color-accent-info)]/30 text-[var(--color-accent-info)]' : 'bg-[var(--color-bg-panel)] text-[var(--color-text-muted)]'}`}>AAA Lg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-accent-warning)/10', borderColor: 'var(--color-accent-warning)' }}>
            <h4 className="text-sm font-medium text-[var(--color-accent-warning)] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Advertencias
            </h4>
            <ul className="space-y-1 text-sm text-[var(--color-text-body)]">
              {warnings.map((warning, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-warning)] mt-0.5">•</span>
                  <span>{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-[var(--color-text-heading)] mb-3">Simulación de daltonismo</h4>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(COLOR_BLIND_FILTERS).map(([name, filter]) => (
              <div key={name} className="p-3 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                <div className="text-xs font-medium text-[var(--color-text-muted)] mb-2 capitalize">{name}</div>
                <div className="grid grid-cols-6 gap-1">
                  {allColors.slice(0, 12).map(({ name, color }) => (
                    <div key={name} className="relative aspect-square rounded" style={{
                      backgroundColor: color,
                      filter: filter,
                      WebkitFilter: filter,
                    }}>
                      <div className="absolute bottom-0 left-0 right-0 p-1 text-[8px] text-white truncate" style={{ textShadow: '0 0 2px black' }}>
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-[var(--color-text-heading)] mb-3">Resumen de colores</h4>
          <div className="space-y-1">
            {allColors.map(({ name, color }) => {
              const rgb = hexToRgb(color);
              const luminance = rgb ? (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255 : 0;
              return (
                <div key={name} className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="w-8 h-8 rounded border" style={{ backgroundColor: color, borderColor: 'var(--color-graphics-border)' }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--color-text-heading)] truncate">{name}</div>
                    <div className="text-xs text-[var(--color-text-muted)] font-mono">{color.toUpperCase()}</div>
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)] font-mono w-20 text-right">
                    L: {(luminance * 100).toFixed(0)}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}