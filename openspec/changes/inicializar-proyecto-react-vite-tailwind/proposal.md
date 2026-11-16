# Proposal: Inicializar Proyecto con React, Vite y Tailwind CSS

Tarjeta de Trello: `[feat] inicializar-proyecto-react-vite-tailwind` en la columna **Tareas pendientes**.

## Why

Para comenzar a construir la experiencia de usuario de **Grizzly barber** (catálogo de servicios, perfiles de barberos, agenda y reservas), es necesario disponer del entorno base del frontend web. 
Configurar un entorno moderno con React 18+, Vite, TypeScript y Tailwind CSS asegura máxima velocidad de compilación, cero cold-starts, tipado estricto y total compatibilidad con el despliegue estático optimizado de Firebase Hosting.

## What Changes

- Creación del archivo `package.json` con dependencias base: React 18+, ReactDOM, Lucide React, Tailwind CSS, PostCSS y Autoprefixer.
- Configuración de Vite (`vite.config.ts`) con soporte para React y alias de rutas `@/*` hacia `./src/*`.
- Configuración de TypeScript (`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`) con verificación estricta de tipos y resolución de alias `@/*`.
- Configuración de Tailwind CSS (`tailwind.config.js` y `postcss.config.js`) con la paleta de colores oficial de Grizzly Barber (`grizzly-black`, `grizzly-card`, `grizzly-border`, `grizzly-amber`, `grizzly-bone`, `grizzly-muted`).
- Creación de la estructura base de carpetas en `src/`:
  - `src/components/ui/`
  - `src/components/layout/`
  - `src/types/`
  - `src/config/`
  - `src/services/`
- Creación del punto de entrada `index.html`, `src/main.tsx`, `src/App.tsx` y `src/index.css`.
- Vista inicial de bienvenida de Grizzly Barber que valida visualmente el branding y el correcto funcionamiento de React, Tailwind y Lucide Icons.

## Capabilities

### New Capabilities
- `frontend-foundation`: Define los requisitos del cliente web, la compilación de la SPA con Vite, el sistema de diseño visual con Tailwind CSS y la estructura modular de la aplicación.

### Modified Capabilities
*(Ninguna especificación previa modificada; `platform-architecture` se mantiene intacta)*

## Impact

- **Código:** Se genera la raíz del código fuente en `src/` y los archivos de configuración en la raíz del proyecto.
- **Herramientas:** Añade scripts de desarrollo `npm run dev`, compilación `npm run build` y previsualización `npm run preview`.
- **Compatibilidad con Firebase:** El comando `npm run build` emitirá los artefactos a `dist/`, carpeta configurada en `firebase.json` para Firebase Hosting.
