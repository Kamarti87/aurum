/**
 * Показывает chat_id диалогов и групп, где есть бот MAX.
 *
 * Перед запуском напишите боту в мессенджере любое сообщение (или добавьте его
 * в группу и напишите туда) — иначе обновлений не будет и список окажется пустым.
 *
 *   node tools-max-chat-id.mjs <токен от @MasterBot>
 *
 * Найденный id кладём в переменную MAX_CHAT_ID рядом с MAX_BOT_TOKEN.
 */

const API = process.env.MAX_API_URL ?? "https://platform-api.max.ru";
const token = process.argv[2] ?? process.env.MAX_BOT_TOKEN;

if (!token) {
  console.error("Нужен токен: node tools-max-chat-id.mjs <токен> (или переменная MAX_BOT_TOKEN)");
  process.exit(1);
}

const response = await fetch(`${API}/updates?limit=100`, {
  headers: { Authorization: token },
});

if (!response.ok) {
  console.error(`MAX ответил ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}

const { updates = [] } = await response.json();

if (updates.length === 0) {
  console.log("Обновлений нет. Напишите боту в MAX любое сообщение и запустите снова.");
  process.exit(0);
}

const seen = new Map();

for (const update of updates) {
  const recipient = update.message?.recipient ?? {};
  const sender = update.message?.sender ?? update.user ?? {};
  const id = recipient.chat_id ?? update.chat_id;
  if (id === undefined) continue;

  const who = sender.name ?? sender.username ?? "—";
  if (!seen.has(id)) seen.set(id, { type: recipient.chat_type ?? "—", who, count: 0 });
  seen.get(id).count += 1;
}

if (seen.size === 0) {
  console.log("В обновлениях нет chat_id. Попробуйте написать боту ещё раз.");
  process.exit(0);
}

console.log("Найденные чаты:\n");
for (const [id, info] of seen) {
  console.log(`  chat_id: ${id}`);
  console.log(`  тип: ${info.type}, собеседник: ${info.who}, сообщений в выдаче: ${info.count}\n`);
}
