import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RequestButton } from "@/components/site/RequestButton";
import { IconArrow } from "@/components/ui/Icons";

/** Дата, на которую действует прайс. Меняется вместе с ценами ниже. */
const PRICE_DATE = "1 января 2026 года";

/** Разряды разделяем сами, а не через toLocaleString: результат не должен
    зависеть от локали сервера, иначе разметка на клиенте разъедется. */
function money(value: number) {
  return `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`;
}

/** Коротко о платформе — что получает покупатель любой программы 1С. */
const PLATFORM = [
  "Работа вдвоём и большой командой — от одной базы до клиент-серверной",
  "Обмен данными между программами 1С и с сайтом или кассой",
  "Доступ к базе через интернет и с мобильных устройств",
  "Доработка под процессы компании без замены программы",
];

type Edition = { label: string; price: number };

type Line = {
  id: string;
  image: { src: string; width: number; height: number };
  /** Высота коробки в витрине. У всех снимков она разная не просто так: «Бухгалтерия»
      снята под углом, видна боковая грань, и при равной высоте коробка кажется мельче
      соседей. Числа подобраны так, чтобы площадь коробок на экране совпадала. */
  scale: string;
  name: string;
  badge: string;
  summary: string;
  editions: Edition[];
  fits: string;
};

const LINES: Line[] = [
  {
    id: "buh",
    image: { src: "/products/1c-buhgalteria.png", width: 509, height: 760 },
    scale: "max-h-[85%]",
    name: "1С:Бухгалтерия 8",
    badge: "Берут чаще всего",
    summary:
      "Бухгалтерский и налоговый учёт, отчётность на любой системе налогообложения. Одному бухгалтеру достаточно базовой версии; ПРОФ нужна для нескольких пользователей и доработок.",
    editions: [
      { label: "Базовая", price: 4900 },
      { label: "ПРОФ", price: 23000 },
      { label: "ПРОФ, комплект на 5 пользователей", price: 45500 },
      { label: "Для некоммерческих организаций, ПРОФ", price: 25300 },
      { label: "Для государственных учреждений, ПРОФ", price: 25400 },
    ],
    fits: "ИП и компании на любой системе налогообложения",
  },
  {
    id: "zup",
    image: { src: "/products/1c-zup.png", width: 449, height: 656 },
    scale: "max-h-[87%]",
    name: "1С:Зарплата и управление персоналом 8",
    badge: "Кадры и выплаты",
    summary:
      "Зарплата, отпускные, больничные и кадровые документы. Программа считает НДФЛ и страховые взносы и формирует отчётность по сотрудникам.",
    editions: [
      { label: "Базовая", price: 11100 },
      { label: "ПРОФ", price: 39700 },
    ],
    fits: "Компании с наёмными сотрудниками",
  },
  {
    id: "roznica",
    image: { src: "/products/1c-roznica.png", width: 486, height: 660 },
    scale: "max-h-[82%]",
    name: "1С:Розница 8",
    badge: "Для торговой точки",
    summary:
      "Учёт в магазине: поступление товара, остатки, цены и скидки. Работает с онлайн-кассой, «Честным знаком» и ЕГАИС — мы свяжем всё это между собой.",
    editions: [
      { label: "Базовая", price: 4900 },
      { label: "ПРОФ", price: 23000 },
    ],
    fits: "Магазины и точки продаж с кассой",
  },
  {
    id: "ut",
    image: { src: "/products/1c-ut.png", width: 371, height: 499 },
    scale: "max-h-[82%]",
    name: "1С:Управление торговлей 8",
    badge: "Опт и склад",
    summary:
      "Закупки, склады, продажи и расчёты с контрагентами в одной базе. Выбирают, когда складов несколько, а клиентов и сделок — много.",
    editions: [
      { label: "Базовая", price: 10000 },
      { label: "ПРОФ", price: 39700 },
    ],
    fits: "Оптовая и розничная торговля со складом",
  },
  {
    id: "unf",
    image: { src: "/products/1c-unf.png", width: 300, height: 402 },
    scale: "max-h-[82%]",
    name: "1С:Управление нашей фирмой 8",
    badge: "Весь бизнес целиком",
    summary:
      "Заказы, продажи, склад, финансы и сотрудники в одной программе. Удобна, если хочется управлять всей фирмой из одного окна.",
    editions: [
      { label: "Базовая", price: 7000 },
      { label: "ПРОФ", price: 30600 },
    ],
    fits: "Малый бизнес: услуги, производство, торговля",
  },
];

const EXTRAS: { title: string; note: string; items: Edition[] }[] = [
  {
    title: "Дополнительные рабочие места",
    note: "Для работы нескольких человек в одной базе. Докупаются к любой ПРОФ-версии.",
    items: [
      { label: "Клиентская лицензия на 1 рабочее место", price: 9400 },
      { label: "Клиентская лицензия на 5 рабочих мест", price: 31800 },
      { label: "Клиентская лицензия на 10 рабочих мест", price: 60900 },
    ],
  },
  {
    title: "Серверные компоненты",
    note: "Нужны для клиент-серверного режима — при большой базе и множестве пользователей.",
    items: [
      { label: "Сервер МИНИ на 5 подключений", price: 21300 },
      { label: "ПРОФ, лицензия на сервер", price: 74100 },
      { label: "ПРОФ, лицензия на сервер (x86-64)", price: 126800 },
    ],
  },
];

