import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    title: "Разговор",
    text: "Выясняем, чем вы торгуете, какой у вас налоговый режим и что уже есть на точке.",
  },
  {
    title: "Предложение",
    text: "Собираем комплект: касса, накопитель, программа, подпись. Только то, что действительно нужно.",
  },
  {
    title: "Запуск",
    text: "Поставляем оборудование, регистрируем кассу в ФНС, подключаем ОФД, настраиваем 1С и рабочие места.",
  },
  {
    title: "Сопровождение",
    text: "Остаёмся рядом после запуска: поддержка, замена накопителя, обновления, ремонт, перерегистрация.",
  },
];

/** Этапы работы — линией с отметками, а не карточками. */
export function Process() {
  return (
    <section id="process" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow">Как мы работаем</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              От звонка до первого чека — <span className="text-hl">четыре шага</span>
            </h2>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* общая линия под отметками — только в один ряд */}
          <span className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-accent via-accent/50 to-transparent lg:block" />

          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 110} as="li" className="relative">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-ink-950 font-display text-xl font-semibold italic text-accent-soft shadow-[0_0_0_6px_var(--color-ink-950)]">
                {i + 1}
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
