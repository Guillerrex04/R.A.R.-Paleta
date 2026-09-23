import { useState, useRef } from 'react';
import { importPaletteFromJSON } from '../../utils/colorUtils';
import type { ThemePalette } from '../../types/theme';

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (palette: ThemePalette) => void;
}

export function ImportDialog({ isOpen, onClose, onImport }: ImportDialogProps) {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        setJsonInput(content);
        setError('');
      } catch {
        setError('Error al leer el archivo');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSubmit = () => {
    try {
      const palette = importPaletteFromJSON(jsonInput);
      if (palette && palette.tokens && palette.name) {
        onImport(palette as ThemePalette);
        onClose();
      } else {
        setError('Formato de paleta inválido. Falta nombre o tokens.');
      }
    } catch {
      setError('JSON inválido. Verifica el formato.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="import-dialog-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[80vh] bg-[var(--color-bg-panel)] border border-[var(--color-graphics-border)] rounded-xl overflow-hidden flex flex-col animate-in">
        <div className="p-4 border-b border-[var(--color-graphics-border)] flex items-center justify-between">
          <h2 id="import-dialog-title" className="text-lg font-semibold text-[var(--color-text-heading)]">Importar Paleta</h2>
          <button onClick={onClose} className="btn-ghost p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]" aria-label="Cerrar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto">
          <p className="text-sm text-[var(--color-text-muted)]">
            Pega el JSON de una paleta exportada anteriormente o arrastra un archivo .json
          </p>

          <div
            className={`border-2 rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/5' : 'border-[var(--color-graphics-border)]'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            />
            <label htmlFor="import-file" className="cursor-pointer">
              <svg className="w-12 h-12 mx-auto mb-3 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-[var(--color-text-body)] mb-1">Arrastra un archivo JSON aquí</p>
              <p className="text-sm text-[var(--color-text-muted)]">o haz clic para seleccionar</p>
            </label>
          </div>

          <div>
            <label htmlFor="json-input" className="label">JSON de la paleta</label>
            <textarea
              id="json-input"
              value={jsonInput}
              onChange={(e) => { setJsonInput(e.target.value); setError(''); }}
              className="input font-mono text-sm min-h-[200px]"
              placeholder='{
  "name": "Mi Paleta",
  "version": "1.0",
  "tokens": { ... }
}'
              spellCheck={false}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg text-sm text-[var(--color-accent-warning)] bg-[var(--color-accent-warning)]/10 border border-[var(--color-accent-warning)]/30" role="alert">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--color-graphics-border)]">
            <button onClick={onClose} className="btn-secondary">Cancelar</button>
            <button onClick={handleSubmit} className="btn-primary" disabled={!jsonInput.trim()}>
              Importar Paleta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}