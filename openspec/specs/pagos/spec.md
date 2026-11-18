# pagos Specification

## Purpose
Cobro del adelanto de la reserva mediante una pasarela de pago intercambiable. La pasarela definida es Libélula, pero aún no hay cuenta comercial: mientras tanto se usa un proveedor simulado. Fuente: `docs/producto.md` §6.1 y §7.

## Requirements

### Requirement: Abstracción del proveedor de pago
Payment logic SHALL depend on a `PaymentProvider` interface (create order, get status, refund) so that the provider can be replaced without changing the booking flow.

#### Scenario: Cambio de proveedor
- **WHEN** se reemplaza el proveedor simulado por Libélula
- **THEN** el flujo de reserva y las pantallas NO SHALL requerir cambios

### Requirement: Creación de la orden de pago en el servidor
Payment orders SHALL be created by a Cloud Function that computes the amount from the stored appointment; the client MUST NOT send the amount.

#### Scenario: Crear orden
- **WHEN** el cliente llega al paso 4 con una cita `awaiting_payment`
- **THEN** el servidor MUST crear la orden por el 20% del precio guardado en la cita y registrar un documento en `payments`
- **AND** MUST devolver al cliente solo el QR, el monto y la fecha límite

#### Scenario: Monto manipulado
- **WHEN** una solicitud del cliente incluye un monto distinto
- **THEN** el servidor MUST ignorarlo y usar el monto calculado

### Requirement: Confirmación por notificación del proveedor
Payments SHALL be confirmed only through the provider notification (webhook) received by a Cloud Function, verified for authenticity and processed idempotently.

#### Scenario: Notificación válida dentro del plazo
- **WHEN** llega una notificación auténtica de pago de una orden vigente
- **THEN** el servidor MUST marcar el pago como `paid` y la cita como `confirmed`

#### Scenario: Notificación duplicada
- **WHEN** la misma notificación llega más de una vez
- **THEN** el servidor MUST procesarla una sola vez

#### Scenario: Pago fuera de plazo
- **WHEN** llega una notificación de pago de una cita ya `expired`
- **THEN** el servidor MUST registrar el pago como `late` para devolución manual y NO SHALL confirmar la cita

### Requirement: Devoluciones
When a deposit must be refunded (cancellation more than 2 hours before, or a late payment), the system SHALL mark it `refund_pending` until the refund is executed.

#### Scenario: Devolución pendiente
- **WHEN** una cita se cancela con más de 2 horas de anticipación
- **THEN** el pago MUST pasar a `refund_pending`
- **AND** el mecanismo de devolución (API o manual) MUST definirse al integrar Libélula

### Requirement: Proveedor simulado
While no Libélula account exists, the system SHALL use a `MockPaymentProvider` available only outside production.

#### Scenario: Simular pago en desarrollo
- **WHEN** un desarrollador usa la acción "Simular pago recibido" o "Simular vencimiento"
- **THEN** el sistema MUST producir el mismo efecto que la notificación real

#### Scenario: Producción
- **WHEN** la app corre en producción
- **THEN** el proveedor simulado y sus acciones MUST estar deshabilitados

### Requirement: Credenciales
Payment provider credentials SHALL live only in Cloud Functions secrets and MUST NOT be exposed to the frontend or the repository.

#### Scenario: Build del frontend
- **WHEN** se compila el frontend
- **THEN** el bundle NO SHALL contener credenciales de la pasarela
