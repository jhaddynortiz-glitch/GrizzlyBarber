# perfil-barbero Specification

## Purpose
Perfil del barbero: presentación, estado, turno y jornada, servicios ofrecidos y preferencias de sillón. La gestión de bloques y walk-ins está en `agenda-barbero` y la oferta de servicios en `catalogo`. Fuente: `docs/producto.md` §4.3 y §5.6.

## Requirements

### Requirement: Presentación del barbero
The barber profile SHALL show photo, name, rank, average rating, completed cuts count and chair number; rating and cuts count MUST be computed server-side.

#### Scenario: Ver perfil
- **WHEN** el barbero abre `/barbero/perfil`
- **THEN** el sistema MUST mostrar sus datos, rating y cortes realizados

#### Scenario: Edición de métricas
- **WHEN** un barbero intenta modificar su rating o sus cortes realizados
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Estado actual y pausa
The barber SHALL be able to start a 15-minute pause that is shown as their current status.

#### Scenario: Iniciar pausa
- **WHEN** el barbero pulsa "Pausa 15m"
- **THEN** su estado MUST cambiar a "En pausa" hasta que termine el tiempo o la finalice
- **AND** la pausa NO SHALL bloquear ni modificar citas existentes

### Requirement: Turno y jornada semanal
The barber SHALL choose a shift (morning 09:00–14:00 or afternoon 14:00–21:00) and working weekdays; Sunday is off by default.

#### Scenario: Cambiar turno
- **WHEN** el barbero cambia de turno o de días laborables
- **THEN** los bloques ofrecidos a los clientes MUST recalcularse
- **AND** las citas confirmadas fuera de la nueva jornada MUST conservarse y mostrarse como aviso al barbero

### Requirement: Mis especialidades
The profile SHALL list the services the barber offers with their own price and duration, with access to edit them as defined in the `catalogo` spec.

#### Scenario: Ver especialidades
- **WHEN** el barbero abre su perfil
- **THEN** el sistema MUST listar sus servicios activos con precio en Bs y duración

### Requirement: Preferencias de sillón
The barber SHALL be able to set chair preferences (music, courtesy offered), shown informationally.

#### Scenario: Guardar preferencias
- **WHEN** el barbero edita la música o la cortesía
- **THEN** el sistema MUST guardar el cambio en su perfil

### Requirement: Alertas de clientes VIP
The barber SHALL be able to enable or disable sound alerts when a scheduled client arrives.

#### Scenario: Preferencia de alertas
- **WHEN** el barbero cambia el toggle de alertas
- **THEN** el sistema MUST guardar la preferencia
- **AND** el comportamiento de la alerta MUST definirse junto con la llegada del cliente (pendiente)
