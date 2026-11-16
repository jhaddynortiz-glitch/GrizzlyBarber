# Tasks: Inicializar Proyecto con React, Vite y Tailwind CSS

## 1. Configuración de Entorno y Dependencias

- [x] 1.1 Crear `package.json` con scripts (`dev`, `build`, `preview`) y dependencias requeridas (`react`, `react-dom`, `lucide-react`, `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`, `tailwindcss`, `postcss`, `autoprefixer`).
- [x] 1.2 Ejecutar `npm.cmd install` y verificar que se instalen las dependencias sin vulnerabilidades críticas.

## 2. Configuración de Compilación y Estilos

- [x] 2.1 Crear `vite.config.ts` con el plugin `@vitejs/plugin-react` y el alias de ruta `@/` apuntando a `./src/`.
- [x] 2.2 Crear `tsconfig.json`, `tsconfig.app.json` y `tsconfig.node.json` con tipado estricto y resolución de alias `@/*`.
- [x] 2.3 Crear `tailwind.config.js` y `postcss.config.js` configurando los paths de escaneo de contenido y la paleta de colores Grizzly Barber (`grizzly-black`, `grizzly-card`, `grizzly-border`, `grizzly-amber`, `grizzly-bone`, `grizzly-muted`).

## 3. Estructura de Código y Vista Inicial

- [x] 3.1 Crear `index.html` en la raíz con viewport optimizado para móviles, tipografía y contenedor `#root`.
- [x] 3.2 Crear `src/index.css` importando las directivas `@tailwind base; @tailwind components; @tailwind utilities;` y estableciendo fondo oscuro por defecto.
- [x] 3.3 Crear los directorios estructurales `src/components/ui`, `src/components/layout`, `src/types`, `src/config` y `src/services`.
- [x] 3.4 Crear `src/main.tsx` como punto de entrada de la aplicación React.
- [x] 3.5 Crear `src/App.tsx` con una interfaz de presentación de Grizzly Barber utilizando iconos de `lucide-react`, clases de Tailwind personalizadas y tarjetas de estado del sistema.

## 4. Verificación de Compilación

- [x] 4.1 Ejecutar `npm.cmd run build` y verificar que la compilación de TypeScript y Vite genere la carpeta `dist/` sin errores de tipos.
