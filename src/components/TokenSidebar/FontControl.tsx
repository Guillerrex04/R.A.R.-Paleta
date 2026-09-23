import { useState, useEffect } from 'react';
import { defaultTokens, fontOptions, weightOptions } from '../../data/palettes';

interface FontControlProps {
  tokens: typeof defaultTokens.fonts;
  onChange: (key: keyof typeof defaultTokens.fonts, value: any) => void;
}

export function FontControl({ tokens, onChange }: FontControlProps) {
  const [localTokens, setLocalTokens] = useState(tokens);

  useEffect(() => {
    setLocalTokens(tokens);
  }, [tokens]);

  const handleChange = (key: keyof typeof defaultTokens.fonts, value: any) => {
    setLocalTokens(prev => ({ ...prev, [key]: value }));
    onChange(key, value);
  };

  return (
    <div className="space-y-4 p-3 bg-[var(--color-bg-surface)] border border-[var(--color-graphics-border)] rounded-lg">
      <h4 className="font-medium text-[var(--color-text-heading)]">Tipografía</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="label">Familia de títulos</label>
          <select
            value={localTokens.titleFamily}
            onChange={(e) => handleChange('titleFamily', e.target.value)}
            className="input text-sm"
          >
            {fontOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Familia del cuerpo</label>
          <select
            value={localTokens.bodyFamily}
            onChange={(e) => handleChange('bodyFamily', e.target.value)}
            className="input text-sm"
          >
            {fontOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Familia monoespaciada</label>
          <select
            value={localTokens.monoFamily}
            onChange={(e) => handleChange('monoFamily', e.target.value)}
            className="input text-sm"
          >
            {fontOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Peso de títulos</label>
          <select
            value={localTokens.titleWeight}
            onChange={(e) => handleChange('titleWeight', parseInt(e.target.value))}
            className="input text-sm"
          >
            {weightOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Tamaño de títulos</label>
          <select
            value={localTokens.titleSize}
            onChange={(e) => handleChange('titleSize', e.target.value)}
            className="input text-sm"
          >
            <option value="2rem">2rem (32px)</option>
            <option value="2.5rem">2.5rem (40px)</option>
            <option value="3rem">3rem (48px)</option>
            <option value="3.5rem">3.5rem (56px)</option>
            <option value="4rem">4rem (64px)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label flex items-center justify-between">
            Interlineado: {localTokens.lineHeight}
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={localTokens.lineHeight}
              onChange={(e) => handleChange('lineHeight', parseFloat(e.target.value))}
              className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
            />
          </label>
        </div>
        <div>
          <label className="label flex items-center justify-between">
            Espaciado letras: {localTokens.letterSpacing}
            <input
              type="range"
              min="-0.05"
              max="0.1"
              step="0.01"
              value={parseFloat(localTokens.letterSpacing)}
              onChange={(e) => handleChange('letterSpacing', parseFloat(e.target.value).toFixed(2))}
              className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
            />
          </label>
        </div>
      </div>

      <div>
        <label className="label flex items-center justify-between">
          Transformar badges
          <select
            value={localTokens.badgeTransform}
            onChange={(e) => handleChange('badgeTransform', e.target.value as 'uppercase' | 'none')}
            className="input text-sm py-1 px-2"
          >
            <option value="uppercase">Mayúsculas</option>
            <option value="none">Normal</option>
          </select>
        </label>
      </div>
    </div>
  );
}