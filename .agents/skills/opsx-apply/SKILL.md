---
name: opsx-apply
description: Implementar las tareas planificadas de un cambio OpenSpec (tasks.md). Usar cuando el usuario escriba "/opsx-apply", "/opsx:apply" o solicite iniciar la implementación de tareas aprobadas para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file,replace_file_content
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Implementar Tareas (`/opsx-apply`)

Implementa de forma estricta y secuencial las tareas definidas en `tasks.md` de un cambio activo en OpenSpec.

> **Regla de Ejecución:** Mantener los cambios enfocados estrictamente en las tareas aprobadas en `tasks.md`. No agregar dependencias o componentes adicionales no estipulados en `design.md` y `specs/`.

## Entrada
Opcionalmente el nombre del cambio (ej. `/opsx-apply catalogo-servicios`). Si no se especifica, se detecta el cambio activo o se listan los cambios pendientes.

## Procedimiento

1. **Obtener instrucciones y tareas pendientes**
   ```powershell
   npx.cmd @fission-ai/openspec instructions apply --change "<nombre-cambio>" --json
   ```

2. **Leer contexto y archivos de especificación**
   - Leer `proposal.md`, `specs/`, `design.md`, y `tasks.md` del cambio.
   - Revisar el diseño y criterios de aceptación acordados.

3. **Ciclo de implementación de tareas:**
   Para cada tarea pendiente en `tasks.md`:
   - Anunciar la tarea que se está ejecutando.
   - Realizar la edición/creación de código correspondiente (componentes React, servicios de Firestore, estilos Tailwind, hooks, etc.).
   - Marcar la tarea como completada en `tasks.md` cambiando `- [ ]` a `- [x]`.
   - Continuar con la siguiente tarea.

4. **Verificación post-implementación:**
   - Asegurarse de que el código compila y no hay errores de sintaxis ni de tipos en TypeScript.
   - Informar al usuario que todas las tareas fueron implementadas.
   - Sugerir ejecutar la verificación con `/opsx-verify <nombre-cambio>` o archivar con `/opsx-archive <nombre-cambio>`.
