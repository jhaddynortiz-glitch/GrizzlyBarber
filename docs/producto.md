# Producto: Grizzly Barber

> **Estado:** Borrador v1.3, con las decisiones del responsable del 2026-11-18 incorporadas (ver §10).
> **Fuente:** Figma `Grizzlybarber`, solo las secciones aprobadas **CLIENTE**, **BARBERO** y **PERFIL (barbero)**. El resto del archivo se considera sugerencia no aprobada.
> **Uso:** Este documento es la fuente de verdad funcional. Las specs de OpenSpec y las tarjetas de Trello se derivan de aquí. Lo que no está aquí no se implementa.

Leyenda: ✅ confirmado (diseño o decisión) · ❓ por confirmar · 🚫 fuera del alcance actual · ✏️ requiere ajuste en Figma

---

## 1. Visión

Plataforma web **mobile-first** (PWA) para la barbería Grizzly Barber en Santa Cruz de la Sierra, Bolivia. Permite:

- Al **cliente**: reservar un turno pagando un adelanto por QR, gestionar sus citas, valorar el servicio, acumular cortes para obtener un servicio gratis y guardar su ficha técnica de corte.
- Al **barbero**: ver su agenda del día, atender y cobrar el saldo, y gestionar su disponibilidad, sus servicios, sus precios y sus tiempos.

Contexto local: moneda **Bs**, teléfonos **+591**, pagos con la pasarela **Libélula** (QR interoperable).

---

## 2. Alcance actual

| Incluido ✅ | Excluido 🚫 |
| :-- | :-- |
| Auth (email + contraseña, Google) | Rol **Admin** y panel de administración |
| App del cliente: Inicio, Reservar, Mis Citas, Perfil | Pantallas del barbero **Mi Sillón** y **Caja** (se crearán tareas cuando se aprueben) |
| App del barbero: Agenda, Cobro, Perfil | Niveles de cliente (Black / Gold / VIP) |
| Pago del adelanto con Libélula | Recompensas intermedias ("Ritual Barba") |
| Fidelización básica: **5 cortes = 1 servicio gratis** | Multi-sucursal, Apple/Google Wallet, coctelería |

Sin admin, la **carga inicial** (servicios base, barberos, roles) se hace con **scripts de seed** o desde la consola de Firebase. Ver §7.

---

## 3. Roles

| Rol | Descripción | Navegación inferior |
| :-- | :-- | :-- |
| **Cliente** ✅ | Usuario registrado que reserva y gestiona sus citas. | Inicio · Reservar · Mis Citas · Perfil |
| **Barbero** ✅ | Profesional que atiende turnos, cobra y administra **sus propios** servicios, precios y horarios. | Agenda · Perfil ✏️ (quitar Mi Sillón y Caja mientras no estén aprobadas) |
| **Admin** 🚫 | No existe en este alcance. | — |

- Ambos roles usan el mismo login. Después de autenticarse se redirige según el rol.
- El rol **barbero no se autoasigna**: lo otorga el responsable con un script (ver §7).

---

## 4. Mapa de la plataforma

Enlace base: `https://www.figma.com/design/2zNbwG3mqxkur2bwkZwHyx/Grizzlybarber?node-id=<id>`

### 4.1 Acceso (compartido)

| Pantalla | Ruta propuesta | Figma | Contenido |
| :-- | :-- | :-- | :-- |
| Iniciar sesión | `/login` | `670-4123` ✏️ | **Email + contraseña** y botón **"Continuar con Google"**, "Recordarme", "¿Olvidaste tu clave?", link a registro, Términos y Privacidad. *El diseño usa celular + contraseña y debe ajustarse.* |
| Crear cuenta | `/registro` | `670-4257` ✏️ | Nombre completo*, **email***, celular* (+591, dato de contacto, no de login), contraseña* (mín. 8), aceptar términos*. Botón "Registrarse con Google". *En el diseño el email es opcional; pasa a ser obligatorio.* |
| Completar perfil | `/completar-perfil` | ❓ sin diseño ✏️ | Después del primer ingreso con Google: pedir celular y aceptación de términos. |
| Recuperar clave | `/recuperar` | ❓ sin diseño | Email de restablecimiento de Firebase Auth. |

### 4.2 Cliente

