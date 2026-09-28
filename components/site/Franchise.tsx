import Image from "next/image";
import { LEGAL } from "@/components/site/contacts";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow } from "@/components/ui/Icons";

/**
 * Статус партнёра фирмы «1С». Раздел обязателен для сайта франчайзи: нужен
 * логотип 1С:Франчайзинг, соразмерный собственному, и текст о статусе.
 * Логотип — оригинал с static.1c.ru, перерисовывать его нельзя.
 */

const POINTS = [
  "Лицензии приходят напрямую от фирмы «1С», с официальными документами",
  "Обновления и новые релизы — легально, по договору 1С:ИТС",
  "Оформляем и продлеваем сопровождение, подключаем сервисы 1С",
  "Работаем по договору, закрывающие документы отдаём в бухгалтерию",
];

export function Franchise() {
  return (
    <section id="franchise" className="relative scroll-mt-28 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="card card-sheen grid gap-10 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-14 lg:p-12">
          {/* знак «1С» на светлой плашке — как требует гайдлайн фирмы «1С» */}
          <Reveal>
            <div className="rounded-2xl border border-ink-600/60 bg-white p-8">
              <Image
                src="/logo/1c-franchise.webp"
                width={640}
                height={383}
                alt="1С:Франчайзинг"
                sizes="(max-width: 1024px) 70vw, 300px"
                className="mx-auto h-auto w-full max-w-[260px]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <span className="eyebrow">Партнёр фирмы «1С»</span>
            </Reveal>
            <Reveal delay={140}>
              <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                Официальный статус <span className="text-hl">1С:Франчайзинг</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 text-[15px] leading-relaxed text-mist-400">
                Аурум входит в партнёрскую сеть фирмы «1С». Статус 1С:Франчайзинг присваивают
                после аттестации, и для вас он означает простую вещь: программы, обновления
                и сопровождение вы получаете официально, а не через посредников.
              </p>
            </Reveal>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {POINTS.map((point, i) => (
                <Reveal key={point} delay={240 + i * 60} as="li">
                  <span className="flex gap-3 text-[15px] leading-snug text-mist-300">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                    {point}
                  </span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={480}>
              <div className="mt-8 flex flex-col gap-5 border-t border-ink-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-mist-500">ИНН</dt>
                    <dd className="text-mist-300">{LEGAL.inn}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-mist-500">ОГРНИП</dt>
                    <dd className="text-mist-300">{LEGAL.ogrnip}</dd>
                  </div>
                </dl>
                <a
                  href="#its"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-fg transition-colors hover:text-accent-soft"
                >
                  Про сопровождение 1С:ИТС
                  <IconArrow className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
