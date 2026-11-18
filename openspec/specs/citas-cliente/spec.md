# citas-cliente Specification

## Purpose
Gestión de las citas del cliente: próximas, completadas y canceladas, y valoración del servicio. La cancelación está definida en la spec `reservas`. Fuente: `docs/producto.md` §4.2 y §5.5.

## Requirements

### Requirement: Mis Citas por pestañas
The client SHALL see their appointments in three tabs: Upcoming, Completed and Cancelled.

#### Scenario: Próximas
- **WHEN** el cliente abre la pestaña "Próximas"
- **THEN** el sistema MUST mostrar sus citas `confirmed` futuras ordenadas por fecha, con cuenta regresiva, barbero, servicio, dirección con "Ver mapa" y desglose de total, adelanto y saldo en caja
- **AND** cada cita MUST ofrecer "Cancelar cita"

#### Scenario: Completadas
- **WHEN** el cliente abre la pestaña "Completadas"
- **THEN** el sistema MUST mostrar sus citas `completed`, de la más reciente a la más antigua, con su valoración o el botón "Valorar corte"

#### Scenario: Canceladas
- **WHEN** el cliente abre la pestaña "Canceladas"
- **THEN** el sistema MUST mostrar sus citas `cancelled`, `expired` y `no_show` con el motivo y el estado del adelanto (devuelto o perdido)

#### Scenario: Sin citas
- **WHEN** una pestaña no tiene citas
- **THEN** el sistema MUST mostrar un estado vacío con acceso a "Reservar"

### Requirement: Próximo turno en el Inicio
The client home SHALL show the next confirmed appointment, if any.

#### Scenario: Cliente con turno
- **WHEN** el cliente tiene una cita confirmada futura
- **THEN** el Inicio MUST mostrar la tarjeta "Tu próximo turno confirmado" con servicio, barbero, fecha, hora y precio

### Requirement: Valoración del servicio
The client SHALL be able to rate each completed appointment once, with 1 to 5 stars, optional highlight chips and an optional comment.

#### Scenario: Valorar
- **WHEN** el cliente envía una valoración de una cita completada
- **THEN** el sistema MUST guardarla en la cita y recalcular el rating promedio del barbero en el servidor

#### Scenario: Valoración repetida
- **WHEN** el cliente intenta valorar de nuevo una cita ya valorada
- **THEN** el sistema MUST rechazarlo

#### Scenario: Cita no completada
- **WHEN** el cliente intenta valorar una cita que no está `completed`
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Privacidad de las citas
A client SHALL only read their own appointments.

#### Scenario: Acceso a citas ajenas
- **WHEN** un cliente intenta leer una cita de otro cliente
- **THEN** Firestore MUST rechazar la lectura
