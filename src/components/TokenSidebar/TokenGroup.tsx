import { useState } from 'react';
import type { TokenGroupProps, ColorTokenConfig } from '../../types/theme';
import { ColorTokenControl } from './ColorTokenControl';
import { defaultTokens } from '../../data/palettes';

export function TokenGroup({
  title,
  tokens,
  isOpen: controlledIsOpen,
  onToggle,
}: TokenGroupProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen ?? true);
  const isControlled = controlledIsOpen !== undefined;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setIsOpen(prev => !prev);
    }
  };

  const getTokenValue = (config: ColorTokenConfig): any => {
    const categoryTokens = defaultTokens[config.category as keyof typeof defaultTokens] as any;
    if (config.key.includes('.')) {
      const [nested, key] = config.key.split('.');
      return categoryTokens[nested]?.[key];
    }
    return categoryTokens[config.key];
  };

  const getTokenOpacity = (config: ColorTokenConfig): number | undefined => {
    if (config.hasOpacity && config.key === 'gradientOpacity') {
      return defaultTokens.background.gradientOpacity;
    }
    return undefined;
  };

  const getTokenIntensity = (config: ColorTokenConfig): number | undefined => {
    if (config.hasIntensity && config.key === 'gradientOpacity') {
      return defaultTokens.background.gradientOpacity;
    }
    return undefined;
  };

  return (
    <div className="border-b border-[var(--color-graphics-border)] last:border-0 animate-in">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-[var(--color-bg-panel)] rounded-t-lg transition-colors"
        aria-expanded={isOpen}
        aria-controls={`${title}-content`}
      >
        <h3 className="font-medium text-[var(--color-text-heading)] flex items-center gap-2">
          {title}
          <span className="text-xs text-[var(--color-text-muted)] px-2 py-0.5 rounded bg-[var(--color-bg-panel)]">
            {tokens.length}
          </span>
        </h3>
        <svg
          className={`w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={`${title}-content`}
        className={`accordion-content ${isOpen ? 'expanded' : 'collapsed'}`}
        style={{ maxHeight: isOpen ? '500px' : '0' }}
        role="region"
        aria-label={`${title} tokens`}
      >
        <div className="px-3 pb-3 space-y-2">
{tokens.map((config) => (
              <ColorTokenControl
                key={String(config.key)}
                name={`${config.category}-${String(config.key)}`}
                label={config.label}
                value={getTokenValue(config)}
                onChange={(_value) => {}}
                opacity={getTokenOpacity(config)}
                intensity={getTokenIntensity(config)}
                tooltip={config.tooltip}
              />
            ))}
        </div>
      </div>
    </div>
  );
}