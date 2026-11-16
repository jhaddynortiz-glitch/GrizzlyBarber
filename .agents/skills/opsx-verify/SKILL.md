---
name: opsx-verify
description: Verificar y validar que la implementación coincida estrictamente con las especificaciones y tareas de OpenSpec para Grizzly barber. Usar cuando el usuario escriba "/opsx-verify", "/opsx:verify" o solicite validar un cambio antes de archivar.
allowed-tools: Bash(openspec:*),run_command,view_file,find_by_name,grep_search
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Verificar Implementación (`/opsx-verify`)

Valida la completitud, exactitud y coherencia de la implementación frente a los artefactos del cambio en OpenSpec.

## Procedimiento

1. **Revisar estado de tareas**
   - Comprobar que todas las tareas en `tasks.md` están marcadas como completadas.

2. **Validar requisitos de la especificación (Delta Spec)**
   - Verificar cada cláusula `SHALL` / `MUST` definida en `specs/<capacidad>/spec.md`.
   - Comprobar que los componentes implementados y los accesos a Firestore cumplen con las restricciones de seguridad y diseño.

3. **Pruebas y Build**
   - Ejecutar comprobaciones de tipos (`tsc --noEmit` o build de Vite) y tests si están disponibles.
   - Confirmar que no hay errores en consola ni regresiones en otros módulos.

4. **Emitir veredicto:**
   - Si todo es conforme: Sugerir archivar con `/opsx-archive <nombre-cambio>`.
   - Si se detectan inconsistencias: Listar los puntos a corregir antes de archivar.
