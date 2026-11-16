---
name: opsx-onboard
description: Onboarding guiado e interactivo para aprender el flujo completo de OpenSpec en Grizzly barber. Usar cuando el usuario escriba "/opsx-onboard", "/opsx:onboard".
allowed-tools: Bash(openspec:*),run_command,view_file
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Onboarding Guiado (`/opsx-onboard`)

Tutorial práctico e interactivo que guía a un desarrollador o agente por el ciclo completo de Spec-Driven Development en Grizzly barber.

## Procedimiento
1. Presentar la filosofía de SDD: "Especificar antes de codificar".
2. Mostrar un ejemplo rápido de cambio pequeño (ej. ajuste de horario en configuración).
3. Recorrer los pasos:
   - `/opsx-propose`: crear propuesta y tareas.
   - `/opsx-apply`: implementar tareas.
   - `/opsx-verify`: validar cumplimiento.
   - `/opsx-archive`: consolidar en especificación maestra.
