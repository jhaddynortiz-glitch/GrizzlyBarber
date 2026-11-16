import fs from 'fs';
import path from 'path';

const envLines = fs.readFileSync('.env', 'utf8').split('\n');
const env = {};
for (const line of envLines) {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
}

const key = env.TRELLO_API_KEY;
const token = env.TRELLO_TOKEN;
const boardId = env.TRELLO_BOARD_ID;

const baseUrl = 'https://api.trello.com/1';

async function req(endpoint, method = 'GET', body = null) {
  const url = new URL(`${baseUrl}${endpoint}`);
  url.searchParams.set('key', key);
  url.searchParams.set('token', token);
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url.toString(), opts);
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return await res.json();
}

async function reorganize() {
  console.log('🔄 Reorganizando listas de Trello...');
  const oldLists = await req(`/boards/${boardId}/lists`);

  // 1. Crear las 4 listas solicitadas
  const targetNames = [
    'Tareas pendientes',
    'QA',
    'hecho(Done)',
    'Descartado'
  ];

  const newLists = {};
  let pos = 1000;
  for (const name of targetNames) {
    const list = await req(`/boards/${boardId}/lists`, 'POST', { name, pos });
    newLists[name] = list.id;
    pos += 1000;
  }
  console.log('✅ Nuevas listas creadas:', targetNames);

  // 2. Mover tarjetas existentes a las nuevas listas
  for (const oldList of oldLists) {
    const cards = await req(`/lists/${oldList.id}/cards`);
    for (const card of cards) {
      if (oldList.name.toLowerCase().includes('done')) {
        await req(`/cards/${card.id}`, 'PUT', { idList: newLists['hecho(Done)'] });
      } else {
        await req(`/cards/${card.id}`, 'PUT', { idList: newLists['Tareas pendientes'] });
      }
    }
    // Archivar lista vieja
    await req(`/lists/${oldList.id}/closed`, 'PUT', { value: true });
  }

  // 3. Crear las tareas detalladas para el proyecto en "Tareas pendientes"
  console.log('📌 Agregando tareas detalladas del proyecto en "Tareas pendientes"...');

  const tasksToCreate = [
    {
      name: '[feat] inicializar-proyecto-react-vite-tailwind',
      desc: `**Objetivo:** Crear el andamiaje del frontend web con React 18+/19, Vite, TypeScript y Tailwind CSS configurado con la paleta de colores de Grizzly Barber (carbón y ámbar vintage).

**Criterios de Aceptación:**
- Proyecto compila con \`npm run build\` sin errores de tipos.
- Configuración de Tailwind CSS con fuentes y colores del branding.
- Estructura limpia de carpetas (\`src/components\`, \`src/services\`, \`src/types\`).
- Integración de Lucide Icons.`
    },
    {
      name: '[feat] conexion-firebase-firestore',
      desc: `**Objetivo:** Configurar el SDK de Firebase en el frontend y centralizar el cliente de Firestore y autenticación.

**Criterios de Aceptación:**
- Archivo \`src/config/firebase.ts\` exportando las instancias de Firebase App y Firestore.
- Variables de entorno en \`.env\` documentadas en \`.env.example\`.
- Verificación de conexión a Firestore.`
    },
    {
      name: '[feat] catalogo-servicios',
      desc: `**Objetivo:** Permitir a los clientes visualizar el catálogo de servicios de barbería con precios, tiempos de duración y categorías.

**Criterios de Aceptación:**
- Colección Firestore \`services\` tipada en TypeScript.
- Servicio \`catalogService.ts\` con métodos para listar servicios activos.
- Componente de UI responsivo (Mobile-First) con tarjetas de servicio, precio y duración.`
    },
    {
      name: '[feat] perfiles-barberos-disponibilidad',
      desc: `**Objetivo:** Mostrar los barberos del equipo, su foto, bio, especialidades y horarios de atención semanal.

**Criterios de Aceptación:**
- Colección Firestore \`barbers\` con esquema de horarios por día de la semana.
- Servicio \`barberService.ts\` para consultar barberos activos y sus franjas horarias.
- Selector visual de barbero con avatar y especialidad.`
    },
    {
      name: '[booking] selector-fecha-hora-citas',
      desc: `**Objetivo:** Permitir al cliente elegir una fecha en el calendario y ver las franjas horarias disponibles según el horario del barbero seleccionado.

**Criterios de Aceptación:**
- Calendario interactivo optimizado para móviles.
- Generación dinámica de slots de tiempo (ej. cada 30 o 45 min) basados en la duración del servicio.
- Filtrado de horarios ya ocupados consultando la colección \`appointments\`.`
    },
    {
      name: '[booking] formulario-cliente-confirmacion',
      desc: `**Objetivo:** Recoger los datos del cliente (nombre, teléfono, notas) y registrar la cita en Firestore.

**Criterios de Aceptación:**
- Validación de formulario con React Hook Form y Zod.
- Escritura en Firestore en la colección \`appointments\` con estado \`pending\` o \`confirmed\`.
- Manejo de carga (loading) y mensaje de éxito.`
    },
    {
      name: '[booking] confirmacion-reserva-whatsapp',
      desc: `**Objetivo:** Al confirmar la reserva, ofrecer un botón directo para enviar los datos de la cita por WhatsApp a la barbería.

**Criterios de Aceptación:**
- Generación de enlace \`https://wa.me/<telefono>?text=...\` con mensaje preformateado.
- Incluir en el mensaje: nombre del cliente, servicio, barbero, fecha y hora.`
    },
    {
      name: '[admin] panel-agenda-citas',
      desc: `**Objetivo:** Panel para que los barberos o el administrador puedan ver los turnos del día o semana y actualizar su estado.

**Criterios de Aceptación:**
- Vista de calendario o lista de citas del día con sincronización en tiempo real (\`onSnapshot\`).
- Botones para cambiar estado: \`confirmed\`, \`in_progress\`, \`completed\`, \`cancelled\`.
- Filtro por barbero y por fecha.`
    },
    {
      name: '[deploy] despliegue-firebase-hosting',
      desc: `**Objetivo:** Automatizar el proceso de build y despliegue del proyecto en Firebase Hosting.

**Criterios de Aceptación:**
- Script en \`package.json\` para build y deploy.
- Verificación del correcto funcionamiento de las rutas SPA bajo el dominio de Firebase Hosting.`
    }
  ];

  for (const task of tasksToCreate) {
    await req('/cards', 'POST', {
      idList: newLists['Tareas pendientes'],
      name: task.name,
      desc: task.desc,
      pos: 'bottom'
    });
  }

  console.log('\n🎉 ¡Tablero actualizado exitosamente con las 4 listas y las tareas del proyecto!');
}

reorganize().catch(err => {
  console.error('❌ Error al reorganizar listas:', err.message);
  process.exit(1);
});
