import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE_HOST } from "@/components/site/contacts";

type Lead = {
  name?: string;
  phone?: string;
  topic?: string;
  comment?: string;
  consent?: string;
  ref_x?: string; // ловушка для ботов
  company_website?: string; // прежнее имя ловушки, осталось для кэшированных страниц
};

/** База Bot API мессенджера MAX. Вынесена в переменную: адрес уже менялся
 *  (был botapi.max.ru), чтобы переезд не требовал правки кода.
 *  Хостов у API несколько, и они не равнозначны: platform-api2 с боевого
 *  сервера не открывается вовсе, поэтому по умолчанию — platform-api. */
const MAX_API = process.env.MAX_API_URL ?? "https://platform-api.max.ru";

/** Заявка не должна ждать мессенджер или почту дольше нескольких секунд. */
const TIMEOUT = 7000;

type Channel = { name: string; send: (text: string, subject: string) => Promise<void> };

/** Ответ не ok — превращаем в ошибку с текстом, чтобы причина попала в журнал. */
async function expectOk(response: Response) {
  if (!response.ok) {
    throw new Error(`${response.status} ${(await response.text()).slice(0, 200)}`);
  }
}

/**
 * Куда отправлять заявки. Канал появляется в списке, только если заданы его
 * переменные окружения, — недонастроенный канал просто не участвует.
 *
 * MAX: токен выдаёт партнёрский кабинет, chat_id — `node tools-max-chat-id.mjs`.
 * Telegram: токен выдаёт @BotFather, chat_id — `node tools-telegram-chat-id.mjs`.
 * Почта: SMTP_USER и SMTP_PASSWORD — ящик отправителя и пароль приложения,
 * MAIL_TO — получатель, можно несколько адресов через запятую.
 */
function channels(): Channel[] {
  const list: Channel[] = [];
  const max = { token: process.env.MAX_BOT_TOKEN, chat: process.env.MAX_CHAT_ID };
  const tg = { token: process.env.TELEGRAM_BOT_TOKEN, chat: process.env.TELEGRAM_CHAT_ID };
  const mail = {
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    to: process.env.MAIL_TO,
    host: process.env.SMTP_HOST ?? "smtp.yandex.ru",
    port: Number(process.env.SMTP_PORT ?? 465),
  };

  if (max.token && max.chat) {
    list.push({
      name: "max",
      send: async (text) =>
        expectOk(
          await fetch(`${MAX_API}/messages?chat_id=${encodeURIComponent(max.chat!)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: max.token! },
            body: JSON.stringify({ text }),
            signal: AbortSignal.timeout(TIMEOUT),
          })
        ),
    });
  }

  if (tg.token && tg.chat) {
    list.push({
      name: "telegram",
      send: async (text) =>
        expectOk(
          await fetch(`https://api.telegram.org/bot${tg.token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: tg.chat, text, disable_web_page_preview: true }),
            signal: AbortSignal.timeout(TIMEOUT),
          })
        ),
    });
  }

  if (mail.user && mail.password && mail.to) {
    list.push({
      name: "почта",
      send: async (text, subject) => {
        const transport = nodemailer.createTransport({
          host: mail.host,
          port: mail.port,
          secure: mail.port === 465,
          auth: { user: mail.user!, pass: mail.password! },
          connectionTimeout: TIMEOUT,
          greetingTimeout: TIMEOUT,
          socketTimeout: TIMEOUT,
        });

        await transport.sendMail({
          from: `"Заявки с сайта" <${mail.user}>`,
          to: mail.to,
          replyTo: mail.to,
          subject,
          text,
        });
      },
    });
  }

  return list;
}

/**
 * Рассылка по всем настроенным каналам разом: они независимы, и падение
 * одного не мешает другому доставить заявку.
 */
async function deliver(text: string, subject: string): Promise<Record<string, string>> {
  const targets = channels();
  if (targets.length === 0) return { delivery: "skipped" };

  const results = await Promise.all(
    targets.map(async ({ name, send }) => {
      try {
        await send(text, subject);
        return [name, "sent"] as const;
      } catch (error) {
        console.error(
          `[lead] ${name} не принял заявку:`,
          error instanceof Error ? error.message : error
        );
        return [name, "failed"] as const;
      }
    })
  );

  return Object.fromEntries(results);
}

function format(lead: { name: string; phone: string; topic: string; comment: string }) {
  const when = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  const lines = [`Заявка с сайта ${SITE_HOST}`, "", `Имя: ${lead.name}`, `Телефон: ${lead.phone}`];

  if (lead.topic) lines.push(`Интересует: ${lead.topic}`);
  if (lead.comment) lines.push("", `Комментарий: ${lead.comment}`);
  lines.push("", `Отправлено: ${when} (МСК)`);

  return lines.join("\n");
}

/**
 * Приём заявок с сайта: проверяем поля, рассылаем по каналам и пишем в
 * журнал. Журнал остаётся даже при успешной отправке — это запасная копия.
 */
export async function POST(request: Request) {
  let lead: Lead;

  try {
    lead = (await request.json()) as Lead;
  } catch {
    console.warn("[lead] отклонена: тело запроса не разобрано как JSON");
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Заполнено скрытое поле. Раньше такую заявку молча выбрасывали, но ловушку
  // срабатывало и автозаполнение браузера — терялись живые заявки. Теперь
  // доставляем с пометкой: разобраться с подозрительной заявкой дешевле, чем
  // потерять настоящую.
  const suspicious = Boolean(lead.ref_x || lead.company_website);

  const name = lead.name?.trim() ?? "";
  const phone = lead.phone?.trim() ?? "";

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
    console.warn("[lead] отклонена: имя или телефон не прошли проверку", {
      name: name.slice(0, 60),
      phone: phone.slice(0, 30),
    });
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const topic = lead.topic?.trim() ?? "";
  const comment = lead.comment?.trim().slice(0, 1000) ?? "";
  const text = format({ name, phone, topic, comment });
  const subject = `${suspicious ? "Похоже на спам — з" : "З"}аявка с сайта: ${name}, ${phone}`;
  const delivery = await deliver(
    suspicious ? `Похоже на спам: сработала скрытая ловушка.\n\n${text}` : text,
    subject
  );

  console.info("[lead]", {
    at: new Date().toISOString(),
    name,
    phone,
    topic,
    comment,
    ...(suspicious ? { ловушка: "сработала" } : {}),
    ...delivery,
  });

  return NextResponse.json({ ok: true });
}
