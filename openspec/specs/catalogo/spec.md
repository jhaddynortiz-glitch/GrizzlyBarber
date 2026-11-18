# catalogo Specification

## Purpose
Catálogo base de servicios y oferta de cada barbero, con precio y duración propios. Fuente: `docs/producto.md` §6.2 y §8.

## Requirements

### Requirement: Catálogo base de servicios
The system SHALL maintain a base catalog in `services` with name, description, image, category, suggested price and suggested duration, loaded by seed script while there is no admin role.

#### Scenario: Carga inicial
- **WHEN** el responsable ejecuta el script de seed
- **THEN** el catálogo base MUST quedar disponible en `services`

#### Scenario: Escritura desde la app
- **WHEN** un cliente o barbero intenta escribir en `services`
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Oferta por barbero
Each barber SHALL define which base services they offer, with their own price (Bs) and duration between 45 and 60 minutes, in `barbers/{id}/offerings`.

#### Scenario: Barbero edita precio y duración
- **WHEN** un barbero cambia el precio o la duración de un servicio que ofrece
- **THEN** el sistema MUST guardar el cambio en su oferta
- **AND** MUST rechazar duraciones menores a 45 o mayores a 60 minutos y precios menores o iguales a 0

#### Scenario: Barbero edita la oferta de otro
- **WHEN** un barbero intenta modificar la oferta de otro barbero
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Visualización pública del catálogo
The system SHALL show active services and active barbers to signed-in clients, including the price range across barbers.

#### Scenario: Lista de servicios
- **WHEN** el cliente abre el paso 1 de la reserva o la carta de servicios del Inicio
- **THEN** el sistema MUST mostrar solo los servicios activos que al menos un barbero activo ofrece
- **AND** MUST mostrar el precio "desde" (el menor entre los barberos)

#### Scenario: Barberos por servicio
- **WHEN** el cliente eligió un servicio
- **THEN** el sistema MUST listar solo los barberos activos que lo ofrecen, con su precio, duración, rating y especialidades

### Requirement: Precio congelado en la cita
A booking SHALL store a copy of the price and duration at booking time; later changes to an offering MUST NOT alter existing appointments.

#### Scenario: Cambio de precio con citas existentes
- **WHEN** un barbero cambia el precio de un servicio que tiene citas futuras
- **THEN** esas citas MUST conservar el precio con que se reservaron
