# Spec Delta

## Purpose
Establecer la infraestructura base del cliente web para Grizzly Barber, proveyendo compilación con Vite, interfaz reactiva con React 18+, tipado estricto con TypeScript y sistema de diseño visual con Tailwind CSS.

## ADDED Requirements

### Requirement: Frontend Web Application Scaffold
The project SHALL provide a working React 18+ application scaffold built with Vite and TypeScript.

#### Scenario: Compilación del proyecto
- **WHEN** un desarrollador ejecuta `npm run build`
- **THEN** Vite MUST compilar la aplicación sin errores de tipos de TypeScript y generar los archivos estáticos en la carpeta `dist/`.

#### Scenario: Entorno de desarrollo local
- **WHEN** se ejecuta `npm run dev`
- **THEN** el servidor de desarrollo de Vite MUST iniciar y servir la aplicación web en modo HMR (Hot Module Replacement).

### Requirement: Design System and Visual Tokens
The application SHALL apply the visual styling and theme of Grizzly Barber using Tailwind CSS.

#### Scenario: Tokens de color de Grizzly Barber
- **WHEN** se aplican clases utilitarias de Tailwind en cualquier componente
- **THEN** la configuración MUST proveer la paleta temática: `grizzly-black` (#0a0e17), `grizzly-card` (#141b26), `grizzly-border` (#263345), `grizzly-amber` (#d97706), `grizzly-bone` (#f8fafc) y `grizzly-muted` (#94a3b8).

#### Scenario: Soporte de Iconos
- **WHEN** se renderizan elementos visuales de barbería, calendario, reloj o usuario
- **THEN** la aplicación MUST utilizar componentes de iconos provistos por la librería `lucide-react`.

### Requirement: Modular Directory Structure and Path Aliases
The codebase SHALL organize frontend code in standardized directories and provide path alias resolution.

#### Scenario: Resolución de alias `@/*`
- **WHEN** un archivo en `src/` importa módulos usando el prefijo `@/`
- **THEN** Vite y TypeScript MUST resolver la ruta relativa correspondiente hacia `./src/*`.
