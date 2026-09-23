import { useState, useRef, useEffect } from 'react';
import { presetPalettes } from '../../data/palettes';

interface HeaderProps {
  currentPaletteName: string;
  themeMode: 'light' | 'dark';
  sidebarCollapsed: boolean;
  onNewPalette: () => void;
  onSavePalette: () => void;
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
  onThemeModeToggle: () => void;
  onToggleSidebar: () => void;
  onLoadPreset: (palette: typeof presetPalettes[0]) => void;
}

export function Header({
  currentPaletteName,
  themeMode,
  sidebarCollapsed,
  onNewPalette,
  onSavePalette,
  onExport,
  onImport,
  onReset,
  onThemeModeToggle,
  onToggleSidebar,
  onLoadPreset,
}: HeaderProps) {
  const [showPresets, setShowPresets] = useState(false);
  const presetsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (presetsRef.current && !presetsRef.current.contains(e.target as Node)) {
        setShowPresets(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-[var(--color-bg-panel)] border-b border-[var(--color-graphics-border)] flex items-center justify-between px-4 md:px-6 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="btn-ghost p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)] md:hidden"
          aria-label={sidebarCollapsed ? 'Expandir panel' : 'Colapsar panel'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'} />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary))' }}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <span className="font-bold text-xl text-[var(--color-text-heading)] tracking-tight">R.A.R. Theme Builder</span>
        </div>
      </div>

      <div className="flex items-center gap-2 hidden md:flex">
        <span className="text-sm text-[var(--color-text-muted)]">Paleta actual:</span>
        <span className="font-medium text-[var(--color-text-heading)] px-3 py-1 rounded bg-[var(--color-bg-surface)] border border-[var(--color-graphics-border)]">
          {currentPaletteName}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <div className="relative" ref={presetsRef}>
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="btn-secondary gap-2"
            aria-haspopup="true"
            aria-expanded={showPresets}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="hidden sm:inline">Paletas</span>
            <svg className={`w-4 h-4 transition-transform ${showPresets ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showPresets && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[var(--color-bg-panel)] border border-[var(--color-graphics-border)] rounded-lg shadow-lg py-2 z-50 animate-in">
              {presetPalettes.map(palette => (
                <button
                  key={palette.name}
                  onClick={() => { onLoadPreset(palette); setShowPresets(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-[var(--color-bg-surface)] flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded border" style={{ background: `linear-gradient(135deg, ${palette.tokens.accent.primary}, ${palette.tokens.accent.secondary})` }} />
                  <span className="text-sm text-[var(--color-text-body)]">{palette.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={onNewPalette} className="btn-secondary" title="Nueva paleta (Ctrl+N)">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Nueva</span>
        </button>

        <button onClick={onSavePalette} className="btn-primary" title="Guardar paleta (Ctrl+S)">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-1M9 5v2m0 0v2m0-2h6m-6 0H7" />
          </svg>
          <span className="hidden sm:inline">Guardar</span>
        </button>

        <button onClick={onExport} className="btn-secondary" title="Exportar (Ctrl+E)">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span className="hidden sm:inline">Exportar</span>
        </button>

        <button onClick={onImport} className="btn-secondary" title="Importar">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="hidden sm:inline">Importar</span>
        </button>

        <button onClick={onReset} className="btn-secondary" title="Restablecer (R)">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Restablecer</span>
        </button>

        <button onClick={onThemeModeToggle} className="btn-secondary" title={`Cambiar a modo ${themeMode === 'dark' ? 'claro' : 'oscuro'}`}>
          {themeMode === 'dark' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}