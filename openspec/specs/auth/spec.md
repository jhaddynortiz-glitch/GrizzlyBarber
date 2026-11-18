# auth Specification

## Purpose
Registro, inicio de sesión y control de acceso por rol (cliente, barbero) con Firebase Auth. Fuente: `docs/producto.md` §4.1, §5.1 y §7.

## Requirements

### Requirement: Registro con email y contraseña
The system SHALL allow a visitor to create a client account with full name, email, phone (+591) and password (minimum 8 characters), after accepting the terms of service.

#### Scenario: Registro exitoso
- **WHEN** el visitante completa nombre, email, celular y una contraseña de 8 o más caracteres, y acepta los términos
- **THEN** el sistema MUST crear la cuenta en Firebase Auth y el documento `users/{uid}` con `role: 'client'`
- **AND** MUST redirigir al Inicio del cliente

#### Scenario: Datos inválidos
- **WHEN** falta un campo obligatorio, el email es inválido o ya existe, o la contraseña tiene menos de 8 caracteres
- **THEN** el sistema MUST mostrar el error junto al campo y NO SHALL crear la cuenta

### Requirement: Inicio de sesión
The system SHALL allow users to sign in with email and password or with a Google account.

#### Scenario: Login con email
- **WHEN** el usuario ingresa credenciales válidas
- **THEN** el sistema MUST iniciar la sesión y redirigir según su rol

#### Scenario: Credenciales incorrectas
- **WHEN** el usuario ingresa un email o contraseña incorrectos
- **THEN** el sistema MUST mostrar un mensaje genérico sin indicar cuál de los dos es incorrecto

#### Scenario: Primer ingreso con Google
- **WHEN** un usuario entra con Google por primera vez
- **THEN** el sistema MUST crear `users/{uid}` con `role: 'client'`
- **AND** MUST pedir celular y aceptación de términos antes de permitir reservar

### Requirement: Recuperación de contraseña
The system SHALL let a user request a password reset email.

#### Scenario: Solicitud de restablecimiento
- **WHEN** el usuario ingresa su email en "¿Olvidaste tu clave?"
- **THEN** el sistema MUST enviar el correo de restablecimiento de Firebase Auth
- **AND** MUST mostrar el mismo mensaje exista o no la cuenta

### Requirement: Redirección y rutas por rol
The system SHALL route each user to the area of their role and MUST block access to routes of other roles.

#### Scenario: Redirección después del login
- **WHEN** inicia sesión un usuario con `role: 'barber'`
- **THEN** el sistema MUST redirigir a `/barbero/agenda`
- **WHEN** inicia sesión un usuario con `role: 'client'`
- **THEN** el sistema MUST redirigir a `/`

#### Scenario: Ruta protegida sin sesión
- **WHEN** un visitante sin sesión abre una ruta que la requiere
- **THEN** el sistema MUST redirigir a `/login` y volver a la ruta original después de iniciar sesión

### Requirement: Asignación de roles
The `role` field SHALL only be assigned server-side (Admin SDK script) and MUST NOT be writable by clients.

#### Scenario: Cliente intenta cambiar su rol
- **WHEN** un cliente intenta escribir el campo `role` de su documento
- **THEN** Firestore MUST rechazar la escritura

### Requirement: Cierre de sesión
The system SHALL let any signed-in user sign out from their profile.

#### Scenario: Cerrar sesión
- **WHEN** el usuario pulsa "Cerrar sesión"
- **THEN** el sistema MUST terminar la sesión y redirigir a `/login`