| Pantalla | Ruta propuesta | Figma | Contenido |
| :-- | :-- | :-- | :-- |
| Inicio | `/` | `426-14704` | Hero, "Tu próximo turno confirmado", carta de servicios, carrusel de barberos (rating, disponibilidad hoy, "Elegir"), "La experiencia Grizzly", **tarjeta de fidelización** ✏️ (ver §6.6), CTA "Agenda tu cita". |
| Reservar · Paso 1 Servicio | `/reservar/servicio` | `269-1059` | Servicios con foto, descripción y precio **desde** (el precio final depende del barbero). |
| Reservar · Paso 2 Barbero | `/reservar/barbero` | `269-7085` | Barberos que ofrecen el servicio, con rating, especialidades, disponibilidad y **su precio y duración** para ese servicio ✏️. |
| Reservar · Paso 3 Día y hora | `/reservar/horario` | `269-5816` | Días con cupos libres y grilla de horarios del barbero elegido. |
| Reservar · Paso 4 Pago | `/reservar/pago` | `269-8773` | Resumen, total, adelanto del 20%, QR de Libélula, temporizador de 05:00. Si se usa un **servicio gratis** no hay pago (§6.6). |
| Reservar · Verificando | — (estado) | `269-9288` | "Detectando transferencia…" mientras llega la confirmación de Libélula. |
| Reservar · Confirmado | `/reservar/confirmado` | `269-9447` | Pase con código `#GB-XXXXX`, barbero, fecha, hora y duración, dirección y sillón, desglose y saldo a pagar en el salón. |
| Mis Citas · Próximas | `/citas` | `269-10286` | Fecha, cuenta regresiva, barbero, servicio, dirección + "Ver mapa", desglose, "Cancelar cita". |
| Mis Citas · Completadas | `/citas?tab=completadas` | `269-10382` | Valoración (estrellas + comentario) o botón "Valorar corte". |
| Mis Citas · Canceladas | `/citas?tab=canceladas` | `269-10470` | Motivo, anticipación y estado del adelanto (devuelto o perdido). |
| Modal Cancelar | — (bottom sheet) | `269-10580` | Política de reembolso + motivo. |
| Modal Valorar | — (bottom sheet) | `269-10510` | Estrellas, chips de lo destacado, comentario. |
| Perfil | `/perfil` | `269-10077` ✏️ | Datos del cliente, **progreso de cortes (x/5)** y servicios gratis disponibles, ficha técnica de corte, recordatorios, cerrar sesión. *Quitar "Nivel Black" y la barra de 250/300 pts.* |

### 4.3 Barbero

| Pantalla | Ruta propuesta | Figma | Contenido |
| :-- | :-- | :-- | :-- |
| Agenda | `/barbero/agenda` | `565-3563` | Turnos del día con filtros (Todos, En atención, Próximo) y botón **"Registrar walk-in"** en bloques libres ✏️. Por turno: cliente, servicio, duración, abono, nota del cliente, "1ª vez", indicador de **servicio gratis**. |
| Cobro de turno | — (bottom sheet) | `12-14370` | Total, abono, saldo por cobrar, método (QR o pagar en caja), notas y preferencias del cliente. Al confirmar, la cita pasa a `completed` y **suma un corte** al cliente. |
| Perfil barbero | `/barbero/perfil` | `41-16709` | Rating, cortes realizados, estado actual + pausa; turno y jornada semanal; alertas VIP ✏️ (sin walk-ins express); **Mis especialidades: precio y duración editables** ("Editar catálogo y tiempos"); preferencias de sillón; bloquear días o vacaciones; cerrar sesión. |
| Editar servicios | `/barbero/servicios` | ❓ sin diseño ✏️ | Activar o desactivar servicios del catálogo base y fijar su precio y duración. |

---

## 5. Flujos principales

### 5.1 Registro e inicio de sesión ✅
1. El cliente se registra con email y contraseña, o con Google.
2. Si entra con Google por primera vez, completa su celular y acepta los términos.
3. Se crea `users/{uid}` con `role: 'client'`.
4. Después de iniciar sesión, si `role == 'barber'` se redirige a `/barbero/agenda`; si no, a `/`.

### 5.2 Reserva (cliente): 4 pasos ✅
1. Servicio → 2. Barbero (con su precio y duración) → 3. Día y hora → 4. Pago del adelanto.
2. Al entrar al paso 4 se crea la cita en `awaiting_payment` y se **retiene el horario 5 minutos**.
3. Se genera una orden de pago en **Libélula** por el adelanto (20%) y se muestra su QR.
4. Libélula notifica el pago a un **endpoint propio (Cloud Function)**. La cita pasa a `confirmed` y se genera el pase.
5. Si vence el tiempo sin pago, la cita pasa a `expired` y se libera el horario.
6. Si el cliente tiene un **servicio gratis** y decide usarlo, se omite el pago y la cita se confirma directamente (§6.6).

