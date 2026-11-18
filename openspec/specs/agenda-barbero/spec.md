# agenda-barbero Specification

## Purpose
Agenda diaria del barbero, registro de walk-ins, cobro del saldo y gestión de disponibilidad. Fuente: `docs/producto.md` §4.3, §5.4, §5.6 y §6.3.

## Requirements

### Requirement: Agenda del día
The barber SHALL see their schedule for the selected day as 1-hour blocks within their shift, each showing the appointment or "free".

#### Scenario: Ver agenda
- **WHEN** el barbero abre `/barbero/agenda`
- **THEN** el sistema MUST mostrar los bloques del día con cliente, servicio, duración, abono, nota del cliente e indicador de "1ª vez"
- **AND** MUST actualizarse en tiempo real cuando entra, se cancela o expira una cita

#### Scenario: Filtros
- **WHEN** el barbero elige "Todos", "En atención" o "Próximo"
- **THEN** el sistema MUST filtrar las citas según ese estado

#### Scenario: Acceso a citas de otro barbero
- **WHEN** un barbero intenta leer citas de otro barbero
- **THEN** Firestore MUST rechazar la lectura

### Requirement: Registro de walk-in
The barber SHALL be able to register a walk-in client in a free block of today, with name, phone and service; no deposit is charged.

#### Scenario: Registrar walk-in
- **WHEN** el barbero registra un walk-in en un bloque libre
- **THEN** el sistema MUST crear la cita con `source: 'walk_in'` y `depositStatus: 'waived'`
- **AND** el bloque MUST dejar de estar disponible para reservas

#### Scenario: Bloque ocupado mientras registra
- **WHEN** un cliente reserva ese bloque antes de que el barbero confirme el walk-in
- **THEN** el sistema MUST rechazar el walk-in y avisar al barbero

### Requirement: Cobro y cierre de la cita
The barber SHALL close an attended appointment by recording the balance payment method (QR or cash desk); the appointment then becomes `completed`.

#### Scenario: Cobrar saldo
- **WHEN** el barbero confirma el cobro indicando el método de pago
- **THEN** la cita MUST pasar a `completed` con `balancePaymentMethod` registrado
- **AND** el saldo mostrado MUST ser el precio de la cita menos el adelanto pagado

#### Scenario: Cliente no se presentó
- **WHEN** el barbero marca la cita como "no se presentó"
- **THEN** la cita MUST pasar a `no_show` y el adelanto MUST quedar `forfeited`

### Requirement: Disponibilidad del barbero
The barber SHALL manage their shift (morning 09:00–14:00 or afternoon 14:00–21:00), working weekdays and blocked dates; changes MUST NOT cancel existing confirmed appointments.

#### Scenario: Bloquear un día
- **WHEN** el barbero bloquea una fecha sin citas confirmadas
- **THEN** esa fecha MUST dejar de ofrecer bloques a los clientes

#### Scenario: Bloquear un día con citas
- **WHEN** el barbero intenta bloquear una fecha que tiene citas confirmadas
- **THEN** el sistema MUST advertirle y NO SHALL cancelar esas citas automáticamente
