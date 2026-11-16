---
name: opsx-propose
description: Proponer un nuevo cambio en OpenSpec con todos los artefactos generados en un solo paso (proposal, specs, design, tasks). Usar cuando el usuario escriba "/opsx-propose", "/opsx:propose" o indique una tarea obtenida de Trello para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file,replace_file_content
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Proponer Cambio (`/opsx-propose`)

Crea un nuevo cambio en OpenSpec generando todos los artefactos de planificación en un solo paso.

> **Límite de Planificación:** Este flujo es exclusivamente de planificación. NO se debe modificar el código fuente de la aplicación durante este paso. Al terminar los artefactos, se debe solicitar confirmación al usuario antes de implementar con `/opsx-apply`.

## Entrada
El usuario proporciona el nombre del cambio (en formato `kebab-case`) o el título/descripción de la tarea extraída de **Trello**.
- Ejemplo: `/opsx-propose auth-login-cliente` o `/opsx-propose "Crear catálogo de servicios"`

## Procedimiento

1. **Obtener contexto de la tarea (Trello / Solicitud)**
   - Si proviene de una tarjeta de Trello, identificar:
     - Objetivo
     - Criterios de Aceptación
     - Alcance funcional (Frontend, Firestore, UI)
   - Definir un nombre en kebab-case si no se proporcionó (ej. `catalogo-servicios`).

2. **Crear el cambio con el CLI de OpenSpec**
   ```powershell
   npx.cmd @fission-ai/openspec new change "<nombre-cambio>"
   ```

3. **Verificar estado de artefactos**
   ```powershell
   npx.cmd @fission-ai/openspec status --change "<nombre-cambio>" --json
   ```

4. **Redactar cada artefacto requerido:**
   - Consultar instrucciones de cada artefacto:
     ```powershell
     npx.cmd @fission-ai/openspec instructions <artifact-id> --change "<nombre-cambio>" --json
     ```
   - Redactar en orden de dependencias:
     1. `proposal.md`: Qué se va a hacer, por qué, y qué queda fuera de alcance. Enlazar a la tarjeta de Trello.
     2. `specs/<capacidad>/spec.md`: Delta de especificación (requisitos funcionales usando SHALL / MUST).
     3. `design.md`: Enfoque técnico (componentes React, colecciones Firestore, estado Zustand, interfaz Tailwind).
     4. `tasks.md`: Lista granular de tareas de implementación con checkboxes `- [ ]`.

5. **Mostrar resumen al usuario:**
   - Indicar que los artefactos están listos para revisión.
   - Indicar que el siguiente paso para implementar es `/opsx-apply <nombre-cambio>`.
