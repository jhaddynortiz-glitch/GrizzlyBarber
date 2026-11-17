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

## 3. Arquitectura y Stack Tecnológico de Grizzly Barber

### Tecnologías Principales

| Capa | Tecnología | Justificación y Reglas |
| :--- | :--- | :--- |
| **Base de Datos** | **Firebase Cloud Firestore** | NoSQL en tiempo real, latencia ultrabaja, escalabilidad automática y plan gratuito generoso. |
| **Alojamiento (Hosting)** | **Firebase Hosting** | CDN global ultrarrápido con SSL automático, soporte nativo para SPA (`rewrites` a `index.html`). |
| **Frontend Web** | **React 18+ / 19 + Vite + TypeScript** | Rendimiento máximo, tipado estricto, sin sobrecostes ni cold-starts de servidores intermedios. |
| **Estilos & UI** | **Tailwind CSS + Lucide Icons + Shadcn / Radix UI** | Diseño Mobile-First, moderno, con estética elegante y masculina (vintage barbershop contemporáneo). |
| **Estado Global** | **Zustand** | Manejo de estado de reserva y sesión simple, desacoplado y ligero (<2kb). |
| **Formularios & Validación**| **React Hook Form + Zod** | Validación robusta de tipos e inputs antes de escribir a Firestore. |
| **Fechas & Horarios** | **date-fns** / **Day.js** | Gestión precisa de calendarios, slots de turnos y zonas horarias. |

### Principios de Diseño Visual (Branding "Grizzly barber")
- **Paleta de Colores:** Fondo oscuro profundo (carbón/pizarra `#0f172a` o `#18181b`), detalles en ámbar cálido / oro vintage (`#d97706` o `#b45309`), superficies en gris grafito y textos en blanco hueso.
- **Enfoque Mobile-First:** El 85%+ de las reservas se realizarán desde teléfonos móviles. La experiencia táctil debe ser fluida, botones accesibles con el pulgar y flujo de reserva en máximo 3 pasos.

---

## 4. Estructura de Datos en Firestore (`Collections`)

Toda consulta o escritura a Firestore debe respetar el siguiente modelo de datos y sus tipos TypeScript asociados:

### Colección: `users`
Guarda el perfil del usuario autenticado vía Firebase Auth.
```typescript
interface UserProfile {
  id: string;              // UID de Firebase Auth
  email: string;
  displayName: string;
  phone: string;
  role: 'client' | 'barber' | 'admin';
  avatarUrl?: string;
  createdAt: number;       // Timestamp UNIX o Firestore FieldValue
}
```

### Colección: `services`
Catálogo de cortes, arreglo de barba y servicios complementarios.
```typescript
interface ServiceItem {
  id: string;
  name: string;            // Ej. "Corte Grizzly Tradicional"
  description: string;
  durationMinutes: number; // Ej. 30, 45, 60
  price: number;           // Moneda local
  category: 'hair' | 'beard' | 'combo' | 'spa';
  imageUrl?: string;
  active: boolean;
}
```

### Colección: `barbers`
Perfiles y horarios laborales de los barberos.
```typescript
interface BarberProfile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  specialties: string[];
  avatarUrl?: string;
  schedule: {
    dayOfWeek: number;     // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    startTime: string;     // Formato "09:00"
    endTime: string;       // Formato "20:00"
    breakStart?: string;   // Formato "13:00"
    breakEnd?: string;     // Formato "14:00"
  }[];
  active: boolean;
}
```

### Colección: `appointments` (Turnos / Citas)
Registro central de turnos. Debe validarse para impedir solapamientos para el mismo barbero y horario.
```typescript
interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: string;            // Formato ISO "YYYY-MM-DD"
  startTime: string;       // "10:30"
  endTime: string;         // "11:15"
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}
```

### Reglas de Seguridad en Firestore (`firestore.rules`)
- Los clientes solo pueden leer y cancelar sus propias citas (`clientId == request.auth.uid`).
- La lectura de `services` y `barbers` es pública para que cualquiera pueda ver el catálogo.
- Solo usuarios con rol `admin` o `barber` pueden modificar precios, servicios o estados de turnos ajenos.

---

## 5. Organización del Código en el Repositorio

```text
barb/
├── .agents/
│   └── skills/                  # Atajos y habilidades de OpenSpec (/opsx-*)
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
