# Inventario de componentes: Grizzly Barber

> **Estado:** Borrador v0, derivado de las pantallas aprobadas de Figma (ver `docs/producto.md` §4).
> **Regla para IA y desarrolladores:** antes de crear un componente nuevo, buscarlo aquí. Si no existe, se agrega a este inventario dentro del cambio OpenSpec que lo introduce.

Enlace base: `https://www.figma.com/design/2zNbwG3mqxkur2bwkZwHyx/Grizzlybarber?node-id=<id>`

---

## 0. Estado del archivo de Figma

- En Figma solo hay **4 componentes reales** reutilizados entre pantallas: `Button`, `Header`, `Background+Border-cliente` (nav inferior del cliente) y `Background+Border-barber` (nav inferior del barbero). El resto son frames sueltos copiados entre pantallas.
- **Recomendación ✏️:** convertir en componentes de Figma los patrones repetidos de este inventario (tarjetas de servicio y barbero, chips, tabs, bottom sheet, etc.), con variantes. Eso permite usar Code Connect más adelante y evita diferencias entre pantallas.
- **Tokens pendientes:** no se pudieron leer las variables de Figma (límite del plan Starter de la API). Valores observados en las capturas, a confirmar:

| Token | Valor observado | Uso |
| :-- | :-- | :-- |
| `bg` | ~`#171717` | Fondo de la app |
| `surface` | ~`#262626` | Tarjetas |
| `surface-2` | ~`#2E2E2E` | Inputs, chips, tarjetas anidadas |
| `gold` | ~`#F2C94C` | Acento principal, CTA, ítem activo |
| `gold-muted` | ~`#5C4A1A` | Badges de fondo dorado |
| `text` | ~`#F5F5F5` | Texto principal |
| `text-muted` | ~`#A3A3A3` | Texto secundario |
| `success` | ~`#22C55E` | Toggles activos, check |
| `danger` | ~`#EF4444` | Cancelar cita, cerrar sesión |
| Tipografía | Grotesca geométrica (¿Space Grotesk?) | Confirmar nombre en Figma |
| Radio | ~12–16 px tarjetas, ~10 px botones | — |

---

## 1. Layout

| Componente | Variantes / props | Usado en | Figma |
| :-- | :-- | :-- | :-- |
| `AppHeader` | `back?`, `userName?`, logo | Todas las pantallas con sesión | instancia `Header` |
| `BottomNav` | `role: client \| barber`, `active` | Cliente: Inicio · Reservar · Mis Citas · Perfil. Barbero: Agenda · Perfil ✏️ | `Background+Border-cliente`, `Background+Border-barber` |
| `PageContainer` | — | Todas | — |
| `AuthLayout` | logo + título + subtítulo | Login, Registro | `670-4123`, `670-4257` |

## 2. Base (UI)

| Componente | Variantes / props | Usado en |
| :-- | :-- | :-- |
| `Button` | `primary` (dorado), `secondary` (gris), `ghost`, `danger`; `size`; `icon`; `fullWidth`; `loading` | Casi todas |
| `IconButton` | — | Header, descargar QR |
| `TextField` | `icon`, `label`, `required`, `hint`, `error`, `optional` | Login, Registro |
| `PasswordField` | mostrar/ocultar | Login, Registro |
| `PhoneField` | prefijo de país fijo `BO +591` | Registro, completar perfil |
| `Checkbox` | — | Recordarme, Aceptar términos |
| `Toggle` | — | Recordatorios (perfil cliente), alertas (perfil barbero) |
| `Badge` | `gold`, `neutral`, `success`, `danger`; con ícono | "TOP", "Completada", "Cancelada", "Senior Master" |
| `Chip` | `selectable`, `selected` | Especialidades del barbero, motivos de cancelación, "lo más destacado" |
| `Tabs` | segmentado, con ícono | Mis Citas (Próximas · Completadas · Canceladas), filtros de agenda |
| `Avatar` | `size`, `verified?` | Barbero, cliente |
| `RatingStars` | `readonly` / `input`, valor | Barbero, valoración |
| `StepProgress` | `current`, `total` (4) | Reserva |
| `BottomSheet` | `title`, drag handle | Cancelar, Valorar, Cobro |
| `Countdown` | `seconds` | Pago QR (05:00) |
| `EmptyState` | ícono + texto + acción | Listas vacías (sin diseño ✏️) |
| `Skeleton` | — | Cargas (sin diseño ✏️) |
| `Toast` | `success`, `error` | Errores y confirmaciones (sin diseño ✏️) |

