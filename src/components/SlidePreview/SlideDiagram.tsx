import { defaultTokens } from '../../data/palettes';
import { applyOpacity } from '../../utils/colorUtils';

interface SlideDiagramProps {
  tokens: typeof defaultTokens;
  showDecorations: boolean;
}

export function SlideDiagram({ tokens, showDecorations }: SlideDiagramProps) {
  const { accent, graphics, typography } = tokens;

  const interceptPath = "M200,200 C350,150 500,150 650,400";
  const wavePaths = [
    "M280,200 C330,180 380,200 430,180",
    "M280,205 C330,185 380,205 430,185",
    "M280,195 C330,175 380,195 430,175",
  ];

  return (
    <div className="relative h-80 md:h-96 animate-in" style={{ animationDelay: '300ms' }}>
      <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={accent.primary} />
          </marker>
          <marker id="arrowhead-accent" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={accent.highlight} />
          </marker>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-accent" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="uav-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent.primary} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent.secondary} stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="target-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent.warning} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accent.highlight} stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {showDecorations && (
          <>
            <rect x="50" y="50" width="900" height="500" fill="none" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="20,20" opacity="0.3" />
            <circle cx="500" cy="300" r="280" fill="none" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="10,10" opacity="0.2" />
            <circle cx="500" cy="300" r="180" fill="none" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="10,10" opacity="0.15" />
            <circle cx="500" cy="300" r="80" fill="none" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="10,10" opacity="0.1" />
            
            <line x1="50" y1="300" x2="950" y2="300" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="5,10" opacity="0.2" />
            <line x1="500" y1="50" x2="500" y2="550" stroke={graphics.grid} strokeWidth="0.5" strokeDasharray="5,10" opacity="0.2" />
            
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <line
                key={angle}
                x1={500 + Math.cos(angle * Math.PI / 180) * 50}
                y1={300 + Math.sin(angle * Math.PI / 180) * 50}
                x2={500 + Math.cos(angle * Math.PI / 180) * 450}
                y2={300 + Math.sin(angle * Math.PI / 180) * 450}
                stroke={graphics.grid}
                strokeWidth="0.3"
                strokeDasharray="3,6"
                opacity="0.1"
              />
            ))}
          </>
        )}

        <path
          d={interceptPath}
          fill="none"
          stroke={accent.primary}
          strokeWidth={2}
          strokeDasharray="8,4"
          markerEnd="url(#arrowhead)"
          opacity="0.6"
          filter="url(#glow)"
        />

        {wavePaths.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke={graphics.signal}
            strokeWidth={1.5}
            strokeDasharray="4,3"
            opacity={0.4 - i * 0.1}
            filter="url(#glow)"
          />
        ))}

        <ellipse cx="200" cy="200" rx="100" ry="40" fill="url(#uav-gradient)" stroke={accent.primary} strokeWidth="2" filter="url(#glow)" />
        <ellipse cx="200" cy="200" rx="80" ry="25" fill={applyOpacity(accent.primary, 0.3)} stroke="none" />
        <path d="M120,200 L100,180 L100,220 Z" fill="url(#uav-gradient)" stroke={accent.primary} strokeWidth="1.5" />
        <path d="M280,200 L300,180 L300,220 Z" fill="url(#uav-gradient)" stroke={accent.primary} strokeWidth="1.5" />
        <circle cx="180" cy="195" r="8" fill={accent.primary} filter="url(#glow)" />
        <circle cx="220" cy="195" r="8" fill={accent.primary} filter="url(#glow)" />

        <ellipse cx="800" cy="400" rx="90" ry="35" fill="url(#target-gradient)" stroke={accent.warning} strokeWidth="2" filter="url(#glow-accent)" />
        <ellipse cx="800" cy="400" rx="70" ry="22" fill={applyOpacity(accent.warning, 0.3)} stroke="none" />
        <circle cx="770" cy="390" r="12" fill={accent.warning} filter="url(#glow-accent)" />
        <circle cx="830" cy="390" r="12" fill={accent.warning} filter="url(#glow-accent)" />
        <path d="M750,420 L740,440 L760,440 Z" fill="url(#target-gradient)" stroke={accent.warning} strokeWidth="1" />
        <path d="M850,420 L840,440 L860,440 Z" fill="url(#target-gradient)" stroke={accent.warning} strokeWidth="1" />

        <circle cx="200" cy="200" r="120" fill="none" stroke={accent.primary} strokeWidth="1" strokeDasharray="6,6" opacity="0.3" />
        <circle cx="200" cy="200" r="180" fill="none" stroke={accent.primary} strokeWidth="1" strokeDasharray="4,8" opacity="0.2" />
        <circle cx="200" cy="200" r="240" fill="none" stroke={accent.primary} strokeWidth="0.5" strokeDasharray="2,6" opacity="0.15" />

        <circle cx="800" cy="400" r="100" fill="none" stroke={accent.warning} strokeWidth="1" strokeDasharray="6,6" opacity="0.3" />
        <circle cx="800" cy="400" r="160" fill="none" stroke={accent.warning} strokeWidth="1" strokeDasharray="4,8" opacity="0.2" />

        <line x1="200" y1="200" x2="200" y2="500" stroke={graphics.line} strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />
        <line x1="800" y1="400" x2="800" y2="100" stroke={graphics.line} strokeWidth="1" strokeDasharray="4,4" opacity="0.4" />

        <text x="200" y="140" textAnchor="middle" fill={typography.muted} fontSize="10" fontFamily={tokens.fonts.monoFamily} letterSpacing="0.1em">INTERCEPTOR UAV-7X</text>
        <text x="800" y="480" textAnchor="middle" fill={typography.muted} fontSize="10" fontFamily={tokens.fonts.monoFamily} letterSpacing="0.1em">OBJETIVO DRONE CLASSE-III</text>

        <g fontFamily={tokens.fonts.monoFamily} fontSize="9" fill={typography.muted}>
          <text x="200" y="340" textAnchor="middle">RNG: 0km</text>
          <text x="200" y="355" textAnchor="middle">ALT: 0m</text>
          <text x="200" y="370" textAnchor="middle">SPD: 0 M</text>
        </g>
        <g fontFamily={tokens.fonts.monoFamily} fontSize="9" fill={typography.muted}>
          <text x="800" y="320" textAnchor="middle">RNG: 180km</text>
          <text x="800" y="335" textAnchor="middle">ALT: 25,000m</text>
          <text x="800" y="350" textAnchor="middle">SPD: 0.8 M</text>
        </g>

        <circle cx="500" cy="300" r="8" fill={accent.success} filter="url(#glow)" />
        <text x="500" y="280" textAnchor="middle" fill={typography.muted} fontSize="9" fontFamily={tokens.fonts.monoFamily}>PTO. INTERCEPCIÓN</text>
      </svg>
    </div>
  );
}