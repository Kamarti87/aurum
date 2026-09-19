import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RequestButton } from "@/components/site/RequestButton";
import { IconArrow, IconDoc, IconKey, IconShield, IconWrench } from "@/components/ui/Icons";

type Token = {
  id: string;
  image: { src: string; width: number; height: number };
  scale: string;
  name: string;
  badge: string;
  summary: string;
  specs: string[];
};

/** Носители различаются не ёмкостью, а тем, где происходит подпись: у Lite — в
    программе на компьютере, у ЭЦП 3.0 — внутри самого устройства. Версия NFC Slim
    считает ту же криптографию, но её можно приложить к смартфону. */
const TOKENS: Token[] = [
  {
    id: "lite",
    image: { src: "/products/rutoken-lite.png", width: 895, height: 340 },
    scale: "max-h-[52%]",
    name: "Рутокен Lite",
    badge: "Базовый носитель",
    summary:
      "Носитель для хранения ключа и сертификата. Подпись вычисляет программа на компьютере, поэтому вместе с ним нужен криптопровайдер.",
    specs: [
      "Готов к работе сразу, драйверы ставить не нужно",
      "Совместим с программными криптопровайдерами",
      "Сертифицирован ФСТЭК России",
      "Подойдёт для получения подписи в УЦ ФНС",
    ],
  },
  {
    id: "ecp3",
    image: { src: "/products/rutoken-ecp3.png", width: 1239, height: 480 },
    scale: "max-h-[53%]",
    name: "Рутокен ЭЦП 3.0",
    badge: "Аппаратное СКЗИ",
    summary:
      "Вычисляет подпись внутри самого устройства — ключ не попадает в память компьютера.",
    specs: [
      "ГОСТ Р 34.10-2012 с ключом 256 и 512 бит",
      "Шифры Магма и Кузнечик, а также RSA и ECDSA",
      "Криптооперации без выгрузки ключа наружу",
      "Подойдёт для УЦ ФНС и для ЕГАИС",
    ],
  },
  {
    id: "ecp3-nfc",
    image: { src: "/products/rutoken-ecp3-nfc-slim.png", width: 1100, height: 745 },
    scale: "max-h-[54%]",
    name: "Рутокен ЭЦП 3.0 3100 NFC Slim",
    badge: "Подпись со смартфона",
    summary:
      "Тонкий корпус Slim с NFC: подписывать документы можно с компьютера и со смартфона, просто приложив носитель.",
    specs: [
      "Одобрен УЦ ФНС: торги, отчётность, ЭДО, госпорталы",
      "Ключ подписи хранится и используется внутри устройства",
      "Для работы по NFC сертификат выпускается как Активный ФКН",
      "Сертифицирован ФСБ и ФСТЭК России",
    ],
  },
];

const WORKS = [
  { Icon: IconKey, text: "Выпуск подписи для физического лица" },
  { Icon: IconDoc, text: "Машиночитаемая доверенность для сотрудника" },
  { Icon: IconShield, text: "Подпись для ЕГАИС и торговли алкоголем" },
  { Icon: IconWrench, text: "Настройка компьютера под работу с подписью" },
];

export function Ecp() {
  return (
    <section id="ecp" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb left-0 top-32 h-[460px] w-[460px] text-accent/14" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">Электронная подпись</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Электронная подпись <span className="text-hl">и всё для неё</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg text-mist-400">
                Чтобы подписывать документы, нужны сертификат, защищённый носитель и
                программа-криптопровайдер. Выпустим сертификат, подберём носитель и настроим
                компьютер — подпись заработает сразу.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <a href="#contact" className="btn btn-ghost">
              Подобрать носитель
              <IconArrow className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TOKENS.map((token, i) => (
            <Reveal key={token.id} delay={i * 100} className="h-full">
              <article className="card card-hover group flex h-full flex-col p-2.5">
                <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[18px] bg-[radial-gradient(70%_65%_at_50%_42%,#fffaf0_0%,#f3e8d2_60%,#eadbbd_100%)]">
                  <Image
                    src={token.image.src}
                    width={token.image.width}
                    height={token.image.height}
                    alt={`Носитель ${token.name}`}
                    sizes="(max-width: 1024px) 90vw, 520px"
                    className={`relative w-auto max-w-[88%] ${token.scale} object-contain drop-shadow-[0_20px_22px_rgba(74,54,18,0.28)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]`}
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                    {token.badge}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">{token.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{token.summary}</p>

                  <ul className="mt-5 space-y-2 border-t border-ink-700 pt-5">
                    {token.specs.map((spec) => (
                      <li key={spec} className="flex gap-3 text-sm text-mist-300">
                        <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                        {spec}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex-1" />
                  <RequestButton
                    model={token.name}
                    className="btn btn-ghost w-full group-hover:border-fg group-hover:bg-fg group-hover:text-ink-950"
                  >
                    Узнать цену
                  </RequestButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="card flex h-full flex-col p-7">
              <h3 className="text-lg font-bold">КриптоПро CSP</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mist-400">
                Программа, которая создаёт и проверяет подпись. Для базовых носителей она
                обязательна, поэтому её чаще берут в комплекте с Рутокеном.
              </p>
              <ul className="mt-6 space-y-2.5">
                <li className="flex gap-3 text-sm text-mist-300">
                  <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                  ГОСТ Р 34.10-2012 и 34.11-2012, шифрование по 34.12-2015
                </li>
                <li className="flex gap-3 text-sm text-mist-300">
                  <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                  Windows, macOS, Linux, iOS и Android
                </li>
                <li className="flex gap-3 text-sm text-mist-300">
                  <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                  Лицензия приобретается отдельно; есть пробный период 90 дней
                </li>
              </ul>
              <div className="mt-7 flex-1" />
              <RequestButton model="КриптоПро CSP">Узнать цену</RequestButton>
            </div>
          </Reveal>

          <Reveal delay={100} className="h-full">
            <div className="card flex h-full flex-col p-7">
              <h3 className="text-lg font-bold">Чем поможем</h3>
              <ul className="mt-6 space-y-4">
                {WORKS.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink-600 bg-ink-850 text-mist-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="pt-2 text-[15px] leading-snug text-mist-300">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
