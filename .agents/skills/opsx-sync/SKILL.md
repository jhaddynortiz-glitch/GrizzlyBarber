---
name: opsx-sync
description: Sincronizar especificaciones delta de OpenSpec con las especificaciones principales sin archivar el cambio. Usar cuando el usuario escriba "/opsx-sync", "/opsx:sync" o pida sincronizar specs en Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Sincronizar Especificaciones (`/opsx-sync`)

Sincroniza y consolida las especificaciones maestras del sistema sin necesidad de cerrar o archivar el cambio activo.

## Procedimiento

1. Identificar el cambio activo o especificado por el usuario.
2. Ejecutar la sincronización de specs con OpenSpec CLI o consolidar manualmente en `openspec/specs/`.
3. Validar con:
   ```powershell
   npx.cmd @fission-ai/openspec validate
   ```
4. Confirmar que la fuente de verdad en `openspec/specs/` refleja el estado deseado.