### 5.3 Cancelación (cliente) ✅
- Con **más de 2 h** de anticipación se devuelve el adelanto ❓ (devolución por Libélula o manual). Con 2 h o menos, se pierde.
- Si la cita usaba un servicio gratis: con más de 2 h se devuelve el beneficio, con menos se pierde ❓.
- El motivo es obligatorio.

### 5.4 Atención y cobro (barbero) ✅
1. El barbero ve su agenda del día.
2. Al terminar abre el cobro, registra el método de pago del saldo y confirma.
3. La cita pasa a `completed` y el sistema suma un corte a la tarjeta de fidelización del cliente.

### 5.5 Valoración (cliente) ✅
Después de una cita completada: estrellas (1–5), chips de lo destacado y comentario. Una valoración por cita.

### 5.6 Gestión del barbero ✅
El barbero define su turno, los días laborables, pausas y días bloqueados, y el **precio y la duración de cada servicio que ofrece**.

---

## 6. Reglas de negocio

### 6.1 Pagos
| # | Regla | Estado |
| :-- | :-- | :-- |
| P1 | El adelanto es el **20%** del precio del servicio **según el barbero elegido**. | ✅ |
| P2 | El pago se procesa con **Libélula**. La confirmación es **automática** por notificación del servidor, nunca por el botón del cliente. | ✅ / ⏳ **aún no hay cuenta en Libélula** |
| P2b | Mientras no exista la cuenta se desarrolla con un **proveedor simulado** (`MockPaymentProvider`): genera un QR de prueba y permite simular "pago recibido" o "pago vencido" en desarrollo. La integración real será una tarea aparte. | ✅ (decisión técnica) |
| P3 | El horario queda retenido **5 minutos** mientras se espera el pago. | ✅ |
| P4 | La integración se aísla detrás de una interfaz `PaymentProvider` para poder cambiar de pasarela sin tocar el flujo. | ✅ (decisión técnica) |
| P5 | El saldo se paga en el salón (QR o caja). No pasa por la plataforma: solo se registra el método. | ✅ |

### 6.2 Servicios y precios
| # | Regla | Estado |
| :-- | :-- | :-- |
| S1 | Existe un **catálogo base** de servicios (nombre, descripción, foto, categoría, precio y duración sugeridos). | ✅ |
| S2 | Cada barbero puede **ofrecer o no** cada servicio y fijar **su propio precio y duración**. | ✅ |
| S3 | Un cambio de precio **no afecta citas ya creadas**: la cita guarda una copia del precio y la duración del momento de reservar. | ✅ |
| S4 | El catálogo base lo carga el responsable (seed o consola) mientras no exista admin. | ✅ |

### 6.3 Agenda
| # | Regla | Estado |
| :-- | :-- | :-- |
| A1 | Turnos: Mañana 09:00–14:00, Tarde 14:00–21:00. Domingo libre por defecto. | ✅ / ❓ ¿cada barbero elige? |
| A2 | La agenda se divide en **bloques de 1 hora** (09:00, 10:00, …). Cada cita ocupa **un bloque completo**, sin importar la duración del servicio. | ✅ |
| A3 | Los bloques disponibles se calculan con la jornada del barbero, sus bloqueos y sus citas activas. Un turno de mañana tiene 5 bloques (09–14) y uno de tarde 7 (14–21). | ✅ |
| A4 | Solo se puede reservar **hoy y los 4 días siguientes** (5 días en total). Para hoy solo se muestran los bloques que aún no empezaron. | ✅ |
| A4b | Los servicios duran entre **45 y 60 min**: ningún servicio puede superar 60 min, así que siempre ocupa un solo bloque. | ✅ |
| A4d | **Clientes sin reserva (walk-in):** el barbero los registra desde su agenda en un bloque libre de hoy (nombre y celular). El bloque deja de estar disponible en la app y, si el celular coincide con un cliente registrado, el corte suma a su tarjeta. No se cobra adelanto. | ✅ |
| A4c | **No existen bloques menores a 1 hora.** Se elimina el concepto "Walk-ins express / espacios de 20 min": generaría una cola imposible de atender. | ✅ |
| A5 | Máximo de citas activas por cliente. | ❓ (propuesta: 1) |

### 6.4 Cancelación
| # | Regla | Estado |
| :-- | :-- | :-- |
| C1 | Con más de 2 h: se devuelve el adelanto. Con 2 h o menos: se pierde. | ✅ |
| C2 | Motivo obligatorio: "Llegaré tarde", "Imprevisto personal", "Imprevisto laboral", "Quiero otro servicio". | ✅ |