export function OneC() {
  return (
    <section id="onec" className="relative scroll-mt-28 overflow-hidden bg-ink-900/60 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb right-0 top-24 h-[480px] w-[480px] text-accent/14" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">Программы 1С</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Программы 1С <span className="text-hl">с открытым прайсом</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-lg text-mist-400">
                Продаём лицензии, устанавливаем, настраиваем и сопровождаем. Подскажем, где хватит
                базовой версии, а где действительно нужна ПРОФ.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <a href="#contact" className="btn btn-ghost">
              Подобрать программу
              <IconArrow className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        {/* что такое платформа: без этого карточки ниже — набор коробок */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-8 rounded-2xl border border-ink-600/60 bg-ink-850 px-6 py-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-9 lg:py-8">
            <div>
              <h3 className="text-2xl font-semibold">Что такое 1С:Предприятие 8</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-mist-400">
                Это система программ фирмы «1С» для учёта и управления. Она собрана из двух
                частей: платформы и прикладных решений. Платформа — общий механизм, на котором
                всё работает: формы, отчёты, права доступа, обмен данными. Прикладное решение,
                или конфигурация, — это уже готовая программа для конкретной задачи:
                бухгалтерии, зарплаты, магазина, склада.
              </p>
            </div>
            <div>
              <p className="text-[15px] leading-relaxed text-mist-400">
                Отдельно платформу не покупают: она входит в поставку любой программы из списка
                ниже. Отсюда и удобство — решения устроены одинаково, работают на одном движке
                и обмениваются данными между собой.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {PLATFORM.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug text-mist-300">
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* линейки — горизонтальные карточки: коробка слева, описание и цены справа */}
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {LINES.map((line, i) => (
            <Reveal key={line.id} delay={(i % 2) * 90} className="h-full">
              <article className="card card-hover group grid h-full overflow-hidden p-2.5 sm:grid-cols-[190px_1fr]">
                <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[18px] bg-[radial-gradient(70%_65%_at_50%_42%,#fffaf0_0%,#f3e8d2_60%,#eadbbd_100%)] sm:h-auto">
                  <Image
                    src={line.image.src}
                    width={line.image.width}
                    height={line.image.height}
                    alt={`Программа ${line.name}`}
                    sizes="(max-width: 640px) 60vw, 190px"
                    className={`relative ${line.scale} w-auto max-w-[80%] object-contain drop-shadow-[0_20px_22px_rgba(74,54,18,0.28)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03] sm:max-h-[220px]`}
                  />
                </div>

                <div className="flex flex-col px-4 pb-4 pt-6 sm:px-6 sm:py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
                    {line.badge}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{line.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{line.summary}</p>

                  <dl className="mt-5 space-y-2 border-t border-ink-700 pt-4">
                    {line.editions.map((edition) => (
                      <div key={edition.label} className="flex items-baseline gap-3">
                        <dt className="text-sm text-mist-400">{edition.label}</dt>
                        <span className="flex-1 border-b border-dotted border-ink-600" />
                        <dd className="shrink-0 font-display text-[15px] font-bold text-fg">
                          {money(edition.price)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 text-sm text-mist-500">
                    <span className="text-mist-300">Для кого:</span> {line.fits}
                  </p>

                  <div className="mt-5 flex-1" />
                  <RequestButton
                    model={line.name}
                    className="inline-flex items-center gap-2 self-start text-sm font-semibold text-fg transition-colors hover:text-accent-soft"
                  >
                    Заказать
                    <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </RequestButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {EXTRAS.map((group, i) => (
            <Reveal key={group.title} delay={i * 90} className="h-full">
              <div className="card flex h-full flex-col p-7">
                <h3 className="text-lg font-bold">{group.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-400">{group.note}</p>

                <dl className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4 border-b border-ink-700/50 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-mist-300">{item.label}</dt>
                      <dd className="shrink-0 font-display text-[15px] font-bold text-fg">
                        {money(item.price)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 rounded-2xl border border-ink-700/60 bg-ink-900/40 px-6 py-6 text-sm text-mist-400 sm:grid-cols-2 lg:px-8">
            <p>
              <span className="font-semibold text-mist-200">Электронная поставка. </span>
              На фото — коробки, а цены указаны для электронных версий: лицензия приходит
              на почту, начать работу можно в день оплаты.
            </p>
            <p>
              <span className="font-semibold text-mist-200">Установка и обучение. </span>
              Установим программу, перенесём данные, подключим кассу. Консультации и доработки —{" "}
              {money(2300)} в час.
            </p>
            <p className="sm:col-span-2 text-mist-500">
              Здесь не вся линейка фирмы «1С» — если нужной программы нет, спросите, подберём
              и рассчитаем. Цены действуют на {PRICE_DATE} и не являются публичной офертой;
              точную стоимость подтвердим до оплаты.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
