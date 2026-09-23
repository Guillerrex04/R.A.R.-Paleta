import { useState, useEffect } from 'react';
import { defaultTokens } from '../../data/palettes';
import { applyOpacity } from '../../utils/colorUtils';

interface GradientControlProps {
  tokens: typeof defaultTokens.background;
  onChange: (key: keyof typeof defaultTokens.background, value: any) => void;
}

export function GradientControl({ tokens, onChange }: GradientControlProps) {
  const [localTokens, setLocalTokens] = useState(tokens);

  useEffect(() => {
    setLocalTokens(tokens);
  }, [tokens]);

  const handleChange = (key: keyof typeof defaultTokens.background, value: any) => {
    setLocalTokens(prev => ({ ...prev, [key]: value }));
    onChange(key, value);
  };

  const gradientPreview = localTokens.gradientEnabled
    ? (localTokens.gradientType === 'radial'
        ? `radial-gradient(circle at ${localTokens.gradientRadialPosition?.x || 50}% ${localTokens.gradientRadialPosition?.y || 50}%, ${applyOpacity(localTokens.gradientStart, localTokens.gradientOpacity)}, transparent 70%)`
        : `linear-gradient(${localTokens.gradientAngle}deg, ${applyOpacity(localTokens.gradientStart, localTokens.gradientOpacity)}, transparent)`)
    : 'none';

  return (
    <div className="space-y-4 p-3 bg-[var(--color-bg-surface)] border border-[var(--color-graphics-border)] rounded-lg">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[var(--color-text-heading)]">Degradado de fondo</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localTokens.gradientEnabled}
            onChange={(e) => handleChange('gradientEnabled', e.target.checked)}
            className="w-4 h-4 accent-[var(--color-accent-primary)]"
          />
          <span className="text-sm text-[var(--color-text-body)]">Activo</span>
        </label>
      </div>

      {localTokens.gradientEnabled && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Color inicial</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={localTokens.gradientStart}
                  onChange={(e) => handleChange('gradientStart', e.target.value)}
                  className="w-10 h-10 rounded border-0 p-0 cursor-pointer appearance-none"
                />
                <input
                  type="text"
                  value={localTokens.gradientStart}
                  onChange={(e) => handleChange('gradientStart', e.target.value.toUpperCase())}
                  className="input text-sm font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <label className="label">Color final</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={localTokens.gradientEnd}
                  onChange={(e) => handleChange('gradientEnd', e.target.value)}
                  className="w-10 h-10 rounded border-0 p-0 cursor-pointer appearance-none"
                />
                <input
                  type="text"
                  value={localTokens.gradientEnd}
                  onChange={(e) => handleChange('gradientEnd', e.target.value.toUpperCase())}
                  className="input text-sm font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="label flex items-center justify-between">
              Tipo de degradado
              <select
                value={localTokens.gradientType}
                onChange={(e) => handleChange('gradientType', e.target.value as 'linear' | 'radial')}
                className="input text-sm py-1 px-2"
              >
                <option value="linear">Lineal</option>
                <option value="radial">Radial</option>
              </select>
            </label>
          </div>

          {localTokens.gradientType === 'linear' && (
            <div>
              <label className="label flex items-center justify-between">
                Ángulo: {localTokens.gradientAngle}°
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={localTokens.gradientAngle}
                  onChange={(e) => handleChange('gradientAngle', parseInt(e.target.value))}
                  className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
                />
              </label>
            </div>
          )}

          {localTokens.gradientType === 'radial' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label flex items-center justify-between">
                  Posición X: {localTokens.gradientRadialPosition?.x || 50}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={localTokens.gradientRadialPosition?.x || 50}
                    onChange={(e) => handleChange('gradientRadialPosition', { ...localTokens.gradientRadialPosition, x: parseInt(e.target.value) })}
                    className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
                  />
                </label>
              </div>
              <div>
                <label className="label flex items-center justify-between">
                  Posición Y: {localTokens.gradientRadialPosition?.y || 50}%
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={localTokens.gradientRadialPosition?.y || 50}
                    onChange={(e) => handleChange('gradientRadialPosition', { ...localTokens.gradientRadialPosition, y: parseInt(e.target.value) })}
                    className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
                  />
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="label flex items-center justify-between">
              Opacidad: {Math.round(localTokens.gradientOpacity * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={localTokens.gradientOpacity}
                onChange={(e) => handleChange('gradientOpacity', parseFloat(e.target.value))}
                className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)] mx-4"
              />
            </label>
          </div>

          <div className="p-3 rounded-lg border border-[var(--color-graphics-border)]" style={{ background: gradientPreview }}>
            <div className="aspect-square min-h-[80px] relative">
              <div className="absolute inset-0 bg-[var(--color-bg-primary)]" />
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2 font-mono">
              {localTokens.gradientType === 'radial'
                ? `radial-gradient(circle at ${localTokens.gradientRadialPosition?.x || 50}% ${localTokens.gradientRadialPosition?.y || 50}%, ${applyOpacity(localTokens.gradientStart, localTokens.gradientOpacity)}, transparent 70%)`
                : `linear-gradient(${localTokens.gradientAngle}deg, ${applyOpacity(localTokens.gradientStart, localTokens.gradientOpacity)}, transparent)`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}