---
name: opsx-continue
description: Continuar trabajando en un cambio de OpenSpec creando el siguiente artefacto pendiente. Usar cuando el usuario escriba "/opsx-continue", "/opsx:continue" para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Continuar Artefactos (`/opsx-continue`)

Genera el siguiente artefacto pendiente en la secuencia de dependencias del cambio activo (proposal -> specs -> design -> tasks).

## Procedimiento
1. Verificar estado actual del cambio:
   ```powershell
   npx.cmd @fission-ai/openspec status --change "<nombre-cambio>" --json
   ```
2. Identificar el siguiente artefacto en estado `ready`.
3. Obtener sus instrucciones y plantilla:
   ```powershell
   npx.cmd @fission-ai/openspec instructions <artifact-id> --change "<nombre-cambio>" --json
   ```
4. Crear el artefacto aplicando el contexto y reglas del proyecto Grizzly barber.
