"use client";

import { useEffect, useRef, useState } from "react";
import { MODEL_EVENT } from "@/components/site/RequestButton";
import { GOAL_LEAD, reachGoal } from "@/components/site/Metrika";
import { ADDRESS, EMAIL, HOURS, MAX, PHONES } from "@/components/site/contacts";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconArrow,
  IconCheck,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconChat,
} from "@/components/ui/Icons";

const TOPICS = [
  "Онлайн-касса (ККТ)",
  "Фискальный накопитель",
  "1С: продажа и внедрение",
  "ЭЦП / МЧД / ЕГАИС",
  "Другое",
];

/**
 * Заявки уходят по каналам из переменных окружения (MAX, почта — см. README)
 * и дублируются в журнал сервера. Пока каналы не настроены, заявка остаётся
 * только в журнале. Если доставку придётся остановить — поставить false,
 * тогда поля и кнопка блокируются, а вёрстка остаётся прежней.
 */
const FORM_ENABLED = true;

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [comment, setComment] = useState("");
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Клик по «Запросить условия» у конкретной модели подставляет её в форму.
  useEffect(() => {
    const onModel = (event: Event) => {
      const model = (event as CustomEvent<string>).detail;
      if (!model) return;
      // тема угадывается по названию: иначе заявка на программу уедет
      // менеджеру по кассам. Латинская «c» — на случай написания «1C»
      const lower = model.toLowerCase();
      setTopic(
        lower.includes("накопитель")
          ? TOPICS[1]
          : /^1[сc]/.test(lower)
            ? TOPICS[2]
            : /рутокен|криптопро|подпис/.test(lower)
              ? TOPICS[3]
              : TOPICS[0],
      );
      setComment(`Интересует: ${model}. `);
      window.setTimeout(() => {
        const el = commentRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        el.setSelectionRange(el.value.length, el.value.length);
      }, 600);
    };

    window.addEventListener(MODEL_EVENT, onModel);
    return () => window.removeEventListener(MODEL_EVENT, onModel);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("ok");
      reachGoal(GOAL_LEAD);
      form.reset();
      setComment("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="theme-dark relative isolate scroll-mt-28 overflow-hidden py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb left-1/4 top-0 h-[460px] w-[460px] text-accent/16" />
        <div className="orb right-1/4 bottom-0 h-[380px] w-[380px] text-accent/12" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* контакты — на широком экране справа, форма слева */}
          <div className="lg:order-2">
            <Reveal>
              <span className="eyebrow">Заявка</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Опишите задачу — <span className="text-hl">предложим решение</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg text-mist-400">
                Точная цена зависит от модели, комплектации и срока накопителя. Оставьте заявку —
                вернёмся с расчётом под ваш бизнес.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <ul className="mt-10 space-y-3">
                <li className="card p-5">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                      <IconPhone className="h-5 w-5" />
                    </span>
                    <span className="text-xs uppercase tracking-wider text-mist-500">
                      Телефоны
                    </span>
                  </div>
                  <div
                    className={`mt-4 grid gap-3 ${PHONES.length > 1 ? "sm:grid-cols-2" : ""}`}
                  >
                    {PHONES.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="rounded-xl border border-ink-700/70 bg-ink-950/50 px-4 py-3 transition-colors hover:border-ink-600 hover:bg-ink-850"
                      >
                        <span className="block text-[11px] uppercase tracking-wider text-mist-500">
                          {phone.label}
                        </span>
                        <span className="mt-1 block text-[17px] font-semibold text-fg">
                          {phone.display}
                        </span>
                      </a>
                    ))}
                  </div>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="card card-hover flex items-center gap-4 p-5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink-800 text-mist-300">
                      <IconMail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-mist-500">
                        Почта
                      </span>
                      <span className="block text-lg font-semibold text-fg">
                        {EMAIL}
                      </span>
                    </span>
                  </a>
                </li>
                {/* профиля в MAX пока нет — блок появится, как только в contacts.ts
                    будет ссылка на профиль вида max.ru/u/… */}
                {MAX.href && (
                  <li>
                    <a
                      href={MAX.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card card-hover flex items-center gap-4 p-5"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                        <IconChat className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider text-mist-500">
                          MAX
                        </span>
                        <span className="block text-lg font-semibold text-fg">
                          {MAX.display}
                        </span>
                      </span>
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-4 p-5 text-mist-400">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 text-mist-500">
                    <IconClock className="h-5 w-5" />
                  </span>
                  <span className="text-sm">
                    {HOURS.display}
                    <span className="mt-0.5 block text-mist-500">{HOURS.weekend}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 p-5 text-mist-400">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-700 text-mist-500">
                    <IconMapPin className="h-5 w-5" />
                  </span>
                  <a href="#map" className="text-sm transition-colors hover:text-fg">
                    {ADDRESS.city}, {ADDRESS.street}, {ADDRESS.office}
                    <span className="mt-0.5 block text-mist-500">Показать на карте</span>
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* форма */}
          <Reveal delay={160} className="lg:order-1">
            <div className="card card-sheen relative overflow-hidden p-7 sm:p-9">
              {status === "ok" ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ok/12 text-ok">
                    <IconCheck className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 text-2xl font-bold">Заявка отправлена</h3>
                  <p className="mt-3 max-w-sm text-mist-400">
                    Спасибо! Перезвоним в ближайшее рабочее время и предложим решение под вашу
                    задачу.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="btn btn-ghost mt-8"
                  >
                    Отправить ещё одну
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  <h3 className="text-2xl font-bold">Заявка на расчёт</h3>
                  <p className="mt-2 text-sm text-mist-500">
                    Достаточно имени и телефона — детали уточним при звонке.
                  </p>

                  {!FORM_ENABLED && (
                    <p className="mt-6 rounded-xl border border-ink-600 bg-ink-950/60 px-4 py-3.5 text-sm leading-relaxed text-mist-300">
                      <span className="font-semibold text-fg">Форма пока не работает.</span>{" "}
                      Мы её настраиваем. Позвоните или напишите на почту — ответим так же
                      быстро.
                    </p>
                  )}

                  <fieldset disabled={!FORM_ENABLED} className="contents">

                  <div className="mt-7 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="field-label" htmlFor="name">
                        Как к вам обращаться
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Иван"
                        className="field"
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="phone">
                        Телефон
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="field"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="field-label" htmlFor="topic">
                      Что интересует
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="field appearance-none"
                    >
                      {TOPICS.map((item) => (
                        <option key={item} value={item} className="bg-ink-900">
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-5">
                    <label className="field-label" htmlFor="comment">
                      Комментарий
                    </label>
                    <textarea
                      id="comment"
                      name="comment"
                      ref={commentRef}
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Чем торгуете, сколько точек и касс, что уже есть — любые подробности"
                      className="field resize-none"
                    />
                  </div>

                  {/*
                    Ловушка для ботов. Имя намеренно бессмысленное, а поле
                    скрыто через display:none: прежний вариант назывался
                    company_website и уезжал за край экрана — автозаполнение
                    браузера считало его настоящим и подставляло данные,
                    из-за чего живые заявки уходили в спам.
                  */}
                  <input
                    type="text"
                    name="ref_x"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-mist-500">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-950 accent-[var(--color-accent)]"
                    />
                    <span>
                      Согласен на обработку персональных данных для ответа на обращение
                    </span>
                  </label>

                  </fieldset>

                  <button
                    type="submit"
                    disabled={!FORM_ENABLED || status === "sending"}
                    className="btn btn-primary mt-7 w-full disabled:opacity-60"
                  >
                    {!FORM_ENABLED
                      ? "Отправка временно недоступна"
                      : status === "sending"
                        ? "Отправляем…"
                        : "Отправить заявку"}
                    {FORM_ENABLED && status !== "sending" && <IconArrow className="h-4 w-4" />}
                  </button>

                  {status === "error" && (
                    <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
