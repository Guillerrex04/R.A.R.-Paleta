export function isValidHex(hex: string): boolean {
  const cleanHex = hex.trim().replace(/^#/, '');
  if (cleanHex.length === 3) {
    return /^[0-9a-fA-F]{3}$/.test(cleanHex);
  }
  if (cleanHex.length === 6) {
    return /^[0-9a-fA-F]{6}$/.test(cleanHex);
  }
  if (cleanHex.length === 8) {
    return /^[0-9a-fA-F]{8}$/.test(cleanHex);
  }
  return false;
}

export function normalizeHex(hex: string): string {
  let cleanHex = hex.trim().replace(/^#/, '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('');
  }
  if (cleanHex.length === 6 || cleanHex.length === 8) {
    return '#' + cleanHex.toUpperCase();
  }
  return '#' + cleanHex.toUpperCase();
}

export function hexToRgb(hex: string): { r: number; g: number; b: number; a?: number } | null {
  const normalized = normalizeHex(hex);
  const cleanHex = normalized.replace(/^#/, '');
  
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    return { r, g, b };
  }
  
  if (cleanHex.length === 8) {
    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);
    const a = parseInt(cleanHex.slice(6, 8), 16) / 255;
    return { r, g, b, a };
  }
  
  return null;
}

export function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (a !== undefined) {
    return hex + toHex(Math.round(a * 255));
  }
  return hex.toUpperCase();
}

export function getLuminance(r: number, g: number, b: number): number {
  const srgb = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

export function getContrastResult(color1: string, color2: string): ContrastResult {
  const ratio = getContrastRatio(color1, color2);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5,
  };
}

export function getColorSimilarity(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const dr = rgb1.r - rgb2.r;
  const dg = rgb1.g - rgb2.g;
  const db = rgb1.b - rgb2.b;
  
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

export function areColorsSimilar(color1: string, color2: string, threshold = 30): boolean {
  return getColorSimilarity(color1, color2) < threshold;
}

export function applyOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

export function generateGradientCSS(tokens: {
  start: string;
  end: string;
  opacity: number;
  angle: number;
  type: 'linear' | 'radial';
  radialPosition?: { x: number; y: number };
  enabled: boolean;
}): string {
  if (!tokens.enabled) {
    return 'none';
  }
  
  const startWithOpacity = applyOpacity(tokens.start, tokens.opacity);
  const endWithOpacity = applyOpacity(tokens.end, 0);
  
  if (tokens.type === 'radial') {
    const pos = tokens.radialPosition || { x: 50, y: 50 };
    return `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${startWithOpacity}, ${endWithOpacity} 70%)`;
  }
  
  return `linear-gradient(${tokens.angle}deg, ${startWithOpacity}, ${endWithOpacity})`;
}

export function tokensToCSSVariables(tokens: any, prefix = 'color'): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  function flatten(obj: any, path: string[] = []) {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = [...path, key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        flatten(value, newPath);
      } else if (typeof value === 'string' && value.startsWith('#')) {
        cssVars[`--${prefix}-${newPath.join('-')}`] = value;
      } else if (typeof value === 'number') {
        cssVars[`--${prefix}-${newPath.join('-')}`] = String(value);
      }
    }
  }
  
  flatten(tokens);
  return cssVars;
}

export function applyCSSVariables(variables: Record<string, string>): void {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value);
  }
}

export function generateThemeCSS(tokens: any): string {
  const vars = tokensToCSSVariables(tokens);
  let css = ':root {\n';
  for (const [key, value] of Object.entries(vars)) {
    css += `  ${key}: ${value};\n`;
  }
  css += '}\n';
  return css;
}

export function exportPaletteAsJSON(palette: any): string {
  return JSON.stringify(palette, null, 2);
}

export function importPaletteFromJSON(json: string): any {
  try {
    return JSON.parse(json);
  } catch {
    throw new Error('Invalid JSON format');
  }
}

export function downloadFile(content: string, filename: string, type: string): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}