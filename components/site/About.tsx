import { TokenArt } from "@/components/art/FiscalArt";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconDoc, IconShield, IconSpark, IconWrench } from "@/components/ui/Icons";

const VALUES = [
  {
    Icon: IconSpark,
    title: "Одно окно",
    text: "Касса, 1С и подписи в одной команде. Не нужно искать трёх подрядчиков.",
  },
  {
    Icon: IconDoc,
    title: "Официально",
    text: "Работаем по договору, закрывающие документы и отчётность в порядке.",
  },
  {
    Icon: IconWrench,
    title: "Под ключ",
    text: "Берём на себя настройку, регистрацию и обучение сотрудников.",
  },
  {
    Icon: IconShield,
    title: "На связи",
    text: "Сопровождаем после запуска, а не исчезаем после продажи.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="card card-sheen relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0 opacity-25" />
            <div className="orb -right-20 -top-24 h-[380px] w-[380px] text-accent/16" />
          </div>

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
            <div>
              <Reveal>
                <span className="eyebrow">О компании</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                  Аурум
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 text-lg leading-relaxed text-mist-300">
                  Мы команда, которая создаёт современные цифровые решения для бизнеса и помогает
                  достигнуть новых высот.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-4 text-[15px] leading-relaxed text-mist-400">
                  Занимаемся тем, что обычно отнимает у предпринимателя больше всего нервов:
                  контрольно-кассовая техника и её регистрация, программы 1С и электронные подписи.
                  Разбираемся в требованиях 54-ФЗ, маркировке и ЕГАИС, чтобы вам не пришлось.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {VALUES.map(({ Icon, title, text }, i) => (
                  <Reveal key={title} delay={240 + i * 70}>
                    <div className="rounded-2xl border border-ink-700/70 bg-ink-950/50 p-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 text-base font-bold">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist-400">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={520}>
                <a href="#contact" className="btn btn-primary mt-10">
                  Ваши задачи — наше решение
                  <IconArrow className="h-4 w-4" />
                </a>
              </Reveal>
            </div>

            <Reveal delay={200} className="flex items-center">
              <div className="w-full">
                <TokenArt className="h-auto w-full animate-float-slow" />
                <div className="mt-6 rounded-2xl border border-ink-700/70 bg-ink-950/60 p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-mist-500">
                    Электронная подпись
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-300">
                    Выпускаем ЭЦП для физических лиц, оформляем машиночитаемые доверенности,
                    подписи для ЕГАИС и носители Рутокен. Настроим рабочее место, чтобы подпись
                    заработала сразу.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
