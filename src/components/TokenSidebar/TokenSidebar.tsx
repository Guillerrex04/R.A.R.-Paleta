import { TokenGroup } from './TokenGroup';
import { GradientControl } from './GradientControl';
import { FontControl } from './FontControl';
import type { ColorTokenConfig } from '../../types/theme';
import type { ThemeTokens } from '../../types/theme';

const backgroundTokens: ColorTokenConfig[] = [
  { key: 'primary', label: 'Fondo principal', category: 'background', tooltip: 'Color de fondo principal de la diapositiva' },
  { key: 'secondary', label: 'Fondo secundario', category: 'background', tooltip: 'Color de fondo para áreas secundarias' },
  { key: 'surface', label: 'Fondo de tarjetas', category: 'background', tooltip: 'Color de fondo para tarjetas y superficies elevadas' },
  { key: 'panel', label: 'Fondo de paneles', category: 'background', tooltip: 'Color de fondo para paneles y contenedores' },
];

const typographyTokens: ColorTokenConfig[] = [
  { key: 'title', label: 'Título principal', category: 'typography', tooltip: 'Color para títulos principales (H1)' },
  { key: 'heading', label: 'Títulos secundarios', category: 'typography', tooltip: 'Color para encabezados (H2, H3)' },
  { key: 'subtitle', label: 'Subtítulos', category: 'typography', tooltip: 'Color para subtítulos y texto de apoyo' },
  { key: 'body', label: 'Texto principal', category: 'typography', tooltip: 'Color para texto de párrafo principal' },
  { key: 'muted', label: 'Texto secundario', category: 'typography', tooltip: 'Color para texto secundario/atenuado' },
  { key: 'disabled', label: 'Texto desactivado', category: 'typography', tooltip: 'Color para elementos deshabilitados' },
  { key: 'onDark', label: 'Texto sobre fondos oscuros', category: 'typography', tooltip: 'Color para texto sobre fondos oscuros' },
];

const accentTokens: ColorTokenConfig[] = [
  { key: 'primary', label: 'Color primario', category: 'accent', tooltip: 'Color de marca principal' },
  { key: 'secondary', label: 'Color secundario', category: 'accent', tooltip: 'Color de marca secundario' },
  { key: 'highlight', label: 'Color de resaltado', category: 'accent', tooltip: 'Color para elementos destacados' },
  { key: 'warning', label: 'Color de alerta', category: 'accent', tooltip: 'Color para advertencias y alertas' },
  { key: 'success', label: 'Color de éxito', category: 'accent', tooltip: 'Color para estados de éxito' },
  { key: 'info', label: 'Color de información', category: 'accent', tooltip: 'Color para elementos informativos' },
  { key: 'button', label: 'Color de botones', category: 'accent', tooltip: 'Color de fondo de botones primarios' },
  { key: 'buttonText', label: 'Color del texto de botones', category: 'accent', tooltip: 'Color del texto dentro de botones' },
];

const graphicsTokens: ColorTokenConfig[] = [
  { key: 'line', label: 'Líneas y conectores', category: 'graphics', tooltip: 'Color para líneas y conectores' },
  { key: 'grid', label: 'Retícula', category: 'graphics', tooltip: 'Color para la retícula de fondo' },
  { key: 'border', label: 'Bordes', category: 'graphics', tooltip: 'Color para bordes de elementos' },
  { key: 'icon', label: 'Iconos', category: 'graphics', tooltip: 'Color para iconografía' },
  { key: 'signal', label: 'Ondas/señales', category: 'graphics', tooltip: 'Color para ondas acústicas y señales' },
  { key: 'chart', label: 'Gráficos', category: 'graphics', tooltip: 'Color para elementos de gráficos' },
  { key: 'dataPoint', label: 'Puntos de datos', category: 'graphics', tooltip: 'Color para puntos de datos' },
  { key: 'progress', label: 'Indicadores de progreso', category: 'graphics', tooltip: 'Color para barras de progreso' },
];

interface TokenSidebarProps {
  currentTokens: ThemeTokens;
  onUpdateToken: <K extends keyof ThemeTokens>(category: K, key: keyof ThemeTokens[K], value: any) => void;
  sidebarCollapsed: boolean;
}

export function TokenSidebar({ currentTokens, onUpdateToken, sidebarCollapsed }: TokenSidebarProps) {
  if (sidebarCollapsed) {
    return (
      <aside className="w-12 bg-[var(--color-bg-panel)] border-r border-[var(--color-graphics-border)] flex flex-col transition-all duration-300">
        <div className="p-3 flex items-center justify-center border-b border-[var(--color-graphics-border)]">
          <svg className="w-6 h-6 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2">
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Fondo" aria-label="Fondo">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Tipografía" aria-label="Tipografía">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16V5a3 3 0 00-5.996-1.074A4 4 0 105 11.414V16m13 0v-2.586a4 4 0 11-8 0V16m0 0l3 3m-3-3l-3 3" /></svg>
          </button>
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Énfasis" aria-label="Énfasis">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </button>
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Gráficos" aria-label="Gráficos">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </button>
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Degradado" aria-label="Degradado">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
          </button>
          <button className="w-full p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] hover:bg-[var(--color-bg-surface)] transition-colors tooltip" data-tooltip="Tipografía" aria-label="Tipografía">
            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-96 bg-[var(--color-bg-panel)] border-r border-[var(--color-graphics-border)] flex flex-col transition-all duration-300 overflow-hidden">
      <div className="p-4 border-b border-[var(--color-graphics-border)] flex items-center justify-between">
        <h2 className="font-semibold text-[var(--color-text-heading)]">Configuración</h2>
        <button className="btn-ghost p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]" aria-label="Colapsar panel">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2">Fondo</h3>
          <TokenGroup title="Colores de fondo" tokens={backgroundTokens} />
          <GradientControl tokens={currentTokens.background} onChange={(key, value) => onUpdateToken('background', key, value)} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2">Tipografía</h3>
          <TokenGroup title="Colores de texto" tokens={typographyTokens} />
          <FontControl tokens={currentTokens.fonts} onChange={(key, value) => onUpdateToken('fonts', key, value)} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2">Elementos de énfasis</h3>
          <TokenGroup title="Colores de acento" tokens={accentTokens} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider px-2">Elementos gráficos</h3>
          <TokenGroup title="Colores gráficos" tokens={graphicsTokens} />
        </div>
      </div>
    </aside>
  );
}