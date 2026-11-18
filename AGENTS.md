# Reglas de Desarrollo y Arquitectura: Grizzly Barber

Este documento define las reglas de gobernanza, flujo de trabajo, arquitectura técnica y estándares de código obligatorios para todos los desarrolladores y agentes de Inteligencia Artificial que operen en el proyecto **Grizzly barber**.

---

## 1. Regla Primordial: Trabajo Estricto con OpenSpec (SDD)

> [!IMPORTANT]
> **REGLA #1 (MANDATORIA E INQUEBRANTABLE):**
> **Siempre se trabajará con OpenSpec bajo la metodología Spec-Driven Development (SDD).**
> **Está terminantemente prohibido agregar componentes, módulos, vistas, servicios o colecciones de base de datos directamente al código sin una especificación OpenSpec previa aprobada.**
> 
> *Excepción única permitida:* Modificaciones cosméticas mínimas (ej. corregir un typo en un texto, ajustar un margen de espaciado menor) o correcciones urgentes de bugs puntuales (hotfixes de 1 a 3 líneas) que no alteren la arquitectura ni introduzcan nuevas capacidades al sistema.

### Ciclo de Vida Obligatorio de un Cambio
1. **Identificar la tarea:** La tarea a desarrollar **debe originarse en el tablero de Trello** del proyecto.
2. **Proponer el cambio (`/opsx-propose`):** Generar los artefactos de planificación (`proposal.md`, `specs/`, `design.md`, `tasks.md`).
3. **Revisión y Aprobación:** El usuario/responsable debe revisar y autorizar los artefactos antes de escribir código.
4. **Implementar tareas (`/opsx-apply`):** Ejecutar estrictamente las tareas planificadas en `tasks.md`.
5. **Verificar (`/opsx-verify`):** Comprobar que la implementación cumple con todos los requisitos y cláusulas `SHALL/MUST` de la especificación.
6. **Archivar y Consolidar (`/opsx-archive`):** Fusionar la especificación delta en las especificaciones maestras (`openspec/specs/`) y archivar el cambio.
7. **Cierre en Trello:** Mover la tarjeta en Trello a la columna de tareas finalizadas.

---

## 2. Integración con Trello para la Gestión de Tareas

Las tareas a realizarse en este proyecto provienen de un tablero organizado en **Trello** para "Grizzly barber". Ninguna funcionalidad se desarrollará sin una tarjeta de Trello de referencia.

### Estructura de Columnas del Tablero Trello

El tablero oficial de Trello para "Grizzly barber" se organiza en las siguientes 5 listas:

```
[ 📋 Tareas pendientes ] ──> [ 🚀 En curso (In Progress) ] ──> [ 🧪 QA ] ──> [ ✅ hecho(Done) ]
           │
           └──> [ 🗑️ Descartado ]
```

1. **📋 Tareas pendientes:**
   - Contiene los requerimientos priorizados y listos para ser trabajados.
   - Aquí se toma una tarjeta y se ejecuta `/opsx-propose <nombre-tarea>` para generar la propuesta, especificación delta, diseño y desglose de tareas.
2. **🚀 En curso (In Progress):**
   - Tarjetas con propuesta y diseño aprobados cuya implementación de código está activamente en desarrollo mediante `/opsx-apply <nombre-tarea>`.
3. **🧪 QA:**
   - Tarjetas cuya implementación de código está finalizada y se encuentran en fase de prueba y verificación.
   - En esta columna se ejecuta `/opsx-verify <nombre-tarea>` para validar el cumplimiento de todos los requisitos frente a la especificación.
4. **✅ hecho(Done):**
   - Tareas verificadas con éxito en QA, consolidadas en las especificaciones maestras mediante `/opsx-archive` y desplegadas en producción.
5. **🗑️ Descartado:**
   - Ideas, experimentos o requerimientos que fueron desestimados o cancelados.

### Formato Requerido de Tarjetas en Trello
Cada tarjeta de Trello debe contar con:
- **Título en kebab-case sugerido:** Ej. `[feat] catalogo-servicios` o `[booking] selector-barbero-horario`.
- **Objetivo / User Story:** "Como cliente quiero ver los servicios y precios para elegir el que necesito".
- **Criterios de Aceptación:** Lista con viñetas de lo que debe cumplir.
- **Etiquetas (Labels):** `Frontend`, `Firestore`, `Auth`, `UI/UX`, `OpenSpec`.

---

## 2.1 Fuentes de Verdad

Antes de proponer o implementar cualquier cambio, el agente MUST leer, en este orden:

| Documento | Qué define |
| :--- | :--- |
| `docs/producto.md` | Alcance, roles, pantallas, flujos, reglas de negocio, modelo de datos y **registro de decisiones**. Si algo no está aquí, no se implementa. |
| `openspec/specs/<capacidad>/spec.md` | Requisitos `SHALL/MUST` vigentes por capacidad: `auth`, `catalogo`, `reservas`, `pagos`, `citas-cliente`, `perfil-cliente`, `agenda-barbero`, `perfil-barbero`, `fidelizacion`, `platform-architecture`. |
| `docs/componentes.md` | Inventario de componentes y tokens. Reutilizar antes de crear. |
| Figma (frame enlazado en la tarjeta) | Diseño visual de la pantalla. |

- Si hay contradicción entre documentos, **manda `docs/producto.md`**: se detiene el trabajo y se pregunta al responsable.
- Las preguntas abiertas de `docs/producto.md` §11 **no se resuelven por cuenta propia**: se pregunta.
- Toda decisión nueva del responsable se agrega al registro de decisiones de `docs/producto.md`.

## 2.2 Reglas para Trabajar con Figma

- Archivo: `https://www.figma.com/design/2zNbwG3mqxkur2bwkZwHyx/Grizzlybarber`. Solo valen las secciones aprobadas **CLIENTE**, **BARBERO** y **PERFIL**; el resto son sugerencias.
- Antes de implementar una pantalla, leer el frame enlazado en la tarjeta de Trello (conector de Figma).
- Usar **solo tokens** de `tailwind.config.js`; nunca colores en hexadecimal sueltos en los componentes.
- Los textos de ejemplo de Figma (nombres, precios, fechas) **no se copian**: los datos vienen de Firestore.
- Si el diseño contradice `docs/producto.md` (ver §9 de ese documento), manda el documento de producto.

## 2.3 Definition of Ready / Definition of Done

**Una tarjeta pasa a "🚀 En curso" solo si (Ready):**
- Referencia la capacidad (spec) que modifica.
- Tiene criterios de aceptación.
- Si incluye UI: tiene el link al frame de Figma aprobado.
- No depende de una pregunta abierta sin resolver.

**Una tarjeta pasa a "✅ hecho" solo si (Done):**
- `npm run build` (y `lint`/`test` cuando existan) pasan sin errores.
- `/opsx-verify` cumple todos los `SHALL/MUST`.
- La UI se comparó contra el frame de Figma.
- `/opsx-archive` fusionó la delta en `openspec/specs/`.
- Una tarjeta = un cambio OpenSpec = una rama/PR (`feat/<nombre-cambio>`).

---

## 3. Arquitectura y Stack Tecnológico de Grizzly Barber

### Tecnologías Principales

| Capa | Tecnología | Justificación y Reglas |
| :--- | :--- | :--- |
| **Autenticación** | **Firebase Auth** | Email/contraseña + Google. Roles como custom claim asignados por script (Admin SDK). |
| **Backend** | **Cloud Functions (plan Blaze)** | Órdenes y webhooks de pago, expiración de citas, sellos de fidelización y cálculos sensibles. |
| **Pagos** | **Libélula** (vía `PaymentProvider`) | Aún sin cuenta: se usa `MockPaymentProvider` fuera de producción. |
| **Base de Datos** | **Firebase Cloud Firestore** | NoSQL en tiempo real, latencia ultrabaja, escalabilidad automática y plan gratuito generoso. |
| **Alojamiento (Hosting)** | **Firebase Hosting** | CDN global ultrarrápido con SSL automático, soporte nativo para SPA (`rewrites` a `index.html`). |
| **Frontend Web** | **React 18+ / 19 + Vite + TypeScript** | Rendimiento máximo, tipado estricto, sin sobrecostes ni cold-starts de servidores intermedios. |
| **Estilos & UI** | **Tailwind CSS + Lucide Icons + Shadcn / Radix UI** | Diseño Mobile-First, moderno, con estética elegante y masculina (vintage barbershop contemporáneo). |
| **Estado Global** | **Zustand** | Manejo de estado de reserva y sesión simple, desacoplado y ligero (<2kb). |
| **Formularios & Validación**| **React Hook Form + Zod** | Validación robusta de tipos e inputs antes de escribir a Firestore. |
| **Fechas & Horarios** | **date-fns** / **Day.js** | Gestión precisa de calendarios, slots de turnos y zonas horarias. |

### Principios de Diseño Visual (Branding "Grizzly barber")
- **Paleta y tipografía:** se toman de las variables de Figma y viven como tokens en `tailwind.config.js` (ver `docs/componentes.md` §0).
- **Enfoque Mobile-First:** El 85%+ de las reservas se realizarán desde teléfonos móviles. La experiencia táctil debe ser fluida, botones accesibles con el pulgar y flujo de reserva en 4 pasos.

---

## 4. Modelo de Datos en Firestore

El modelo de datos vigente está en **`docs/producto.md` §8** y en los requisitos de cada spec. No se duplica aquí para evitar desincronización.

