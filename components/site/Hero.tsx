import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconCash, IconCube, IconKey } from "@/components/ui/Icons";

const DIRECTIONS = [
  { Icon: IconCash, title: "Онлайн-кассы", text: "Подбор, поставка, регистрация в ФНС", href: "#devices" },
  { Icon: IconCube, title: "Программы 1С", text: "Лицензии, внедрение, сопровождение", href: "#onec" },
  { Icon: IconKey, title: "Электронная подпись", text: "Физлица, МЧД, ЕГАИС, Рутокен", href: "#ecp" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[74px] lg:pt-[114px]">
      {/* фон */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb -left-40 -top-40 h-[520px] w-[520px] text-accent/18" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* текст */}
          <div>
            <Reveal>
              <span className="eyebrow">Москва и Московская область</span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.7rem] font-semibold leading-[1.04] sm:text-6xl lg:text-[4.3rem]">
                Касса, учёт и подпись — <span className="text-hl">в одних руках</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist-400">
                Подключаем бизнес к онлайн-кассам, программам 1С и электронной подписи.
                Подберём оборудование, зарегистрируем его в налоговой и останемся на связи после
                запуска — искать трёх разных подрядчиков не придётся.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="btn btn-primary">
                  Обсудить задачу
                  <IconArrow className="h-4 w-4" />
                </a>
                <a href="#devices" className="btn btn-ghost">
                  Каталог касс
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-5 text-sm text-mist-500">
                Перезвоним в рабочее время и предложим решение под ваш формат торговли.
              </p>
            </Reveal>
          </div>

          {/* сцена с техникой */}
          <Reveal delay={200} className="relative">
            <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[600px] overflow-hidden rounded-[32px] border border-ink-600/60 bg-[radial-gradient(80%_70%_at_62%_38%,#fffaf0_0%,#f1e3c2_48%,#e2c98f_100%)] shadow-[0_40px_80px_-50px_rgba(90,64,20,0.7)]">
              <div className="bg-grid absolute inset-0 opacity-40" />
              <div className="absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-accent-deep/40 to-transparent" />

              {/* флагман */}
              <div className="absolute right-[-4%] top-[44%] w-[86%] -translate-y-1/2 animate-float-slow">
                <Image
                  src="/products/sigma-10.webp"
                  width={698}
                  height={514}
                  alt="Смарт-терминал АТОЛ Sigma 10"
                  priority
                  sizes="(max-width: 1024px) 86vw, 520px"
                  className="h-auto w-full drop-shadow-[0_34px_40px_rgba(74,54,18,0.35)]"
                />
              </div>

              {/* компактная модель на переднем плане */}
              <div className="absolute bottom-[5%] left-[3%] w-[46%] animate-float-soft">
                <Image
                  src="/products/sigma-7.webp"
                  width={589}
                  height={458}
                  alt="Смарт-терминал АТОЛ Sigma 7"
                  sizes="(max-width: 1024px) 46vw, 280px"
                  className="h-auto w-full drop-shadow-[0_26px_30px_rgba(74,54,18,0.38)]"
                />
              </div>

              {/* плашка */}
              <div className="absolute left-5 top-5 rounded-full border border-ink-600/70 bg-ink-800/85 px-4 py-2 text-xs font-semibold text-mist-300 backdrop-blur sm:left-6 sm:top-6">
                Регистрацию в ФНС берём на себя
              </div>
            </div>
          </Reveal>
        </div>

        {/* направления */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3 lg:mt-16">
          {DIRECTIONS.map(({ Icon, title, text, href }, i) => (
            <Reveal key={title} delay={320 + i * 80} className="h-full">
              <a href={href} className="card card-hover group flex h-full items-center gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/12 text-accent-soft">
                  <Icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold text-fg">{title}</span>
                  <span className="mt-0.5 block text-sm text-mist-400">{text}</span>
                </span>
                <IconArrow className="ml-auto h-4 w-4 shrink-0 text-mist-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-soft" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
