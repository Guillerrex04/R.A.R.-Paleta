import { describe, it, expect } from 'vitest';
import {
  isValidHex,
  normalizeHex,
  hexToRgb,
  rgbToHex,
  getLuminance,
  getContrastRatio,
  getContrastResult,
  getColorSimilarity,
  areColorsSimilar,
  applyOpacity,
  tokensToCSSVariables,
} from '../utils/colorUtils';

describe('Color Utilities', () => {
  describe('isValidHex', () => {
    it('should validate 6-digit hex', () => {
      expect(isValidHex('#FF0000')).toBe(true);
      expect(isValidHex('#00FF00')).toBe(true);
      expect(isValidHex('#0000FF')).toBe(true);
      expect(isValidHex('#abcdef')).toBe(true);
      expect(isValidHex('#ABCDEF')).toBe(true);
    });

    it('should validate 3-digit hex', () => {
      expect(isValidHex('#F00')).toBe(true);
      expect(isValidHex('#0F0')).toBe(true);
      expect(isValidHex('#00F')).toBe(true);
      expect(isValidHex('#abc')).toBe(true);
    });

    it('should validate 8-digit hex (with alpha)', () => {
      expect(isValidHex('#FF0000FF')).toBe(true);
      expect(isValidHex('#00000000')).toBe(true);
    });

    it('should accept hex without # prefix', () => {
      expect(isValidHex('FF0000')).toBe(true);
      expect(isValidHex('abcdef')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidHex('#GG0000')).toBe(false);
      expect(isValidHex('#FF00')).toBe(false);
      expect(isValidHex('#FF00000')).toBe(false);
      expect(isValidHex('red')).toBe(false);
      expect(isValidHex('')).toBe(false);
    });
  });

  describe('normalizeHex', () => {
    it('should normalize 3-digit to 6-digit', () => {
      expect(normalizeHex('#F00')).toBe('#FF0000');
      expect(normalizeHex('#0F0')).toBe('#00FF00');
      expect(normalizeHex('#00F')).toBe('#0000FF');
      expect(normalizeHex('#abc')).toBe('#AABBCC');
    });

    it('should uppercase 6-digit hex', () => {
      expect(normalizeHex('#ff0000')).toBe('#FF0000');
      expect(normalizeHex('#abcdef')).toBe('#ABCDEF');
    });

    it('should handle 8-digit hex', () => {
      expect(normalizeHex('#ff0000ff')).toBe('#FF0000FF');
    });

    it('should handle missing #', () => {
      expect(normalizeHex('FF0000')).toBe('#FF0000');
    });
  });

  describe('hexToRgb', () => {
    it('should convert 6-digit hex to RGB', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should convert 3-digit hex to RGB', () => {
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0F0')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('should convert 8-digit hex to RGBA', () => {
      expect(hexToRgb('#FF0000FF')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
      expect(hexToRgb('#FF000080')).toEqual({ r: 255, g: 0, b: 0, a: 128/255 });
      expect(hexToRgb('#FF000000')).toEqual({ r: 255, g: 0, b: 0, a: 0 });
    });

    it('should handle hex without # prefix', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#GG0000')).toEqual({ r: NaN, g: 0, b: 0 });
    });
  });

  describe('rgbToHex', () => {
    it('should convert RGB to 6-digit hex', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#FF0000');
      expect(rgbToHex(0, 255, 0)).toBe('#00FF00');
      expect(rgbToHex(0, 0, 255)).toBe('#0000FF');
      expect(rgbToHex(255, 255, 255)).toBe('#FFFFFF');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });

    it('should clamp values', () => {
      expect(rgbToHex(300, -50, 255)).toBe('#FF00FF');
    });

    it('should convert RGBA to 8-digit hex (lowercase)', () => {
      expect(rgbToHex(255, 0, 0, 1)).toBe('#ff0000ff');
      expect(rgbToHex(255, 0, 0, 0.5)).toBe('#ff000080');
      expect(rgbToHex(255, 0, 0, 0)).toBe('#ff000000');
    });
  });

  describe('getLuminance', () => {
    it('should calculate relative luminance', () => {
      expect(getLuminance(255, 255, 255)).toBe(1);
      expect(getLuminance(0, 0, 0)).toBe(0);
      expect(getLuminance(255, 0, 0)).toBeCloseTo(0.2126, 3);
      expect(getLuminance(0, 255, 0)).toBeCloseTo(0.7152, 3);
      expect(getLuminance(0, 0, 255)).toBeCloseTo(0.0722, 3);
    });
  });

  describe('getContrastRatio', () => {
    it('should calculate contrast ratio', () => {
      expect(getContrastRatio('#FFFFFF', '#000000')).toBe(21);
      expect(getContrastRatio('#000000', '#FFFFFF')).toBe(21);
      expect(getContrastRatio('#FF0000', '#FFFFFF')).toBeCloseTo(3.99, 1);
    });
  });

  describe('getContrastResult', () => {
    it('should return WCAG compliance', () => {
      const result = getContrastResult('#FFFFFF', '#000000');
      expect(result.ratio).toBe(21);
      expect(result.aa).toBe(true);
      expect(result.aaa).toBe(true);
      expect(result.aaLarge).toBe(true);
      expect(result.aaaLarge).toBe(true);
    });

    it('should fail for low contrast', () => {
      const result = getContrastResult('#777777', '#FFFFFF');
      expect(result.aa).toBe(false);
      expect(result.aaa).toBe(false);
    });
  });

  describe('getColorSimilarity', () => {
    it('should calculate Euclidean distance', () => {
      expect(getColorSimilarity('#FF0000', '#FF0000')).toBe(0);
      expect(getColorSimilarity('#FF0000', '#00FF00')).toBeCloseTo(360.62, 1);
    });
  });

  describe('areColorsSimilar', () => {
    it('should detect similar colors', () => {
      expect(areColorsSimilar('#FF0000', '#FF0000')).toBe(true);
      expect(areColorsSimilar('#FF0000', '#FE0000')).toBe(true);
      expect(areColorsSimilar('#FF0000', '#00FF00')).toBe(false);
    });
  });

  describe('applyOpacity', () => {
    it('should apply opacity to hex', () => {
      expect(applyOpacity('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
      expect(applyOpacity('#00FF00', 1)).toBe('rgba(0, 255, 0, 1)');
      expect(applyOpacity('#0000FF', 0)).toBe('rgba(0, 0, 255, 0)');
    });
  });

  describe('tokensToCSSVariables', () => {
    it('should flatten tokens to CSS variables', () => {
      const tokens = {
        background: {
          primary: '#080B14',
          secondary: '#0D121D',
        },
        typography: {
          title: '#F1F5F9',
        },
      };

      const vars = tokensToCSSVariables(tokens, 'color');
      expect(vars['--color-background-primary']).toBe('#080B14');
      expect(vars['--color-background-secondary']).toBe('#0D121D');
      expect(vars['--color-typography-title']).toBe('#F1F5F9');
    });

    it('should include numeric values', () => {
      const tokens = {
        background: {
          gradientOpacity: 0.16,
          gradientAngle: 135,
        },
      };

      const vars = tokensToCSSVariables(tokens, 'color');
      expect(vars['--color-background-gradientOpacity']).toBe('0.16');
      expect(vars['--color-background-gradientAngle']).toBe('135');
    });
  });
});