### 6.5 Notificaciones
| # | Regla | Estado |
| :-- | :-- | :-- |
| N1 | Recordatorio push 2 h antes del turno. | ✅ / ❓ ¿entra en el MVP? |
| N2 | "Hueco anticipado": avisar si el barbero libera un horario más temprano. | ❓ (propuesta: fase 2) |

### 6.6 Fidelización: "Tarjeta Grizzly" (propuesta v1) ✅

> Modelo de **tarjeta de sellos**, simple de entender y de cambiar después en otro requerimiento.

| # | Regla |
| :-- | :-- |
| F1 | Cada cita **completada** suma **1 corte** a la tarjeta del cliente. |
| F2 | Solo suman las citas que el barbero cierra en el cobro. **No suman** las canceladas, las expiradas, las inasistencias ni las citas pagadas con un servicio gratis. |
| F3 | Al llegar a **5 cortes** se genera **1 servicio gratis** y la tarjeta vuelve a 0. |
| F4 | ⏳ **Por definir por el responsable:** qué servicio cubre el beneficio (cualquiera, uno específico o hasta un valor tope). |
| F5 | ⏳ **Por definir:** vencimiento del beneficio. Es personal y no se puede transferir ni canjear por dinero. |
| F6 | Al reservar con servicio gratis **no se cobra adelanto**. Si el cliente cancela con más de 2 h, recupera el beneficio. Si cancela con 2 h o menos o no se presenta, **lo pierde**. |
| F7 | Los cortes se suman **en el servidor** (Cloud Function al pasar la cita a `completed`). El cliente no puede modificarlos. |
| F8 | Las reglas (cortes necesarios, tope de valor, vencimiento) se guardan como **configuración** (`business_config/loyalty`) para poder ajustarlas sin desplegar código. |

**Ajustes de UI ✏️**
- Reemplazar "Puntos Grizzly 250/300 pts" por una tarjeta de **5 sellos** ("3 de 5 cortes · te faltan 2 para tu servicio gratis").
- En el Home y el Perfil, mostrar los servicios gratis disponibles y su vencimiento.
- En el paso 4 de la reserva, un interruptor "Usar mi servicio gratis".
- Quitar "Acumulas 25 pts" de Mis Citas. Reemplazar por "Esta cita suma 1 corte a tu tarjeta".
- Quitar el nivel "Black" del perfil.

---

## 7. Arquitectura e implicaciones técnicas

| Tema | Decisión |
| :-- | :-- |
| Auth | Firebase Auth: **Email/Password + Google**. El celular se guarda en el perfil, no se usa para iniciar sesión. |
| Roles | Se guardan como **custom claim** (`role`) asignado con un script con Admin SDK y se reflejan en `users/{uid}.role`, que el cliente no puede escribir. |
| Backend | **Cloud Functions** para: crear la orden en Libélula, recibir la notificación de pago, expirar las citas no pagadas, sumar cortes y generar servicios gratis. Requiere el plan **Blaze** de Firebase. |
| Pasarela | Libélula, detrás de la interfaz `PaymentProvider`. Las credenciales viven en el entorno de Functions (Secret Manager), nunca en el frontend. |
| Datos sensibles | Los precios y montos se calculan en el servidor. El cliente nunca envía el monto a cobrar. |
| Seed | Script `scripts/seed.mjs` que carga el catálogo base, los barberos y asigna roles. |

---

## 8. Entidades de datos (cambios sobre AGENTS.md)