## 3. Dominio

### Catálogo y barberos
| Componente | Descripción | Usado en |
| :-- | :-- | :-- |
| `ServiceCard` | Foto, nombre, descripción, precio, duración; `variant: list \| selectable`; badge "TOP" | Home, Reserva paso 1 |
| `BarberCard` | Foto, nombre, rating, especialidades, disponibilidad; `variant: carousel \| selectable` | Home, Reserva paso 2 |
| `BarberMiniCard` | Avatar + nombre + rango + rating | Pase, Mis Citas, Completadas |
| `AvailabilityIndicator` | "Disponible ahora" / "Disponible en 2 h" / "Disp. hoy 16:30" | BarberCard |

### Reserva
| Componente | Descripción | Usado en |
| :-- | :-- | :-- |
| `DayPicker` | Tarjetas de día (nombre, número, cupos libres), 5 días | Paso 3 |
| `TimeSlotGrid` | Bloques de 1 h en formato 24 h; estados libre / seleccionado / ocupado | Paso 3 |
| `BookingSummaryCard` | Servicio, barbero, fecha y hora, total, adelanto 20% | Paso 4 |
| `QrPaymentPanel` | QR, descargar, countdown, estados `waiting \| verifying \| expired` | Paso 4 |
| `BookingPass` | Pase con código, barbero, fecha, ubicación y desglose | Confirmado |
| `PaymentBreakdown` | Total, adelanto, saldo en caja | Pase, Próximas, Cobro |
| `RewardToggle` | "Usar mi servicio gratis" | Paso 4 ✏️ (sin diseño) |

### Citas del cliente
| Componente | Descripción | Usado en |
| :-- | :-- | :-- |
| `AppointmentCard` | `status: upcoming \| completed \| cancelled`; fecha, cuenta regresiva, barbero, servicio, desglose, acciones | Mis Citas |
| `NextAppointmentCard` | Resumen compacto del próximo turno + "Ver detalles" | Home |
| `CancelAppointmentSheet` | Política de reembolso + motivos | Próximas |
| `RateAppointmentSheet` | Estrellas + chips + comentario | Completadas |
| `RatingSummary` | Estrellas + comentario o "Sin valoración" + "Valorar corte" | Completadas |

### Perfil del cliente
| Componente | Descripción | Usado en |
| :-- | :-- | :-- |
| `ProfileHeaderCard` | Avatar, nombre, código de miembro, miembro desde | Perfil |
| `LoyaltyCard` | 5 sellos, progreso, servicios gratis disponibles ✏️ (reemplaza "Puntos Grizzly") | Home, Perfil |
| `HaircutProfileCard` | Ficha técnica de corte + "Actualizar mi fórmula de corte" | Perfil |
| `ReminderSettings` | Lista de toggles | Perfil |

### Barbero
| Componente | Descripción | Usado en |
| :-- | :-- | :-- |
| `AgendaFilterTabs` | Todos (n) · En atención · Próximo | Agenda |
| `AgendaSlotCard` | Hora, cliente, servicio, abono, nota, "1ª vez", servicio gratis; bloque libre con "Registrar walk-in" ✏️ | Agenda |
| `ChargeSheet` | Desglose, método de cobro (QR / caja), notas del cliente, confirmar | Cobro |
| `WalkInSheet` | Nombre + celular + servicio ✏️ (sin diseño) | Agenda |
| `BarberProfileHeader` | Foto, rango, rating, cortes, estado + "Pausa 15m" | Perfil barbero |
| `ShiftSelector` | Mañana / Tarde | Perfil barbero |
| `WeekdaySelector` | L–D con estado activo / libre | Perfil barbero |
| `OfferingRow` | Servicio con precio y duración del barbero | Perfil barbero, editar servicios |
| `ChairPreferences` | Música y cortesía | Perfil barbero |
| `BlockDaysEntry` | "Modo vacaciones / Bloquear días" | Perfil barbero |

---

## 4. Pantallas sin diseño (bloquean tarjetas de UI) ✏️

- Completar perfil (después de entrar con Google)
- Recuperar contraseña
- Editar servicios, precios y tiempos del barbero
- Registrar walk-in
- Bloquear días / vacaciones (solo existe la entrada en el perfil)
- Estados vacíos, de carga y de error
- Tarjeta de fidelización de 5 sellos y "Usar mi servicio gratis"
