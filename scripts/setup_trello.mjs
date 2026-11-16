import fs from 'fs';
import path from 'path';

// Cargar .env
const envPath = path.resolve(process.cwd(), '.env');
const env = {};
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) env[key.trim()] = vals.join('=').trim();
  }
}

const key = process.env.TRELLO_API_KEY || env.TRELLO_API_KEY;
const token = process.env.TRELLO_TOKEN || env.TRELLO_TOKEN || process.argv[2];

if (!key || !token) {
  console.error("Falta TRELLO_API_KEY o TRELLO_TOKEN.");
  process.exit(1);
}

const baseUrl = "https://api.trello.com/1";

async function req(endpoint, method = "GET", body = null) {
  const url = new URL(`${baseUrl}${endpoint}`);
  url.searchParams.set("key", key);
  url.searchParams.set("token", token);
  
  const opts = { method, headers: { "Content-Type": "application/json" } };
  if (body) opts.body = JSON.stringify(body);
  
  const res = await fetch(url.toString(), opts);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Error ${res.status}: ${errText}`);
  }
  return await res.json();
}

async function run() {
  console.log("💈 Creando tablero en Trello para 'Grizzly Barber'...");

  // 1. Crear el Tablero
  const board = await req("/boards/", "POST", {
    name: "Grizzly Barber",
    defaultLists: false,
    desc: "Tablero oficial de desarrollo y gobernanza SDD (OpenSpec) para Grizzly Barber.",
    prefs_permissionLevel: "private"
  });

  console.log(`✅ Tablero creado: ${board.name} (ID: ${board.id})`);
  console.log(`🔗 URL del Tablero: ${board.url}`);

  // 2. Crear las Listas / Columnas
  const columnNames = [
    "📋 Backlog / Ideas",
    "📝 Por Especificar (OpenSpec Propose)",
    "🔍 Revisión de Spec",
    "🚀 En Desarrollo (OpenSpec Apply)",
    "📦 Por Archivar (OpenSpec Archive)",
    "🏁 Done / En Producción"
  ];

  const lists = {};
  let pos = 1000;
  for (const colName of columnNames) {
    const list = await req(`/boards/${board.id}/lists`, "POST", {
      name: colName,
      pos: pos
    });
    lists[colName] = list.id;
    pos += 1000;
  }
  console.log("✅ Columnas creadas con éxito.");

  // 3. Crear tarjetas iniciales
  console.log("📌 Agregando tarjetas iniciales...");

  // Tarjeta en Done
  await req("/cards", "POST", {
    idList: lists["🏁 Done / En Producción"],
    name: "[setup] configuracion-inicial-openspec",
    desc: "Configuración inicial de OpenSpec, habilidades /opsx-*, AGENTS.md, integración con Trello y reglas de arquitectura con Firebase.",
    pos: "top"
  });

  // Tarjeta lista para proponer
  await req("/cards", "POST", {
    idList: lists["📝 Por Especificar (OpenSpec Propose)"],
    name: "[feat] scaffold-react-vite-tailwind",
    desc: "**Objetivo:** Inicializar la aplicación web base con React + Vite + TypeScript + Tailwind CSS y configuración de Firebase SDK.\n\n**Criterios de Aceptación:**\n- Proyecto compilando sin errores\n- Tailwind CSS configurado con la paleta de colores de Grizzly Barber\n- Firebase configurado para Firestore y Hosting",
    pos: "top"
  });

  // Tarjetas en Backlog
  const backlogCards = [
    {
      name: "[feat] catalogo-servicios",
      desc: "**Objetivo:** Como cliente quiero ver los servicios de corte y barba con sus precios y duración para elegir el que necesito."
    },
    {
      name: "[feat] perfiles-barberos-agenda",
      desc: "**Objetivo:** Como cliente quiero ver los barberos disponibles, su foto, especialidad y sus días/horarios de trabajo."
    },
    {
      name: "[booking] selector-turnos-reserva",
      desc: "**Objetivo:** Como cliente quiero seleccionar fecha, barbero y servicio para agendar mi cita en 3 pasos."
    },
    {
      name: "[admin] dashboard-agenda-citas",
      desc: "**Objetivo:** Como administrador/barbero quiero ver el calendario diario de turnos confirmados y cambiar su estado."
    }
  ];

  for (const card of backlogCards) {
    await req("/cards", "POST", {
      idList: lists["📋 Backlog / Ideas"],
      name: card.name,
      desc: card.desc,
      pos: "bottom"
    });
  }

  // Guardar boardId en .env
  fs.appendFileSync(envPath, `\nTRELLO_BOARD_ID=${board.id}\nTRELLO_BOARD_URL=${board.url}\n`);

  console.log("\n🎉 ¡Tablero de Trello completamente configurado y enlazado!");
  console.log(`👉 Accede aquí: ${board.url}`);
}

run().catch(err => {
  console.error("❌ Falló la configuración de Trello:", err.message);
  process.exit(1);
});
