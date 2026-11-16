# Grizzly Barber 💈

Plataforma web moderna para la barbería **Grizzly barber**, que incluye sistema de reservas de turnos en tiempo real, catálogo interactivo de servicios, perfiles y disponibilidad de barberos, y panel de administración.

Desarrollada bajo la metodología **Spec-Driven Development (SDD)** con **OpenSpec**, impulsada con tareas gestionadas desde **Trello**, persistencia en **Firebase Cloud Firestore** y alojada en **Firebase Hosting**.

---

## 🚀 Tecnologías

- **Base de Datos:** Firebase Cloud Firestore (NoSQL en tiempo real)
- **Hosting:** Firebase Hosting (CDN Global)
- **Frontend:** React + Vite + TypeScript
- **Estilos & UI:** Tailwind CSS + Lucide Icons + Radix / Shadcn UI
- **Estado Global:** Zustand
- **Validación:** React Hook Form + Zod
- **Metodología:** Spec-Driven Development (SDD) con OpenSpec

---

## 📜 Reglas de Desarrollo

> [!IMPORTANT]
> **REGLA DE ORO:** Consulta [AGENTS.md](AGENTS.md) antes de comenzar cualquier desarrollo. Todo nuevo componente, módulo o vista **debe pasar obligatoriamente por una especificación previa de OpenSpec** originada en una tarjeta de Trello.

---

## ⚡ Atajos de OpenSpec (`/opsx-*`)

Puedes utilizar estos comandos en el chat del asistente para guiar el desarrollo de principio a fin:

| Atajo | Descripción |
| :--- | :--- |
| `/opsx-propose <nombre>` | Crea una propuesta completa (`proposal.md`, `specs/`, `design.md`, `tasks.md`) |
| `/opsx-apply <nombre>` | Implementa las tareas aprobadas en `tasks.md` |
| `/opsx-verify <nombre>` | Valida la implementación contra la especificación |
| `/opsx-archive <nombre>` | Consolida el cambio en las specs maestras y lo archiva |
| `/opsx-explore <tema>` | Analiza la base de código y resuelve dudas previas |
| `/opsx-sync` | Sincroniza las especificaciones sin archivar |
| `/opsx-new <nombre>` | Inicia un cambio guiado paso a paso |
| `/opsx-continue` | Crea el siguiente artefacto pendiente |
| `/opsx-update` | Actualiza artefactos de planificación |
| `/opsx-onboard` | Tutorial interactivo de OpenSpec |

---

## 🛠️ Comandos Frecuentes

```powershell
# Validar la coherencia de OpenSpec
npx.cmd @fission-ai/openspec validate

# Listar especificaciones maestras
npx.cmd @fission-ai/openspec list --specs

# Desplegar en Firebase Hosting
firebase deploy --only hosting

# Desplegar reglas de seguridad en Firestore
firebase deploy --only firestore:rules
```
