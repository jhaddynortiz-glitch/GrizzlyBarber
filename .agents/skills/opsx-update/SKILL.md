---
name: opsx-update
description: Actualizar y reconciliar artefactos de planificación de un cambio de OpenSpec sin tocar código. Usar cuando el usuario escriba "/opsx-update", "/opsx:update" para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,write_to_file,replace_file_content
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Actualizar Planificación (`/opsx-update`)

Revisa y actualiza artefactos existentes de un cambio (`proposal.md`, `specs/`, `design.md`, `tasks.md`) para incorporar nuevas decisiones de diseño o ajustar el alcance antes o durante el desarrollo.

> **Regla:** Este atajo actualiza únicamente documentación y artefactos de planificación; nunca edita código de la aplicación.
