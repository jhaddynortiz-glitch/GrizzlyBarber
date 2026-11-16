# Plataforma Base: Grizzly Barber

Especificación fundacional de la arquitectura, servicios en la nube y modelo de gobernanza para la plataforma web **Grizzly barber**.

## Purpose
Establecer los cimientos técnicos de la plataforma de reservas y administración de Grizzly Barber utilizando Firebase Cloud Firestore, Firebase Hosting y metodología Spec-Driven Development (SDD).

## Requirements

### Requirement: Gobernanza y Spec-Driven Development
The development process SHALL be strictly governed by OpenSpec and Trello cards.

#### Scenario: Introducción de nuevo componente o módulo
- **Given** un requerimiento funcional o técnico nuevo
- **When** se planifica su desarrollo
- **Then** el agente o desarrollador MUST crear una propuesta OpenSpec (`/opsx-propose`) basada en una tarjeta de Trello
- **And** NO SHALL escribir código de implementación hasta que la especificación y diseño estén aprobados.

#### Scenario: Correcciones menores y hotfixes
- **Given** un error tipográfico o un ajuste de espaciado visual de 1 a 3 líneas
- **When** se requiera una solución urgente
- **Then** se permite el ajuste directo sin propuesta formal siempre que no altere la arquitectura ni cree nuevas entidades.

### Requirement: Almacenamiento y Base de Datos (Firestore)
The platform SHALL persist all application data in Firebase Cloud Firestore.

#### Scenario: Estructura de colecciones núcleo
- **Given** la plataforma en ejecución
- **Then** Firestore MUST alojar las colecciones `users`, `services`, `barbers`, `appointments`, y `business_config`
- **And** las citas (`appointments`) MUST incluir los identificadores de cliente, barbero, servicio, fecha y hora de inicio/fin.

### Requirement: Despliegue y Alojamiento (Firebase Hosting)
The web application SHALL be deployed to Firebase Hosting.

#### Scenario: Acceso de usuarios
- **Given** el usuario accediendo a la URL de producción o staging
- **When** navegue a cualquier ruta de la aplicación web
- **Then** Firebase Hosting MUST servir la aplicación SPA redirigiendo las peticiones a `index.html` bajo HTTPS global.
