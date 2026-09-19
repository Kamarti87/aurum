import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

const SERVICES = [
  {
    n: "01",
    title: "Онлайн-кассы",
    tagline: "Подбор, регистрация, обслуживание",
    href: "#devices",
    points: [
      "Подберём модель под формат торговли и налоговый режим",
      "Зарегистрируем в ФНС и подключим к ОФД",
      "Заменим фискальный накопитель и перерегистрируем кассу",
      "Обслуживание, ремонт и техническая поддержка",
    ],
  },
  {
    n: "02",
    title: "Программы 1С",
    tagline: "Лицензии, внедрение, сопровождение",
    href: "#onec",
    points: [
      "Лицензии 1С в электронной поставке",
      "Внедрение и настройка под ваши процессы",
      "Обновления, доработки и сопровождение",
      "Связка 1С с кассой и торговым оборудованием",
    ],
  },
  {
    n: "03",
    title: "Электронная подпись",
    tagline: "Физлица, МЧД, ЕГАИС, Рутокен",
    href: "#ecp",
    points: [
      "Подпись для физических лиц",
      "Машиночитаемые доверенности (МЧД)",
      "Подписи для ЕГАИС",
      "Рутокен и настройка рабочего места",
      "КриптоПро CSP для создания и проверки подписи",
    ],
  },
];

/**
 * Услуги — нумерованным списком во всю ширину, а не тремя карточками в ряд:
 * так раздел читается как оглавление сайта и не повторяет altprime.ru.
 */
export function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <span className="eyebrow">Что мы делаем</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Три направления <span className="text-hl">одной командой</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-lg text-mist-400 lg:pb-1">
              Касса на прилавке, учёт в 1С и подпись для отчётности связаны между собой. Мы
              настраиваем их вместе, чтобы всё работало с первого дня.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 border-t border-ink-600/70">
          {SERVICES.map(({ n, title, tagline, href, points }, i) => (
            <Reveal key={n} delay={i * 90} as="li">
              <div className="group grid gap-6 border-b border-ink-600/70 py-9 transition-colors lg:grid-cols-[110px_1fr_1.35fr_auto] lg:items-start lg:gap-10 lg:py-11">
                <span className="font-display text-5xl font-medium italic leading-none text-accent transition-colors group-hover:text-accent-deep lg:text-6xl">
                  {n}
                </span>

                <div>
                  <h3 className="text-3xl font-semibold">{title}</h3>
                  <p className="mt-2 text-[15px] text-mist-500">{tagline}</p>
                </div>

                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {points.map((point) => (
                    <li key={point} className="flex gap-3 text-[15px] leading-snug text-mist-300">
                      <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  aria-label={`Подробнее: ${title}`}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-fg transition-all duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-ink-950"
                >
                  <IconArrow className="h-5 w-5" />
                </a>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