| Entidad | Cambios |
| :-- | :-- |
| `users` | Login por email. `phone` obligatorio. `authProvider` (password/google). `memberCode` (#GZ-XXXX). `haircutProfile` { estiloHabitual, laterales, barba, acabado }. `reminders` { push2h }. `loyalty` { stamps: 0–4, totalCompletedCuts }. **Se eliminan** `tier` y `points`. |
| `barbers` | `rating`, `cutsCount`, `chairNumber`, `shift`, `workDays`, `blockedDates`, `vipAlerts`, `currentStatus`, `chairPreferences`. |
| `services` | Catálogo base: `basePrice` y `baseDuration` (sugeridos). |
| `barbers/{id}/offerings` (nueva) | `serviceId`, `price`, `durationMinutes`, `active`. Precio y duración por barbero. |
| `appointments` | `code` (#GB-XXXXX), copia de `price` y `durationMinutes`, `depositAmount`, `depositStatus` (pending/paid/refunded/forfeited/waived), `paymentDeadline`, `paymentRef`, `balancePaymentMethod`, `rewardId?`, `cancellation` { reason, hoursBefore }, `rating` { stars, highlights[], comment }, `barberNotes`. Estados nuevos: `awaiting_payment`, `expired`, `no_show`. |
| `payments` (nueva) | Orden e historial de Libélula: `appointmentId`, monto, estado, referencia, payload de la notificación. Escritura solo desde el servidor. |
| `rewards` (nueva) | `userId`, `status` (available/reserved/used/expired), `createdAt`, `expiresAt`, `appointmentId?`. |
| `business_config/loyalty` | `cutsRequired: 5`, `maxRewardValue`, `rewardValidityDays: 90`. |

---

## 9. Inconsistencias del diseño a corregir ✏️

1. **Login y registro** usan celular + contraseña: cambiar a email + contraseña y agregar Google.
2. **Pasos de reserva:** son 4, pero el Home dice "en solo 3 pasos".
3. "Detectando transferencia" muestra **Bs 12.50**, pero el adelanto es **Bs 10**.
4. Typo en el header: "INICIAR **SECION**". Falta definir qué muestra el header con sesión iniciada y sin ella.
5. Datos de ejemplo repetidos ("Corte Completo" ×2, "Jose Maral" ×3, "14:00 PM" repetido) y formato horario mezclado ("13:00 PM").
6. Puntos y niveles: reemplazar por la tarjeta de 5 sellos (§6.6).
7. Paso 2: falta mostrar el **precio y la duración del barbero** para el servicio elegido.
8. La navegación del barbero incluye **Mi Sillón** y **Caja**, que no están aprobadas.
9. La paleta de Figma (dorado `~#F2C94C`) no coincide con `tailwind.config.js` (`#d97706`).
10. Faltan diseños de: completar perfil (Google), recuperar clave y editar servicios del barbero.
11. **Paso 3 de la reserva:** la grilla debe mostrar bloques de 1 hora en formato 24 h (09:00, 10:00…) y el selector de días solo los 5 días permitidos.
12. **Perfil del barbero:** quitar el toggle "Walk-ins express · llenar espacios libres de 20 min".

---

## 10. Registro de decisiones

| Fecha | Decisión |
| :-- | :-- |
| 2026-11-18 | Pasarela de pago: **Libélula** (detalles de integración por definir). |
| 2026-11-18 | Precio y duración de los servicios **modificables por barbero**. |
| 2026-11-18 | Auth: Firebase **email + contraseña** y **Google**. |
| 2026-11-18 | **Sin rol Admin** en el alcance actual. |
| 2026-11-18 | **Mi Sillón** y **Caja** quedan fuera hasta que se aprueben sus diseños. |
| 2026-11-18 | Fidelización v1: **5 cortes completados = 1 servicio gratis** (reglas en §6.6, ajustables en un requerimiento futuro). |
| 2026-11-18 | Aún **no hay cuenta en Libélula**: se desarrolla con un proveedor de pago simulado. |
| 2026-11-18 | Agenda en **bloques de 1 hora**; reservas para **hoy y los 4 días siguientes**. |
| 2026-11-18 | Los servicios duran **45–60 min** (1 bloque). Se elimina "Walk-ins express" de 20 min. |
| 2026-11-18 | Los **walk-ins** se registran desde la agenda del barbero en un bloque libre. |
| 2026-11-18 | El alcance del **servicio gratis** (qué cubre y cuándo vence) queda pendiente de definición. |

---

## 11. Preguntas abiertas

1. **Libélula:** cuando abran la cuenta, conseguir la documentación de la API y confirmar si las devoluciones se pueden hacer por API.
2. **Servicio gratis:** qué servicio cubre y si vence.
3. **Turnos:** ¿cada barbero elige mañana o tarde, o lo asigna la barbería?
4. **Citas activas por cliente:** ¿1 a la vez o más? (propuesta: 1)
5. **Recordatorio push 2 h antes:** ¿entra en el MVP? Implica PWA + Firebase Cloud Messaging.
6. **"En camino · llega en ~7 min"** en la agenda del barbero: ¿el cliente lo avisa con un botón o se descarta?

---

## 12. Próximos pasos

1. Resolver §11 y cerrar la v1.
2. Ajustar Figma según §9 (login, fidelización, paso 2, navegación del barbero).
3. Extraer los tokens de Figma y actualizar `tailwind.config.js`.
4. Inventario de componentes (`docs/componentes.md`).
5. Specs maestras por capacidad: `auth`, `catalogo`, `reservas`, `pagos`, `citas-cliente`, `perfil-cliente`, `agenda-barbero`, `perfil-barbero`, `fidelizacion`.
6. Backlog en Trello.
