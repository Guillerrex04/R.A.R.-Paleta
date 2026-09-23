import { useState, useCallback, useEffect, useRef } from 'react';
import type { ThemeTokens, ThemePalette } from '../types/theme';
import { defaultTokens } from '../data/palettes';
import { applyCSSVariables, tokensToCSSVariables } from '../utils/colorUtils';

const STORAGE_KEY = 'rar-theme-builder-palettes';
const CURRENT_KEY = 'rar-theme-builder-current';
const THEME_MODE_KEY = 'rar-theme-builder-mode';

export function useThemeBuilder() {
  const [currentPalette, setCurrentPalette] = useState<ThemePalette>(() => {
    try {
      const saved = localStorage.getItem(CURRENT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: 'Nueva Paleta',
      version: '1.0',
      tokens: defaultTokens,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  const [savedPalettes, setSavedPalettes] = useState<ThemePalette[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem(THEME_MODE_KEY);
      if (saved) return saved as 'light' | 'dark';
    } catch {}
    return 'dark';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showDecorations, setShowDecorations] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const historyRef = useRef<ThemeTokens[]>([defaultTokens]);
  const historyIndexRef = useRef(0);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    applyCSSVariables(tokensToCSSVariables(currentPalette.tokens));
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [currentPalette.tokens, themeMode]);

  useEffect(() => {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(currentPalette));
  }, [currentPalette]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, themeMode);
  }, [themeMode]);

  const addToHistory = useCallback((tokens: ThemeTokens) => {
    if (isUpdatingRef.current) return;
    const newHistory = historyRef.current.slice(0, historyIndexRef.current + 1);
    newHistory.push(tokens);
    if (newHistory.length > 50) newHistory.shift();
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      isUpdatingRef.current = true;
      historyIndexRef.current--;
      const tokens = historyRef.current[historyIndexRef.current];
      setCurrentPalette(prev => ({
        ...prev,
        tokens,
        updatedAt: new Date().toISOString(),
      }));
      setTimeout(() => { isUpdatingRef.current = false; }, 0);
      return tokens;
    }
    return null;
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      isUpdatingRef.current = true;
      historyIndexRef.current++;
      const tokens = historyRef.current[historyIndexRef.current];
      setCurrentPalette(prev => ({
        ...prev,
        tokens,
        updatedAt: new Date().toISOString(),
      }));
      setTimeout(() => { isUpdatingRef.current = false; }, 0);
      return tokens;
    }
    return null;
  }, []);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  const updateToken = useCallback(<K extends keyof ThemeTokens>(
    category: K,
    key: keyof ThemeTokens[K],
    value: string | number | boolean | object
  ) => {
    setCurrentPalette(prev => {
      const newTokens = {
        ...prev.tokens,
        [category]: {
          ...prev.tokens[category],
          [key]: value,
        },
      } as ThemeTokens;
      
      addToHistory(newTokens);
      
      return {
        ...prev,
        tokens: newTokens,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [addToHistory]);

  const updateNestedToken = useCallback(<K extends keyof ThemeTokens>(
    category: K,
    nestedKey: string,
    key: string,
    value: string | number | boolean
  ) => {
    setCurrentPalette(prev => {
      const categoryTokens = prev.tokens[category] as any;
      const newNested = {
        ...categoryTokens[nestedKey],
        [key]: value,
      };
      const newTokens = {
        ...prev.tokens,
        [category]: {
          ...categoryTokens,
          [nestedKey]: newNested,
        },
      } as ThemeTokens;
      
      addToHistory(newTokens);
      
      return {
        ...prev,
        tokens: newTokens,
        updatedAt: new Date().toISOString(),
      };
    });
  }, [addToHistory]);

  const loadPalette = useCallback((palette: ThemePalette) => {
    isUpdatingRef.current = true;
    historyRef.current = [palette.tokens];
    historyIndexRef.current = 0;
    setCurrentPalette({
      ...palette,
      updatedAt: new Date().toISOString(),
    });
    setTimeout(() => { isUpdatingRef.current = false; }, 0);
  }, []);

  const savePalette = useCallback((name: string) => {
    const palette: ThemePalette = {
      ...currentPalette,
      name,
      updatedAt: new Date().toISOString(),
    };
    setSavedPalettes(prev => {
      const exists = prev.findIndex(p => p.name === name);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = palette;
        return updated;
      }
      return [...prev, palette];
    });
    return palette;
  }, [currentPalette]);

  const deletePalette = useCallback((name: string) => {
    setSavedPalettes(prev => prev.filter(p => p.name !== name));
  }, []);

  const duplicatePalette = useCallback((name: string) => {
    const palette = savedPalettes.find(p => p.name === name);
    if (palette) {
      const newName = `${name} (copia)`;
      const newPalette: ThemePalette = {
        ...palette,
        name: newName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSavedPalettes(prev => [...prev, newPalette]);
      return newPalette;
    }
    return null;
  }, [savedPalettes]);

  const renamePalette = useCallback((oldName: string, newName: string) => {
    setSavedPalettes(prev => prev.map(p => 
      p.name === oldName ? { ...p, name: newName, updatedAt: new Date().toISOString() } : p
    ));
    if (currentPalette.name === oldName) {
      setCurrentPalette(prev => ({ ...prev, name: newName, updatedAt: new Date().toISOString() }));
    }
  }, [currentPalette.name]);

  const exportPalette = useCallback((palette: ThemePalette) => {
    return JSON.stringify(palette, null, 2);
  }, []);

  const importPalette = useCallback((json: string) => {
    try {
      const palette = JSON.parse(json);
      if (palette.tokens && palette.name) {
        return palette as ThemePalette;
      }
      throw new Error('Invalid palette format');
    } catch {
      throw new Error('Invalid JSON');
    }
  }, []);

  const exportCSS = useCallback((tokens: ThemeTokens) => {
    const vars = tokensToCSSVariables(tokens);
    let css = ':root {\n';
    for (const [key, value] of Object.entries(vars)) {
      css += `  ${key}: ${value};\n`;
    }
    css += '}\n';
    return css;
  }, []);

  const newPalette = useCallback(() => {
    isUpdatingRef.current = true;
    historyRef.current = [defaultTokens];
    historyIndexRef.current = 0;
    setCurrentPalette({
      name: 'Nueva Paleta',
      version: '1.0',
      tokens: defaultTokens,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setTimeout(() => { isUpdatingRef.current = false; }, 0);
  }, []);

  const resetPalette = useCallback(() => {
    isUpdatingRef.current = true;
    historyRef.current = [defaultTokens];
    historyIndexRef.current = 0;
    setCurrentPalette(prev => ({
      ...prev,
      name: 'Nueva Paleta',
      tokens: defaultTokens,
      updatedAt: new Date().toISOString(),
    }));
    setTimeout(() => { isUpdatingRef.current = false; }, 0);
  }, []);

  const toggleThemeMode = useCallback(() => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return {
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
    canUndo,
    canRedo,
    undo,
    redo,
    updateToken,
    updateNestedToken,
    loadPalette,
    savePalette,
    deletePalette,
    duplicatePalette,
    renamePalette,
    exportPalette,
    importPalette,
    exportCSS,
    newPalette,
    resetPalette,
    toggleThemeMode,
  };
}