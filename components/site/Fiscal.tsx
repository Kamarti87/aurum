import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RequestButton } from "@/components/site/RequestButton";
import { IconArrow, IconChip, IconClock, IconDoc, IconWrench } from "@/components/ui/Icons";

const TERMS = [
  {
    months: "15",
    text: "Для общей системы налогообложения, торговли подакцизными товарами и сезонной работы.",
    model: "Фискальный накопитель на 15 месяцев",
  },
  {
    months: "36",
    text: "Для спецрежимов при оказании услуг: замена реже, визитов и бумажной работы меньше.",
    model: "Фискальный накопитель на 36 месяцев",
  },
];

const WORKS = [
  { Icon: IconChip, text: "Подбираем срок накопителя под налоговый режим и вид деятельности" },
  { Icon: IconWrench, text: "Меняем и активируем новый накопитель без остановки продаж" },
  { Icon: IconDoc, text: "Перерегистрируем кассу в ФНС и отправляем отчёты в ОФД" },
  { Icon: IconClock, text: "Заранее предупреждаем об окончании срока — без штрафов за просрочку" },
];

export function Fiscal() {
  return (
    <section id="fiscal" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="eyebrow">Фискальные накопители</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Срок накопителя — <span className="text-hl">под нашим контролем</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-xl text-lg text-mist-400">
                Накопитель подписывает и хранит каждый чек. Когда его срок заканчивается, касса
                больше не может законно пробивать чеки. Следим за сроками и меняем накопитель
                заранее.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="relative">
              <Image
                src="/products/fn-1-2.png"
                width={1200}
                height={459}
                alt="Фискальные накопители ФН-1.2 на 15 и 36 месяцев"
                sizes="(max-width: 1024px) 90vw, 480px"
                className="relative mx-auto h-auto w-full max-w-md drop-shadow-[0_20px_22px_rgba(74,54,18,0.28)]"
              />
              <p className="mt-4 text-center text-sm text-mist-500">
                ФН-1.2 · поддержка ФФД 1.2 и маркировки
              </p>
            </div>
          </Reveal>
        </div>

        {/* два срока — крупными цифрами */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {TERMS.map((term, i) => (
            <Reveal key={term.months} delay={i * 100} className="h-full">
              <div className="card card-hover group flex h-full flex-col gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
                <p className="shrink-0 font-display leading-none text-fg">
                  <span className="text-7xl font-semibold sm:text-8xl">{term.months}</span>
                  <span className="mt-2 block text-sm font-sans uppercase tracking-[0.16em] text-mist-500">
                    месяцев
                  </span>
                </p>
                <div className="flex flex-1 flex-col sm:border-l sm:border-ink-700 sm:pl-7">
                  <p className="text-[15px] leading-relaxed text-mist-300">{term.text}</p>
                  <RequestButton
                    model={term.model}
                    className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-fg transition-colors hover:text-accent-soft"
                  >
                    Узнать цену
                    <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </RequestButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WORKS.map(({ Icon, text }, i) => (
            <Reveal key={text} delay={200 + i * 70} as="li">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12 text-accent-soft">
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[15px] leading-snug text-mist-300">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
