# fidelizacion Specification

## Purpose
"Tarjeta Grizzly": cada corte completado suma un sello y con 5 sellos el cliente obtiene un servicio gratis. Qué servicio cubre el beneficio y si vence está pendiente de definición; esas reglas se agregarán en un cambio futuro. Fuente: `docs/producto.md` §6.6.

## Requirements

### Requirement: Acumulación de cortes
Each appointment that becomes `completed` SHALL add one stamp to the client's loyalty card, computed server-side.

#### Scenario: Cita completada
- **WHEN** una cita pagada (reserva o walk-in de un cliente registrado) pasa a `completed`
- **THEN** el servidor MUST sumar 1 sello a `users/{uid}.loyalty.stamps`

#### Scenario: Citas que no suman
- **WHEN** una cita termina `cancelled`, `expired` o `no_show`, o se pagó con un servicio gratis
- **THEN** el servidor NO SHALL sumar sellos

#### Scenario: Suma única
- **WHEN** la misma cita se procesa más de una vez
- **THEN** el servidor MUST sumar el sello una sola vez

#### Scenario: Escritura desde el cliente
- **WHEN** un cliente intenta modificar sus sellos o sus beneficios
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Generación del servicio gratis
When the card reaches the configured number of stamps (5 by default, in `business_config/loyalty.cutsRequired`), the system SHALL create one free-service reward and reset the card to 0.

#### Scenario: Quinto corte
- **WHEN** el cliente completa su quinto corte
- **THEN** el servidor MUST crear un documento en `rewards` con `status: 'available'`
- **AND** MUST dejar los sellos en 0

### Requirement: Uso del servicio gratis
A client with an available reward SHALL be able to apply it in step 4 of the booking; in that case no deposit is charged.

#### Scenario: Reservar con servicio gratis
- **WHEN** el cliente activa "Usar mi servicio gratis" y confirma
- **THEN** la cita MUST confirmarse sin pago, con `depositStatus: 'waived'` y el beneficio en `reserved`

#### Scenario: Cita completada con beneficio
- **WHEN** esa cita pasa a `completed`
- **THEN** el beneficio MUST pasar a `used`

#### Scenario: Cancelación con más de 2 horas
- **WHEN** el cliente cancela esa cita con más de 2 horas de anticipación
- **THEN** el beneficio MUST volver a `available`

#### Scenario: Cancelación tardía o inasistencia
- **WHEN** el cliente cancela con 2 horas o menos, o no se presenta
- **THEN** el beneficio MUST pasar a `used` y se pierde

### Requirement: Visualización de la tarjeta
The client SHALL see their stamps out of 5 and available rewards on the Home and the Profile.

#### Scenario: Progreso
- **WHEN** el cliente tiene 3 sellos
- **THEN** el sistema MUST mostrar "3 de 5 cortes · te faltan 2 para tu servicio gratis"
