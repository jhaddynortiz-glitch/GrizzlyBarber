---
name: opsx-explore
description: Explorar ideas, investigar la base de código, dependencias o requisitos antes de proponer un cambio en OpenSpec. Usar cuando el usuario escriba "/opsx-explore", "/opsx:explore" o quiera pensar/diseñar una funcionalidad para Grizzly barber.
allowed-tools: Bash(openspec:*),run_command,view_file,find_by_name,grep_search
license: MIT
metadata:
  author: Grizzly Barber Dev Team
  version: "1.0"
---

# Atajo OpenSpec: Exploración y Análisis (`/opsx-explore`)

Modo de pensamiento y exploración técnica antes de crear una propuesta formal en OpenSpec.

## Procedimiento

1. **Analizar la necesidad o tarjeta de Trello**
   - Examinar la idea planteada por el usuario.
   - Revisar las especificaciones maestras actuales en `openspec/specs/`.

2. **Inspección técnica (Solo Lectura)**
   - Examinar la estructura de componentes, esquemas de Firestore, hooks y rutas existentes.
   - Identificar posibles impactos, colisiones o dependencias requeridas.

3. **Presentar hallazgos y alternativas**
   - Explicar las opciones de diseño (ej. estructura de colección Firestore, enfoque de componentes UI, modelo de datos).
   - Definir si se requiere crear una nueva capacidad o extender una existente.
   - Proponer el comando `/opsx-propose <nombre-cambio>` cuando el usuario esté listo.
