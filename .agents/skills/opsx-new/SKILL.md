---
name: opsx-new
description: Iniciar un nuevo cambio en OpenSpec paso a paso utilizando el flujo guiado. Usar cuando el usuario escriba "/opsx-new", "/opsx:new" para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Nuevo Cambio Paso a Paso (`/opsx-new`)

Inicializa la estructura para un nuevo cambio en OpenSpec de forma guiada y progresiva.

## Procedimiento
1. Ejecutar:
   ```powershell
   npx.cmd @fission-ai/openspec new change "<nombre-cambio>"
   ```
2. Obtener estado de los artefactos:
   ```powershell
   npx.cmd @fission-ai/openspec status --change "<nombre-cambio>"
   ```
3. Comenzar con la redacción del primer artefacto (`proposal.md`).
4. Para continuar con el siguiente artefacto, usar `/opsx-continue <nombre-cambio>`.
