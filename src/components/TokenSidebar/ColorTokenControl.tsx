import { useState, useRef, useEffect } from 'react';
import type { ColorTokenControlProps } from '../../types/theme';
import { isValidHex, normalizeHex, hexToRgb, applyOpacity } from '../../utils/colorUtils';

export function ColorTokenControl({
  name,
  label,
  value,
  onChange,
  locked = false,
  onLockToggle,
  opacity,
  onOpacityChange,
  intensity,
  onIntensityChange,
  tooltip,
}: ColorTokenControlProps) {
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(false);
  const pickerRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const validateAndSet = (newValue: string) => {
    const normalized = normalizeHex(newValue);
    const valid = isValidHex(newValue);
    setLocalError(!valid);
    if (valid) {
      onChange(normalized);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    validateAndSet(newValue);
  };

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue.toUpperCase());
    setLocalError(false);
  };

  const handleBlur = () => {
    if (!localError && localValue !== value) {
      validateAndSet(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setLocalValue(value);
      inputRef.current?.blur();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(normalizeHex(localValue));
  };

  const handleLockToggle = () => {
    onLockToggle?.();
  };

  const rgb = hexToRgb(localValue);
  const displayColor = rgb && opacity !== undefined && opacity < 1
    ? applyOpacity(localValue, opacity)
    : localValue;

  return (
    <div className="group flex items-center gap-3 p-2 rounded-lg bg-[var(--color-bg-surface)] border border-[var(--color-graphics-border)] transition-all duration-200 hover:border-[var(--color-accent-primary)]/50 animate-in">
      <div className="relative flex-shrink-0">
        <div
          className={`color-swatch w-8 h-8 rounded-md border-2 transition-all duration-200 ${locked ? 'color-swatch-locked' : ''}`}
          style={{
            backgroundColor: displayColor,
            borderColor: localError ? 'var(--color-accent-warning)' : 'var(--color-graphics-border)',
            boxShadow: localError ? '0 0 0 2px var(--color-accent-warning)/20' : 'none',
          }}
          title={tooltip}
        />
        {locked && (
          <span className="absolute -top-1 -right-1 text-xs text-[var(--color-text-muted)]">🔒</span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <label htmlFor={name} className="label text-xs">
          {label}
          {tooltip && (
            <span className="ml-1 text-[var(--color-text-muted)] cursor-help" title={tooltip}>ⓘ</span>
          )}
        </label>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            id={name}
            type="text"
            value={localValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={`input text-sm font-mono ${localError ? 'input-error' : ''}`}
            placeholder="#000000"
            disabled={locked}
            aria-invalid={localError}
            aria-describedby={localError ? `${name}-error` : undefined}
          />
          <input
            ref={pickerRef}
            type="color"
            value={normalizeHex(localValue)}
            onChange={handlePickerChange}
            className="w-8 h-8 rounded border-0 p-0 cursor-pointer bg-transparent appearance-none"
            style={{ 
              backgroundColor: 'transparent',
              border: 'none',
            }}
            disabled={locked}
            aria-label="Color picker"
          />
          <button
            onClick={handleCopy}
            className="btn-ghost p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
            aria-label="Copiar valor HEX"
            disabled={locked}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          {onLockToggle && (
            <button
              onClick={handleLockToggle}
              className={`btn-ghost p-2 transition-colors ${locked ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)]'}`}
              aria-label={locked ? 'Desbloquear color' : 'Bloquear color'}
              aria-pressed={locked}
            >
              <svg className="w-4 h-4" fill={locked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 002 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          )}
        </div>
        {localError && (
          <p id={`${name}-error`} className="text-xs text-[var(--color-accent-warning)] mt-1" role="alert">
            Formato HEX inválido. Use #RRGGBB o #RGB
          </p>
        )}
      </div>

      {(opacity !== undefined || intensity !== undefined) && (
        <div className="flex items-center gap-4 ml-2">
          {opacity !== undefined && onOpacityChange && (
            <div className="flex items-center gap-2" style={{ minWidth: '140px' }}>
              <label className="label text-xs whitespace-nowrap">Opacidad</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
                className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)]"
                disabled={locked}
                aria-label="Opacidad del color"
              />
              <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">
                {Math.round(opacity * 100)}%
              </span>
            </div>
          )}
          {intensity !== undefined && onIntensityChange && (
            <div className="flex items-center gap-2" style={{ minWidth: '140px' }}>
              <label className="label text-xs whitespace-nowrap">Intensidad</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={intensity}
                onChange={(e) => onIntensityChange(parseFloat(e.target.value))}
                className="flex-1 h-2 appearance-none bg-[var(--color-bg-panel)] rounded-full accent-[var(--color-accent-primary)]"
                disabled={locked}
                aria-label="Intensidad del color"
              />
              <span className="text-xs text-[var(--color-text-muted)] w-10 text-right">
                {Math.round(intensity * 100)}%
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}