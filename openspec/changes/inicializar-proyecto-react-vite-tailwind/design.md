# Design: Inicialización de Frontend con React, Vite y Tailwind CSS

## Context

El repositorio cuenta con la infraestructura de gobernanza (OpenSpec, atajos `/opsx-*`, `AGENTS.md`) y la configuración de Firebase (`firebase.json`, `firestore.rules`). La configuración de Firebase Hosting define `public: "dist"`.
Este diseño aborda la creación limpia del andamiaje del frontend sin sobreescribir ni interferir con los archivos preexistentes de Firebase, OpenSpec ni Git.

## Goals / Non-Goals

**Goals:**
- Configurar `package.json` con scripts estándar (`dev`, `build`, `preview`).
- Instalar dependencias exactas: `react`, `react-dom`, `lucide-react`, `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss`, `postcss`, `autoprefixer`.
- Configurar alias de importación `@/*` en `vite.config.ts` y `tsconfig.json`.
- Definir el tema visual en `tailwind.config.js` con la paleta de colores de Grizzly Barber.
- Estructurar el código fuente en `src/` y crear un componente visual inicial de bienvenida y verificación.

**Non-Goals:**
- Conexión e integración con Firebase Firestore (corresponde a la siguiente tarea: `[feat] conexion-firebase-firestore`).
- Desarrollo del flujo de reserva interactivo o autenticación de usuarios (tareas posteriores en el backlog).

## Decisions

### 1. Framework y Herramienta de Compilación: React 18 + Vite
- **Decisión:** Usar React 18 con Vite en lugar de frameworks con SSR pesado como Next.js.
- **Razón:** Firebase Hosting es nativamente un CDN de archivos estáticos. Vite compila directamente a `dist/` con rendimiento óptimo para smartphones y cero tiempos de calentamiento de servidor.
- **Alternativa descartada:** Create React App (obsoleto) o Next.js (innecesario para este modelo de SPA en Firebase Hosting).

### 2. Estilos: Tailwind CSS v3.4 con Tokens Temáticos
- **Decisión:** Configurar Tailwind CSS v3.4 mediante `tailwind.config.js` y `postcss.config.js`.
- **Tokens extendidos:**
  - `grizzly-black`: `#0a0e17`
  - `grizzly-card`: `#141b26`
  - `grizzly-border`: `#263345`
  - `grizzly-amber`: `#d97706`
  - `grizzly-amber-hover`: `#f59e0b`
  - `grizzly-bone`: `#f8fafc`
  - `grizzly-muted`: `#94a3b8`
- **Razón:** Permite aplicar el diseño oscuro y masculino de la barbería de forma consistente y facilita integrar componentes de Radix / Shadcn UI en futuras tareas.

### 3. Resolución de Rutas Absolutas (`@/*`)
- **Decisión:** Mapear `@/*` a `./src/*` tanto en `vite.config.ts` (usando `path.resolve`) como en `tsconfig.json` (`paths`).
- **Razón:** Garantiza importaciones limpias y refactorizaciones seguras a medida que crezca el árbol de componentes.

## Risks / Trade-offs

- **[Riesgo de sobreescritura accidental]** → Mitigación: No utilizar `npm create vite@latest .` con flags destructivos; en su lugar, crear manualmente `package.json`, `vite.config.ts`, `tsconfig.json` e instalar dependencias con `npm.cmd install` para preservar intactos los archivos `firebase.json`, `AGENTS.md`, etc.
- **[Compatibilidad de scripts en Windows]** → Mitigación: Invocar siempre `npm.cmd` y `npx.cmd` para evitar bloqueos de la política de ejecución de PowerShell (`.ps1`).
