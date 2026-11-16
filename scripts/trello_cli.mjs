import fs from 'fs';
import path from 'path';

// Cargar variables de .env
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
const token = process.env.TRELLO_TOKEN || env.TRELLO_TOKEN;
const boardId = process.env.TRELLO_BOARD_ID || env.TRELLO_BOARD_ID;

if (!key || !token || !boardId) {
  console.error("Faltan variables en .env (TRELLO_API_KEY, TRELLO_TOKEN, TRELLO_BOARD_ID).");
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

async function getLists() {
  return await req(`/boards/${boardId}/lists`);
}

async function listCards() {
  const lists = await getLists();
  console.log("\n📋 ESTADO DEL TABLERO DE TRELLO: Grizzly Barber\n");
  for (const list of lists) {
    const cards = await req(`/lists/${list.id}/cards`);
    console.log(`=== ${list.name} (${cards.length}) ===`);
    if (cards.length === 0) {
      console.log("  (sin tarjetas)");
    } else {
      for (const card of cards) {
        console.log(`  • [${card.id.slice(-6)}] ${card.name}`);
      }
    }
    console.log("");
  }
}

async function moveCard(cardNameOrIdSubstring, targetListName) {
  const lists = await getLists();
  const targetList = lists.find(l => l.name.toLowerCase().includes(targetListName.toLowerCase()));
  if (!targetList) {
    console.error(`No se encontró la lista destino con nombre similar a '${targetListName}'`);
    return;
  }

  const allCards = await req(`/boards/${boardId}/cards`);
  const card = allCards.find(c => 
    c.id.endsWith(cardNameOrIdSubstring) || 
    c.name.toLowerCase().includes(cardNameOrIdSubstring.toLowerCase())
  );

  if (!card) {
    console.error(`No se encontró la tarjeta '${cardNameOrIdSubstring}'`);
    return;
  }

  await req(`/cards/${card.id}`, "PUT", { idList: targetList.id });
  console.log(`✅ Tarjeta '${card.name}' movida exitosamente a '${targetList.name}'`);
}

// Comandos CLI:
// node scripts/trello_cli.mjs list
// node scripts/trello_cli.mjs move <cardSearch> <listSearch>
const command = process.argv[2] || "list";

if (command === "list") {
  listCards().catch(e => console.error(e));
} else if (command === "move") {
  const cardSearch = process.argv[3];
  const listSearch = process.argv[4];
  if (!cardSearch || !listSearch) {
    console.error("Uso: node scripts/trello_cli.mjs move <nombre-o-id-tarjeta> <columna-destino>");
  } else {
    moveCard(cardSearch, listSearch).catch(e => console.error(e));
  }
}
