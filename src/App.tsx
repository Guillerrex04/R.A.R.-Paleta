import { useState, useCallback } from 'react';
import type { ThemeTokens, ThemePalette } from './types/theme';
import { useThemeBuilder } from './hooks/useThemeBuilder';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Header } from './components/Header/Header';
import { TokenSidebar } from './components/TokenSidebar/TokenSidebar';
import { SlidePreview } from './components/SlidePreview/SlidePreview';
import { AnalysisPanel } from './components/AnalysisPanel/AnalysisPanel';
import { ExportDialog } from './components/Dialogs/ExportDialog';
import { ImportDialog } from './components/Dialogs/ImportDialog';
import { SavedPalettes } from './components/Dialogs/SavedPalettes';
import { ToastContainer } from './components/Dialogs/Toast';

function App() {
  const {
    currentPalette,
    savedPalettes,
    themeMode,
    sidebarCollapsed,
    setSidebarCollapsed,
    showGrid,
    setShowGrid,
    showDecorations,
    setShowDecorations,
    fullscreen,
    setFullscreen,
    zoom,
    setZoom,
    undo,
    redo,
    updateToken,
    loadPalette,
    savePalette,
    deletePalette,
    duplicatePalette,
    renamePalette,
    newPalette,
    resetPalette,
    toggleThemeMode,
  } = useThemeBuilder();

  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleNewPalette = useCallback(() => {
    newPalette();
    (window as any).showToast?.('Nueva paleta creada', 'info');
  }, [newPalette]);

  const handleSavePalette = useCallback(() => {
    const name = prompt('Nombre de la paleta:', currentPalette.name);
    if (name) {
      savePalette(name);
      (window as any).showToast?.(`Paleta "${name}" guardada`, 'success');
    }
  }, [currentPalette.name, savePalette]);

  const handleExport = useCallback(() => {
    setShowExportDialog(true);
  }, []);

  const handleImport = useCallback(() => {
    setShowImportDialog(true);
  }, []);

  const handleReset = useCallback(() => {
    if (confirm('¿Restablecer la paleta actual a los valores por defecto?')) {
      resetPalette();
      (window as any).showToast?.('Paleta restablecida', 'info');
    }
  }, [resetPalette]);

  const handleLoadPreset = useCallback((palette: ThemePalette) => {
    loadPalette(palette);
    (window as any).showToast?.(`Cargada: ${palette.name}`, 'success');
  }, [loadPalette]);

  const handleImportConfirm = useCallback((palette: ThemePalette) => {
    loadPalette(palette);
    (window as any).showToast?.(`Importada: ${palette.name}`, 'success');
  }, [loadPalette]);

  const handleExportClose = useCallback(() => {
    setShowExportDialog(false);
  }, []);

  const handleImportClose = useCallback(() => {
    setShowImportDialog(false);
  }, []);

  const handleFullscreenToggle = useCallback(() => {
    setFullscreen(prev => !prev);
  }, [setFullscreen]);

  const handleGridToggle = useCallback(() => {
    setShowGrid(prev => !prev);
  }, [setShowGrid]);

  const handleDecorationsToggle = useCallback(() => {
    setShowDecorations(prev => !prev);
  }, [setShowDecorations]);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, [setZoom]);

  const handleToggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, [setSidebarCollapsed]);

  const handleThemeModeToggle = useCallback(() => {
    toggleThemeMode();
  }, [toggleThemeMode]);

  useKeyboardShortcuts({
    onSave: handleSavePalette,
    onUndo: () => { undo(); (window as any).showToast?.('Deshecho', 'info'); },
    onRedo: () => { redo(); (window as any).showToast?.('Rehecho', 'info'); },
    onExport: handleExport,
    onFullscreen: handleFullscreenToggle,
    onReset: handleReset,
  });

  const handleUpdateToken = useCallback(<K extends keyof ThemeTokens>(
    category: K,
    key: keyof ThemeTokens[K],
    value: any
  ) => {
    updateToken(category, key, value);
  }, [updateToken]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header
        currentPaletteName={currentPalette.name}
        themeMode={themeMode}
        sidebarCollapsed={sidebarCollapsed}
        onNewPalette={handleNewPalette}
        onSavePalette={handleSavePalette}
        onExport={handleExport}
        onImport={handleImport}
        onReset={handleReset}
        onThemeModeToggle={handleThemeModeToggle}
        onToggleSidebar={handleToggleSidebar}
        onLoadPreset={handleLoadPreset}
      />

      <div className="flex-1 flex overflow-hidden">
        <TokenSidebar
          currentTokens={currentPalette.tokens}
          onUpdateToken={handleUpdateToken}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 flex flex-col min-w-0">
          <SlidePreview
            tokens={currentPalette.tokens}
            showGrid={showGrid}
            showDecorations={showDecorations}
            fullscreen={fullscreen}
            zoom={zoom}
            onFullscreenToggle={handleFullscreenToggle}
            onGridToggle={handleGridToggle}
            onDecorationsToggle={handleDecorationsToggle}
            onZoomReset={handleZoomReset}
          />

          {!fullscreen && (
            <div className="h-64 md:h-72 border-t border-[var(--color-graphics-border)] bg-[var(--color-bg-panel)] flex flex-col">
              <div className="flex items-center justify-between p-3 border-b border-[var(--color-graphics-border)]">
                <h3 className="font-semibold text-[var(--color-text-heading)]">Análisis de Accesibilidad</h3>
                <button
                  onClick={() => setShowAnalysis(!showAnalysis)}
                  className="btn-ghost p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAnalysis ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {showAnalysis && <AnalysisPanel tokens={currentPalette.tokens} />}
              </div>
            </div>
          )}

          {!fullscreen && !showAnalysis && (
            <div className="h-64 border-t border-[var(--color-graphics-border)] bg-[var(--color-bg-panel)]">
              <SavedPalettes
                palettes={savedPalettes}
                currentPaletteName={currentPalette.name}
                onLoad={loadPalette}
                onDelete={deletePalette}
                onDuplicate={duplicatePalette}
                onRename={renamePalette}
              />
            </div>
          )}
        </main>
      </div>

      <ExportDialog
        isOpen={showExportDialog}
        onClose={handleExportClose}
        palette={currentPalette}
        tokens={currentPalette.tokens}
      />

      <ImportDialog
        isOpen={showImportDialog}
        onClose={handleImportClose}
        onImport={handleImportConfirm}
      />

      <ToastContainer />
    </div>
  );
}

export default App;