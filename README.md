# R.A.R. Theme Builder

Herramienta web local para crear y probar paletas de color destinadas a presentaciones pitch de una empresa aeroespacial/deep-tech.

## Características

- **Editor visual de tokens**: Modifica colores por categorías (Fondo, Tipografía, Énfasis, Gráficos)
- **Previsualización en tiempo real**: Diapositiva 16:9 con elementos aeroespaciales (UAV, objetivo, ondas, retícula)
- **Sistema de tokens centralizado**: Variables CSS generadas automáticamente
- **Paletas predefinidas**: 4 temas iniciales (Primary Space, Deep Teal, Monochrome Blue, High Contrast Mission)
- **Gestión de paletas**: Guardar, duplicar, renombrar, eliminar, importar/exportar JSON
- **Análisis de accesibilidad**: Contraste WCAG AA/AAA, simulación de daltonismo, avisos de legibilidad
- **Degradados configurables**: Lineal/radial, posición, opacidad, ángulo
- **Tipografía personalizable**: Familias, pesos, tamaños, interlineado
- **Persistencia localStorage**: Paletas y preferencias guardadas localmente
- **Atajos de teclado**: Ctrl+S (guardar), Ctrl+Z (deshacer), Ctrl+Shift+Z (rehacer), Ctrl+E (exportar), F (pantalla completa), R (reset)
- **Modo oscuro/claro**: Para la interfaz de la herramienta
- **Panel lateral colapsable**: Para maximizar área de previsualización

## Instalación

```bash
cd paleta
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Construcción para producción

```bash
npm run build
```

Los archivos optimizados se generarán en `dist/`.

## Estructura del proyecto

```
paleta/
├── src/
│   ├── components/
│   │   ├── Header/           # Barra superior
│   │   ├── TokenSidebar/     # Panel lateral de tokens
│   │   ├── SlidePreview/     # Área de previsualización
│   │   ├── AnalysisPanel/    # Panel de análisis de contraste
│   │   └── Dialogs/          # Diálogos de exportar/importar
│   ├── hooks/
│   │   ├── useThemeBuilder.ts    # Estado principal
│   │   └── useKeyboardShortcuts.ts # Atajos de teclado
│   ├── utils/
│   │   └── colorUtils.ts     # Utilidades de color
│   ├── data/
│   │   └── palettes.ts       # Paletas predefinidas y tokens por defecto
│   ├── types/
│   │   └── theme.ts          # Tipos TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Sistema de Tokens

Los tokens se organizan en 4 categorías:

### Background
- `primary`, `secondary`, `surface`, `panel`
- `gradientStart`, `gradientEnd`, `gradientOpacity`, `gradientAngle`
- `gradientType` (linear/radial), `gradientRadialPosition`, `gradientEnabled`

### Typography
- `title`, `heading`, `subtitle`, `body`, `muted`, `disabled`, `onDark`

### Accent
- `primary`, `secondary`, `highlight`, `warning`, `success`, `info`
- `button`, `buttonText`

### Graphics
- `line`, `grid`, `border`, `icon`, `signal`, `chart`, `dataPoint`, `progress`

### Fonts
- `titleFamily`, `bodyFamily`, `monoFamily`
- `titleWeight`, `titleSize`, `lineHeight`, `letterSpacing`, `badgeTransform`

## Exportación

La herramienta exporta:
- **JSON completo**: Paleta con nombre, versión, tokens y metadatos
- **Variables CSS**: Archivo `.css` con custom properties
- **Tokens JSON**: Solo los tokens de diseño

## Atajos de teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + S` | Guardar paleta |
| `Ctrl/Cmd + Z` | Deshacer |
| `Ctrl/Cmd + Shift + Z` | Rehacer |
| `Ctrl/Cmd + E` | Abrir exportar |
| `F` | Pantalla completa |
| `R` | Restablecer paleta |

## Requisitos

- Node.js 18+
- Navegador moderno con soporte para CSS Custom Properties

## Licencia

MIT - Uso libre para proyectos aeroespaciales/deep-tech