describe('Theme Tokens Structure', () => {
  it('should have all required token categories', () => {
    const defaultTokens = {
      background: {
        primary: '#080B14',
        secondary: '#0D121D',
        surface: '#111827',
        panel: '#1A2234',
        gradientStart: '#4DA3FF',
        gradientEnd: '#7C5CFF',
        gradientOpacity: 0.16,
        gradientAngle: 135,
        gradientType: 'radial',
        gradientRadialPosition: { x: 72, y: 35 },
        gradientEnabled: true,
        grid: '#1E293B',
      },
      typography: {
        title: '#F1F5F9',
        heading: '#E2E8F0',
        subtitle: '#94A3B8',
        body: '#CBD5E1',
        muted: '#64748B',
        disabled: '#475569',
        onDark: '#FFFFFF',
      },
      accent: {
        primary: '#4DA3FF',
        secondary: '#7C5CFF',
        highlight: '#FF6B9D',
        warning: '#FFB84D',
        success: '#4ADE80',
        info: '#22D3EE',
        button: '#4DA3FF',
        buttonText: '#080B14',
      },
      graphics: {
        line: '#334155',
        grid: '#1E293B',
        border: '#334155',
        icon: '#64748B',
        signal: '#4DA3FF',
        chart: '#7C5CFF',
        dataPoint: '#FF6B9D',
        progress: '#4ADE80',
      },
      fonts: {
        titleFamily: 'Space Grotesk',
        bodyFamily: 'Inter',
        monoFamily: 'JetBrains Mono',
        titleWeight: 600,
        titleSize: '3rem',
        lineHeight: 1.4,
        letterSpacing: '-0.02em',
        badgeTransform: 'uppercase',
      },
    };

    expect(defaultTokens.background).toBeDefined();
    expect(defaultTokens.typography).toBeDefined();
    expect(defaultTokens.accent).toBeDefined();
    expect(defaultTokens.graphics).toBeDefined();
    expect(defaultTokens.fonts).toBeDefined();

    // Validate all background colors are valid hex
    Object.values(defaultTokens.background).forEach(val => {
      if (typeof val === 'string' && val.startsWith('#')) {
        expect(isValidHex(val)).toBe(true);
      }
    });

    // Validate all typography colors are valid hex
    Object.values(defaultTokens.typography).forEach(val => {
      if (typeof val === 'string' && val.startsWith('#')) {
        expect(isValidHex(val)).toBe(true);
      }
    });

    // Validate all accent colors are valid hex
    Object.values(defaultTokens.accent).forEach(val => {
      if (typeof val === 'string' && val.startsWith('#')) {
        expect(isValidHex(val)).toBe(true);
      }
    });

    // Validate all graphics colors are valid hex
    Object.values(defaultTokens.graphics).forEach(val => {
      if (typeof val === 'string' && val.startsWith('#')) {
        expect(isValidHex(val)).toBe(true);
      }
    });
  });
});