import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RequestButton } from "@/components/site/RequestButton";
import { IconArrow, IconCheck, IconDoc, IconShield } from "@/components/ui/Icons";

/**
 * Регулярное сопровождение 1С:ИТС. Раздел обязателен для партнёров со статусом
 * 1С:Франчайзинг; описание сервисов и уровней — по материалам its.1c.ru.
 */

const WHY = [
  {
    Icon: IconDoc,
    title: "Формы отчётности меняются",
    text: "Правила расчёта и бланки правит законодатель. Обновление приходит к сроку, и вы сдаёте отчёт по той форме, которая действует сейчас.",
  },
  {
    Icon: IconShield,
    title: "Версии ПРОФ обновляются по договору",
    text: "Пока договор действует — приходят новые релизы. Без него программа остаётся на прошлогодней версии со старыми формами.",
  },
  {
    Icon: IconCheck,
    title: "Есть кому задать вопрос",
    text: "Линия консультаций фирмы «1С» отвечает по учёту и по работе в программе. Это быстрее, чем искать ответ на форумах.",
  },
];

const PLANS = [
  {
    id: "techno",
    name: "1С:ИТС Техно",
    tagline: "Начальный уровень",
    summary:
      "Обновления и базовый доступ к порталу поддержки. Подходит, когда нужна просто актуальная легальная программа.",
    items: [
      "Обновления платформы и конфигураций 1С:Предприятие 8",
      "Базовый доступ к порталу its.1c.ru",
      "Льготная замена версий по схемам апгрейда",
    ],
  },
  {
    id: "prof",
    name: "1С:ИТС ПРОФ",
    tagline: "Выбирают чаще",
    summary:
      "Всё из уровня Техно и сверх того: консультации, полный портал и сервисы 1С. Обычный выбор компании с бухгалтером и сотрудниками.",
    items: [
      "Всё, что входит в Техно",
      "Линия консультаций фирмы «1С»",
      "Полный портал: справочники по учёту, ответы аудиторов, правовая поддержка",
      "Сервисы 1С, подключённые к договору",
    ],
    featured: true,
  },
];

const SERVICES = [
  {
    name: "1С-Отчётность",
    text: "Отчёты в ФНС, СФР и Росстат уходят прямо из программы — без выгрузок и сторонних приложений.",
  },
  {
    name: "1С-ЭДО",
    text: "Обмен электронными документами с контрагентами: накладные, счета-фактуры, УПД.",
  },
  {
    name: "1С:Контрагент",
    text: "Реквизиты подставляются по ИНН, а досье показывает, с кем вы собираетесь работать.",
  },
  {
    name: "1С:Облачный архив",
    text: "Копии базы уезжают в облако по расписанию. База переживёт и поломку диска, и грозу.",
  },
  {
    name: "1С:ДиректБанк",
    text: "Платёжки уходят в банк, а выписки приходят обратно прямо из 1С, без клиент-банка.",
  },
  {
    name: "1С:Линк",
    text: "Доступ к своей базе через интернет с любого устройства — сервер поднимать не нужно.",
  },
];

export function Its() {
  return (
    <section id="its" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">Сопровождение 1С</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                1С:ИТС — чтобы программа <span className="text-hl">не устаревала</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg text-mist-400">
                1С:ИТС — официальный договор информационно-технологического сопровождения
                программ 1С. По нему приходят обновления, работает линия консультаций фирмы «1С»
                и подключаются сервисы. Оформим договор, продлим его, поставим обновления
                и настроим сервисы в вашей базе.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {WHY.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={180 + i * 70}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent-soft">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold">{title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-mist-400">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200}>
            {/* эмблема 1С:ИТС — оригинал фирмы «1С», на светлой плашке */}
            <div className="rounded-2xl border border-ink-600/60 bg-white p-8">
              <Image
                src="/logo/1c-its.webp"
                width={640}
                height={487}
                alt="1С:ИТС"
                sizes="(max-width: 1024px) 60vw, 260px"
                className="mx-auto h-auto w-full max-w-[220px]"
              />
            </div>

            <div className="card mt-5 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                А если версия базовая
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-mist-400">
                Базовым версиям обновления доступны и без договора — их можно скачать самому.
                Договор им нужен ради сервисов: отчётности, ЭДО, облачного архива. Если в вашем
                случае он не нужен, мы так и скажем.
              </p>
            </div>
          </Reveal>
        </div>

        {/* уровни сопровождения */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className="h-full">
              <div
                className={`card flex h-full flex-col p-7 sm:p-8 ${
                  plan.featured ? "card-sheen border-accent/40" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                    {plan.tagline}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{plan.summary}</p>

                <ul className="mt-6 space-y-3 border-t border-ink-700 pt-5">
                  {plan.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-snug text-mist-300">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex-1" />
                <RequestButton
                  model={`Договор ${plan.name}`}
                  className="inline-flex items-center gap-2 self-start text-sm font-semibold text-fg transition-colors hover:text-accent-soft"
                >
                  Рассчитать стоимость
                  <IconArrow className="h-4 w-4" />
                </RequestButton>
              </div>
            </Reveal>
          ))}
        </div>

        {/* сервисы по договору */}
        <div className="mt-14">
          <Reveal>
            <h3 className="text-2xl font-semibold">Сервисы 1С, которые подключим по договору</h3>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-mist-400">
              Набор сервисов зависит от уровня договора и вашей конфигурации. Подберём нужное
              и настроим прямо в базе — отдельно ничего устанавливать не придётся.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <Reveal key={service.name} delay={i * 70} className="h-full">
                <div className="card card-hover flex h-full flex-col p-6">
                  <h4 className="text-base font-bold">{service.name}</h4>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-400">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-10 rounded-2xl border border-ink-600/60 bg-ink-850 px-6 py-6 text-sm leading-relaxed text-mist-400 lg:px-8">
            Цена договора зависит от уровня, срока и состава вашей конфигурации, поэтому считаем
            её под вас. Напишите, какие программы 1С у вас стоят, — посчитаем и подскажем, какого
            уровня достаточно. Подробности об 1С:ИТС и сервисах — на сайте фирмы «1С»:{" "}
            <a
              href="https://its.1c.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-soft underline-offset-4 transition-colors hover:text-fg hover:underline"
            >
              its.1c.ru
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
