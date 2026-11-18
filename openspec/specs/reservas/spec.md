# reservas Specification

## Purpose
Flujo de reserva del cliente en 4 pasos con bloques de 1 hora, retención del horario y adelanto del 20%. Fuente: `docs/producto.md` §4.2, §5.2, §6.1, §6.3 y §6.4.

## Requirements

### Requirement: Flujo de 4 pasos
The booking flow SHALL consist of: (1) service, (2) barber, (3) day and time block, (4) deposit payment, with a step indicator.

#### Scenario: Avance entre pasos
- **WHEN** el cliente completa la selección de un paso y pulsa "Continuar"
- **THEN** el sistema MUST avanzar al siguiente paso conservando las selecciones anteriores
- **AND** "Continuar" MUST estar deshabilitado mientras no haya selección

#### Scenario: Volver atrás
- **WHEN** el cliente vuelve a un paso anterior y cambia su elección
- **THEN** el sistema MUST descartar las selecciones posteriores que dependan de ella

### Requirement: Ventana de reserva y bloques
Bookable days SHALL be today and the next 4 days; each day SHALL be divided into 1-hour blocks within the barber's shift, and each appointment MUST occupy exactly one block.

#### Scenario: Días disponibles
- **WHEN** el cliente llega al paso 3
- **THEN** el sistema MUST mostrar hoy y los 4 días siguientes, con la cantidad de bloques libres de cada día
- **AND** MUST mostrar sin cupos los días no laborables o bloqueados del barbero

#### Scenario: Bloques de hoy
- **WHEN** el cliente elige el día de hoy
- **THEN** el sistema MUST mostrar solo los bloques cuya hora de inicio aún no pasó

#### Scenario: Bloque ocupado
- **WHEN** un bloque tiene una cita `awaiting_payment`, `confirmed` o un walk-in
- **THEN** el bloque MUST mostrarse como no disponible

### Requirement: Retención del horario y no solapamiento
When entering step 4 the system SHALL create the appointment in `awaiting_payment`, holding the block for 5 minutes; two appointments MUST NOT occupy the same block of the same barber.

#### Scenario: Dos clientes eligen el mismo bloque
- **WHEN** dos clientes intentan reservar el mismo bloque del mismo barbero al mismo tiempo
- **THEN** solo uno MUST obtener la reserva
- **AND** el otro MUST recibir un aviso y volver a elegir horario

#### Scenario: Vence el tiempo de pago
- **WHEN** pasan 5 minutos sin pago confirmado
- **THEN** la cita MUST pasar a `expired` y el bloque MUST liberarse

### Requirement: Adelanto del 20%
The deposit SHALL be 20% of the price of the chosen barber's offering, calculated server-side; confirmation MUST come only from the payment provider notification.

#### Scenario: Pago confirmado
- **WHEN** el proveedor de pago notifica el pago del adelanto dentro del plazo
- **THEN** la cita MUST pasar a `confirmed`, con `depositStatus: 'paid'` y un código `#GB-XXXXX`
- **AND** el cliente MUST ver el pase de turno

#### Scenario: El cliente pulsa "Ya realicé la transferencia"
- **WHEN** el cliente pulsa el botón sin que haya notificación del proveedor
- **THEN** el sistema MUST mostrar "Verificando pago" y NO SHALL confirmar la cita

#### Scenario: Proveedor simulado en desarrollo
- **WHEN** la app corre con el proveedor simulado
- **THEN** MUST existir una forma de simular "pago recibido" y "pago vencido" que no esté disponible en producción

### Requirement: Cancelación por el cliente
A client SHALL be able to cancel a confirmed appointment giving a mandatory reason; the deposit is refunded if cancelled more than 2 hours before the start, otherwise it is forfeited.

#### Scenario: Cancelación con más de 2 horas
- **WHEN** el cliente cancela con más de 2 horas de anticipación
- **THEN** la cita MUST pasar a `cancelled` con `depositStatus: 'refunded'` y el bloque MUST liberarse

#### Scenario: Cancelación con 2 horas o menos
- **WHEN** el cliente cancela con 2 horas o menos de anticipación
- **THEN** la cita MUST pasar a `cancelled` con `depositStatus: 'forfeited'`
- **AND** antes de confirmar el sistema MUST advertir que perderá el adelanto
