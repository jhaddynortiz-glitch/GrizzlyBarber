# perfil-cliente Specification

## Purpose
Perfil del cliente: datos personales, ficha técnica de corte, recordatorios y acceso a su tarjeta de fidelización. Fuente: `docs/producto.md` §4.2 y §8.

## Requirements

### Requirement: Datos del perfil
The client profile SHALL show name, avatar, member code `#GZ-XXXX` and member-since year, and let the client edit name, phone and avatar.

#### Scenario: Ver perfil
- **WHEN** el cliente abre `/perfil`
- **THEN** el sistema MUST mostrar sus datos y su código de miembro

#### Scenario: Editar datos
- **WHEN** el cliente cambia su nombre o celular
- **THEN** el sistema MUST validar el formato (+591, 8 dígitos) y guardar el cambio
- **AND** NO SHALL permitir modificar `role`, `memberCode` ni `loyalty`

### Requirement: Ficha técnica de corte
The client SHALL maintain a haircut profile (usual style, sides, beard and lines, finish) visible to the barber who serves them.

#### Scenario: Actualizar fórmula
- **WHEN** el cliente pulsa "Actualizar mi fórmula de corte" y guarda
- **THEN** el sistema MUST guardar la ficha en su perfil

#### Scenario: Barbero ve la ficha
- **WHEN** un barbero abre una cita de ese cliente
- **THEN** el sistema MUST mostrarle la ficha técnica de corte del cliente

### Requirement: Recordatorios
The client SHALL be able to enable or disable the reminder 2 hours before the appointment.

#### Scenario: Activar recordatorio
- **WHEN** el cliente activa el recordatorio
- **THEN** el sistema MUST guardar la preferencia y pedir permiso de notificaciones del navegador
- **AND** el envío de la notificación MUST definirse en una spec de notificaciones (pendiente de confirmar para el MVP)

### Requirement: Tarjeta de fidelización en el perfil
The profile SHALL display the loyalty card as defined in the `fidelizacion` spec.

#### Scenario: Ver progreso
- **WHEN** el cliente abre su perfil
- **THEN** el sistema MUST mostrar sus cortes acumulados sobre 5 y sus servicios gratis disponibles
