---
name: opsx-archive
description: Archivar un cambio completado en OpenSpec y fusionar sus especificaciones delta en las especificaciones maestras (openspec/specs/). Usar cuando el usuario escriba "/opsx-archive", "/opsx:archive" o solicite finalizar un cambio de Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file,replace_file_content
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Archivar Cambio (`/opsx-archive`)

Finaliza un cambio completado, fusiona las especificaciones delta (`delta specs`) dentro de la especificación principal en `openspec/specs/` y archiva el cambio bajo `openspec/changes/archive/`.

## Entrada
Nombre del cambio a archivar (ej. `/opsx-archive catalogo-servicios`).

## Procedimiento

1. **Confirmar que todas las tareas están completadas**
   ```powershell
   npx.cmd @fission-ai/openspec status --change "<nombre-cambio>" --json
   ```
   Si existen tareas pendientes, alertar al usuario antes de proceder.

2. **Ejecutar el archivado con OpenSpec**
   ```powershell
   npx.cmd @fission-ai/openspec archive "<nombre-cambio>"
   ```

3. **Verificar la consolidación de especificaciones**
   - Comprobar que las especificaciones maestras en `openspec/specs/` fueron actualizadas.
   - Confirmar que el directorio del cambio se movió a `openspec/changes/archive/`.

4. **Actualización de Trello y cierre:**
   - Recordar al usuario mover la tarjeta correspondiente en **Trello** a la columna **Done / Listo**.
   - Mostrar un resumen de las capacidades añadidas al sistema Grizzly barber.
