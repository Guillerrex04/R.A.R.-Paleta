import { useState, useEffect, useRef } from 'react';
import type { ThemePalette } from '../../types/theme';
import { exportPaletteAsJSON, downloadFile, tokensToCSSVariables } from '../../utils/colorUtils';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  palette: ThemePalette;
  tokens: any;
}

export function ExportDialog({ isOpen, onClose, palette, tokens }: ExportDialogProps) {
  const [activeTab, setActiveTab] = useState<'json' | 'css' | 'tokens'>('json');
  const [jsonContent, setJsonContent] = useState('');
  const [cssContent, setCssContent] = useState('');
  const [tokensContent, setTokensContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      const json = exportPaletteAsJSON(palette);
      setJsonContent(json);
      
      const cssVars = tokensToCSSVariables(tokens);
      let css = ':root {\n';
      for (const [key, value] of Object.entries(cssVars)) {
        css += `  ${key}: ${value};\n`;
      }
      css += '}\n';
      setCssContent(css);
      
      setTokensContent(JSON.stringify(tokens, null, 2));
    }
  }, [isOpen, palette, tokens]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleDownload = (content: string, filename: string, type: string) => {
    downloadFile(content, filename, type);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="export-dialog-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-3xl max-h-[80vh] bg-[var(--color-bg-panel)] border border-[var(--color-graphics-border)] rounded-xl overflow-hidden flex flex-col animate-in">
        <div className="p-4 border-b border-[var(--color-graphics-border)] flex items-center justify-between">
          <h2 id="export-dialog-title" className="text-lg font-semibold text-[var(--color-text-heading)]">Exportar Paleta</h2>
          <button onClick={onClose} className="btn-ghost p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]" aria-label="Cerrar">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex border-b border-[var(--color-graphics-border)] overflow-x-auto">
          {['json', 'css', 'tokens'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]'}`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[var(--color-text-muted)]">
              {activeTab === 'json' && `Paletas completa: ${palette.name} v${palette.version}`}
              {activeTab === 'css' && 'Variables CSS personalizadas'}
              {activeTab === 'tokens' && 'Tokens de diseño (JSON)'}
            </span>
            <div className="flex gap-2">
              <button onClick={() => handleCopy(activeTab === 'json' ? jsonContent : activeTab === 'css' ? cssContent : tokensContent)} className="btn-secondary text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </button>
              <button onClick={() => handleDownload(
                activeTab === 'json' ? jsonContent : activeTab === 'css' ? cssContent : tokensContent,
                activeTab === 'json' ? `${palette.name.toLowerCase().replace(/\s+/g, '-')}.json` : activeTab === 'css' ? 'theme.css' : 'tokens.json',
                activeTab === 'css' ? 'text/css' : 'application/json'
              )} className="btn-primary text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar
              </button>
            </div>
          </div>

          <div className="h-[calc(100%-48px)] relative">
            <textarea
              ref={textareaRef}
              readOnly
              className="w-full h-full font-mono text-sm p-3 rounded bg-[var(--color-bg-surface)] border border-[var(--color-graphics-border)] text-[var(--color-text-body)] resize-none"
              value={activeTab === 'json' ? jsonContent : activeTab === 'css' ? cssContent : tokensContent}
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}