Reglas que siempre aplican:
- Los tipos TypeScript en `src/types/` MUST reflejar `docs/producto.md` §8; si se cambia el modelo, se actualizan ambos en el mismo cambio OpenSpec.
- Los montos, sellos de fidelización, ratings y estados de pago se calculan **en el servidor**; el cliente nunca los escribe.
- `role`, `memberCode` y `loyalty` de `users` no son escribibles desde el cliente.
- Las citas guardan una copia del precio y la duración al reservar.

---

## 5. Organización del Código en el Repositorio

```text
barb/
├── .agents/
│   └── skills/                  # Atajos y habilidades de OpenSpec (/opsx-*)
├── docs/
│   ├── producto.md              # Fuente de verdad funcional
│   └── componentes.md           # Inventario de componentes y tokens
├── functions/                   # Cloud Functions (pagos, fidelización, expiración)
├── openspec/
│   ├── changes/                 # Cambios activos y archivados
│   │   └── archive/
│   ├── specs/                   # Fuente de verdad: especificaciones consolidadas
│   └── config.yaml              # Configuración de OpenSpec
├── public/                      # Recursos estáticos servidos por Firebase Hosting
├── src/
│   ├── assets/                  # Logos, imágenes e iconos estáticos
│   ├── components/              # Componentes React reutilizables (UI, layout)
│   │   ├── ui/                  # Componentes base (Botones, Modales, Inputs)
│   │   ├── booking/             # Componentes del flujo de reservas
│   │   └── layout/              # Navbar, Footer, Sidebar
│   ├── config/                  # Inicialización de Firebase (firebase.ts)
│   ├── context/ o store/        # Stores de Zustand (reserva, autenticación)
│   ├── hooks/                   # Custom hooks de React (useAppointments, useBarbers)
│   ├── services/                # Capa de acceso a Firestore (servicios desacoplados)
│   │   ├── appointmentService.ts
│   │   ├── barberService.ts
│   │   └── catalogService.ts
│   ├── types/                   # Definiciones de TypeScript
│   ├── utils/                   # Helpers de fechas, moneda y formato
│   ├── App.tsx                  # Enrutador y layout principal
│   └── main.tsx                 # Entrada de la aplicación React
├── firebase.json                # Configuración de Hosting y Firestore
├── firestore.rules              # Reglas de seguridad de Firestore
├── firestore.indexes.json       # Índices compuestos de Firestore
├── AGENTS.md                    # ESTE ARCHIVO (Reglas y Arquitectura)
├── package.json
└── README.md
```

---

## 6. Referencia de Atajos de OpenSpec (`/opsx-*`)

Puedes invocar cualquiera de estos comandos directamente en el chat para controlar el ciclo de desarrollo:

| Comando | Función Principal | Cuándo Utilizarlo |
| :--- | :--- | :--- |
| **`/opsx-propose <nombre>`** | Crea un nuevo cambio con todos sus artefactos (`proposal`, `specs`, `design`, `tasks`). | Al iniciar una tarea traída de **Trello**. |
| **`/opsx-apply <nombre>`** | Implementa las tareas aprobadas en `tasks.md`. | Una vez aprobada la especificación y diseño. |
| **`/opsx-verify <nombre>`** | Verifica la implementación contra los requisitos de la especificación. | Al finalizar el desarrollo antes de archivar. |
| **`/opsx-archive <nombre>`** | Fusiona la delta spec en `openspec/specs/` y archiva el cambio. | Cuando el cambio está verificado y listo para producción. |
| **`/opsx-explore <idea>`** | Analiza la base de código y clarifica requerimientos. | Antes de proponer un cambio con dudas técnicas. |
| **`/opsx-sync`** | Sincroniza especificaciones delta con las principales. | Para mantener actualizadas las specs sin archivar. |
| **`/opsx-new <nombre>`** | Crea un cambio paso a paso de forma interactiva. | Para flujos detallados guiados. |
| **`/opsx-continue`** | Genera el siguiente artefacto en el flujo paso a paso. | Al avanzar entre artefactos en modo `new`. |
| **`/opsx-update`** | Actualiza artefactos de planificación sin tocar código. | Cuando cambian decisiones de diseño antes de aplicar. |
| **`/opsx-onboard`** | Tutorial interactivo de OpenSpec. | Para desarrolladores nuevos en el proyecto. |

---

## 7. Comandos de Terminal Útiles

```powershell
# Validar la coherencia de especificaciones OpenSpec
npx.cmd @fission-ai/openspec validate

# Listar cambios activos
npx.cmd @fission-ai/openspec list

# Listar especificaciones maestras
npx.cmd @fission-ai/openspec list --specs

# Comprobar estado de un cambio específico
npx.cmd @fission-ai/openspec status --change "<nombre-cambio>"

# Desplegar en Firebase Hosting
firebase deploy --only hosting

# Desplegar reglas de Firestore
firebase deploy --only firestore:rules
```
