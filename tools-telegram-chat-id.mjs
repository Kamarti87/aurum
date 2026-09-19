/**
 * Показывает chat_id диалогов и групп, где есть бот Telegram.
 *
 * Перед запуском напишите боту любое сообщение (или добавьте его в группу и
 * напишите туда) — иначе getUpdates вернёт пустой список.
 *
 *   node tools-telegram-chat-id.mjs <токен от @BotFather>
 *
 * Найденный id кладём в переменную TELEGRAM_CHAT_ID рядом с TELEGRAM_BOT_TOKEN.
 * У групп id отрицательный — знак минуса part of id, его нужно сохранить.
 */

const token = process.argv[2] ?? process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error("Нужен токен: node tools-telegram-chat-id.mjs <токен> (или переменная TELEGRAM_BOT_TOKEN)");
  process.exit(1);
}

const response = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=100`);
const data = await response.json();

if (!data.ok) {
  console.error(`Telegram ответил: ${data.description ?? response.status}`);
  process.exit(1);
}

const seen = new Map();

for (const update of data.result ?? []) {
  const message = update.message ?? update.channel_post ?? update.my_chat_member;
  const chat = message?.chat;
  if (!chat) continue;

  if (!seen.has(chat.id)) {
    seen.set(chat.id, {
      type: chat.type,
      title: chat.title ?? ([chat.first_name, chat.last_name].filter(Boolean).join(" ") || "—"),
      count: 0,
    });
  }
  seen.get(chat.id).count += 1;
}

if (seen.size === 0) {
  console.log("Обновлений нет. Напишите боту в Telegram любое сообщение и запустите снова.");
  console.log("Если бот в группе и молчит — проверьте, что у него отключён privacy mode (@BotFather → /setprivacy).");
  process.exit(0);
}

console.log("Найденные чаты:\n");
for (const [id, info] of seen) {
  console.log(`  TELEGRAM_CHAT_ID=${id}`);
  console.log(`  тип: ${info.type}, название: ${info.title}, сообщений в выдаче: ${info.count}\n`);
}
