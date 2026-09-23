import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onExport?: () => void;
  onFullscreen?: () => void;
  onReset?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;
    
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      if (!(modifier && (e.key === 's' || e.key === 'z' || e.key === 'e'))) {
        return;
      }
    }

    if (modifier && e.key === 's') {
      e.preventDefault();
      handlers.onSave?.();
    } else if (modifier && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      handlers.onUndo?.();
    } else if (modifier && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      handlers.onRedo?.();
    } else if (modifier && e.key === 'e') {
      e.preventDefault();
      handlers.onExport?.();
    } else if (e.key === 'f' && !modifier) {
      e.preventDefault();
      handlers.onFullscreen?.();
    } else if (e.key === 'r' && !modifier) {
      e.preventDefault();
      handlers.onReset?.();
    }
  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}