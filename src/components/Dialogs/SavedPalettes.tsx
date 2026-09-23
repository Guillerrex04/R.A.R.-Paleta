import { useState } from 'react';
import type { ThemePalette } from '../../types/theme';

interface SavedPalettesProps {
  palettes: ThemePalette[];
  currentPaletteName: string;
  onLoad: (palette: ThemePalette) => void;
  onDelete: (name: string) => void;
  onDuplicate: (name: string) => void;
  onRename: (oldName: string, newName: string) => void;
}

export function SavedPalettes({ palettes, currentPaletteName, onLoad, onDelete, onDuplicate, onRename }: SavedPalettesProps) {
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleRenameStart = (name: string) => {
    setRenaming(name);
    setRenameValue(name);
  };

  const handleRenameConfirm = (oldName: string) => {
    if (renameValue.trim() && renameValue !== oldName) {
      onRename(oldName, renameValue.trim());
    }
    setRenaming(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, oldName: string) => {
    if (e.key === 'Enter') handleRenameConfirm(oldName);
    if (e.key === 'Escape') setRenaming(null);
  };

  if (palettes.length === 0) {
    return (
      <div className="p-6 text-center text-[var(--color-text-muted)]">
        <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p>No hay paletas guardadas</p>
        <p className="text-sm mt-1">Guarda tu primera paleta usando el botón "Guardar"</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {palettes.map(palette => (
        <div key={palette.name} className="group p-3 rounded-lg border transition-all" style={{
          backgroundColor: currentPaletteName === palette.name ? 'var(--color-accent-primary)/10' : 'var(--color-bg-surface)',
          borderColor: currentPaletteName === palette.name ? 'var(--color-accent-primary)' : 'var(--color-graphics-border)',
        }}>
          {renaming === palette.name ? (
            <input
              type="text"
              value={renameValue}
              onChange={e => setRenameValue(e.target.value)}
              onBlur={() => handleRenameConfirm(palette.name)}
              onKeyDown={e => handleKeyDown(e, palette.name)}
              autoFocus
              className="input text-sm w-full"
            />
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={() => onLoad(palette)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <div className="flex gap-1">
                  <div className="w-6 h-6 rounded" style={{ background: `linear-gradient(135deg, ${palette.tokens.accent.primary}, ${palette.tokens.accent.secondary})` }} />
                  <div className="w-6 h-6 rounded" style={{ background: `linear-gradient(135deg, ${palette.tokens.background.gradientStart}, ${palette.tokens.background.gradientEnd})` }} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-[var(--color-text-heading)] truncate">{palette.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)] font-mono">
                    v{palette.version} • {new Date(palette.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </button>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); handleRenameStart(palette.name); }}
                  className="btn-ghost p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                  aria-label="Renombrar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDuplicate(palette.name); }}
                  className="btn-ghost p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                  aria-label="Duplicar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(palette.name); }}
                  className="btn-ghost p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent-highlight)]"
                  aria-label="Eliminar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}