export interface GradientTokens {
  start: string;
  end: string;
  opacity: number;
  angle: number;
  type: 'linear' | 'radial';
  radialPosition?: { x: number; y: number };
  enabled: boolean;
}

export interface BackgroundTokens {
  primary: string;
  secondary: string;
  surface: string;
  panel: string;
  gradientStart: string;
  gradientEnd: string;
  gradientOpacity: number;
  gradientAngle: number;
  gradientType: 'linear' | 'radial';
  gradientRadialPosition: { x: number; y: number };
  gradientEnabled: boolean;
  grid: string;
}

export interface TypographyTokens {
  title: string;
  heading: string;
  subtitle: string;
  body: string;
  muted: string;
  disabled: string;
  onDark: string;
}

export interface AccentTokens {
  primary: string;
  secondary: string;
  highlight: string;
  warning: string;
  success: string;
  info: string;
  button: string;
  buttonText: string;
}

export interface GraphicsTokens {
  line: string;
  grid: string;
  border: string;
  icon: string;
  signal: string;
  chart: string;
  dataPoint: string;
  progress: string;
}

export interface FontTokens {
  titleFamily: string;
  bodyFamily: string;
  monoFamily: string;
  titleWeight: number;
  titleSize: string;
  lineHeight: number;
  letterSpacing: string;
  badgeTransform: 'uppercase' | 'none';
}

export interface ThemeTokens {
  background: BackgroundTokens;
  typography: TypographyTokens;
  accent: AccentTokens;
  graphics: GraphicsTokens;
  fonts: FontTokens;
}

export interface ThemePalette {
  name: string;
  version: string;
  tokens: ThemeTokens;
  createdAt: string;
  updatedAt: string;
}

export interface ColorTokenControlProps {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  locked?: boolean;
  onLockToggle?: () => void;
  opacity?: number;
  onOpacityChange?: (opacity: number) => void;
  intensity?: number;
  onIntensityChange?: (intensity: number) => void;
  error?: boolean;
  tooltip?: string;
}

export interface TokenGroupProps {
  title: string;
  tokens: ColorTokenConfig[];
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface ColorTokenConfig {
  key: keyof BackgroundTokens | keyof TypographyTokens | keyof AccentTokens | keyof GraphicsTokens;
  label: string;
  category: 'background' | 'typography' | 'accent' | 'graphics';
  hasOpacity?: boolean;
  hasIntensity?: boolean;
  tooltip?: string;
}

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

export interface ColorAnalysis {
  contrasts: Record<string, ContrastResult>;
  warnings: string[];
  similarColors: string[];
  lowContrastTexts: string[];
}

export interface ColorBlindnessFilters {
  protanopia: string;
  deuteranopia: string;
  tritanopia: string;
  grayscale: string;
}

export type ThemeMode = 'light' | 'dark';

export interface AppState {
  currentPalette: ThemePalette;
  savedPalettes: ThemePalette[];
  presetPalettes: ThemePalette[];
  themeMode: ThemeMode;
  sidebarCollapsed: boolean;
  history: ThemeTokens[];
  historyIndex: number;
  showGrid: boolean;
  showDecorations: boolean;
  fullscreen: boolean;
  zoom: number;
}