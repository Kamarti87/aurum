"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RequestButton } from "@/components/site/RequestButton";

export type Device = {
  id: string;
  brand: string;
  image: { src: string; width: number; height: number };
  /** во сколько модель «крупнее» соседей — чтобы масштабы в ряду читались честно */
  scale: string;
  name: string;
  badge: string;
  summary: string;
  specs: string[];
  fits: string;
};

export type Group = {
  id: string;
  title: string;
  note: string;
  /** начало alt-подписи к фотографии */
  alt: string;
  /** по чему фильтровать группу: по производителям внутри неё или целиком */
  filterBy: "brand" | "group";
  items: Device[];
};

const ALL = "Все";

/** Сколько моделей показывать в группе до нажатия «Показать ещё».
    Шесть — это два полных ряда на десктопе, лента не растягивается. */
const LIMIT = 6;

/** Ключ, по которому модель попадает под кнопку фильтра. */
function keyOf(group: Group, device: Device) {
  return group.filterBy === "brand" ? device.brand : group.title;
}

function Card({
  device,
  alt,
  priority,
  delay,
}: {
  device: Device;
  alt: string;
  priority: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card card-hover group flex h-full flex-col p-2.5">
        {/* витрина — отдельная подложка внутри карточки */}
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-[18px] bg-[radial-gradient(70%_65%_at_50%_42%,#fffaf0_0%,#f3e8d2_60%,#eadbbd_100%)]">
          <Image
            src={device.image.src}
            width={device.image.width}
            height={device.image.height}
            alt={`${alt} ${device.name}`}
            priority={priority}
            sizes="(max-width: 1024px) 90vw, 380px"
            className={`relative w-auto ${device.scale} object-contain drop-shadow-[0_20px_22px_rgba(74,54,18,0.28)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.03]`}
          />
        </div>

        {/* описание */}
        <div className="flex flex-1 flex-col px-4 pb-4 pt-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft">
            {device.brand} · {device.badge}
          </p>
          <h4 className="mt-2 text-2xl font-semibold">{device.name}</h4>
          <p className="mt-3 text-[15px] leading-relaxed text-mist-400">{device.summary}</p>

          <ul className="mt-5 space-y-2 border-t border-ink-700 pt-5">
            {device.specs.map((spec) => (
              <li key={spec} className="flex gap-3 text-sm text-mist-300">
                <span className="mt-[9px] h-px w-2.5 shrink-0 bg-accent" />
                {spec}
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-mist-500">
            <span className="text-mist-300">Для кого:</span> {device.fits}
          </p>

          <div className="mt-6 flex-1" />
          <RequestButton
            model={device.name}
            className="btn btn-ghost w-full group-hover:border-fg group-hover:bg-fg group-hover:text-ink-950"
          >
            Узнать цену
          </RequestButton>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Каталог касс с одним переключателем на весь блок: производители смарт-терминалов
 * и фискальные регистраторы стоят в одном ряду кнопок — покупателю неважно, что
 * это разные основания деления, ему важно быстро сузить выбор.
 *
 * Невыбранное не размонтируется, а прячется классом hidden: вся линейка остаётся
 * в разметке страницы — и для поисковиков, и на случай, если не отработал JavaScript.
 */
export function DeviceCatalog({ groups }: { groups: Group[] }) {
  const options = [
    ALL,
    ...new Set(groups.flatMap((g) => g.items.map((d) => keyOf(g, d)))),
  ];
  const [active, setActive] = useState(ALL);
  const [opened, setOpened] = useState<string[]>([]);
  const shown = (g: Group, d: Device) => active === ALL || keyOf(g, d) === active;

  return (
    <>
      <Reveal delay={60}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Что показать">
          {options.map((option) => {
            const count =
              option === ALL
                ? groups.reduce((n, g) => n + g.items.length, 0)
                : groups.reduce(
                    (n, g) => n + g.items.filter((d) => keyOf(g, d) === option).length,
                    0,
                  );
            const on = active === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setActive(option)}
                aria-pressed={on}
                // на телефоне кнопка должна быть не меньше 44 точек:
                // пальцем в 38 попадаешь через раз
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors sm:min-h-0 sm:py-2 ${
                  on
                    ? "border-fg bg-fg text-ink-950"
                    : "border-ink-600 bg-ink-800 text-mist-300 hover:border-fg/40 hover:text-fg"
                }`}
              >
                {option}
                <span className={`ml-2 text-xs ${on ? "text-accent-strong" : "text-mist-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {groups.map((group, gi) => {
        const visible = group.items.filter((d) => shown(group, d));
        const open = opened.includes(group.id);
        const hiddenCount = Math.max(0, visible.length - LIMIT);
        // Показываем первые LIMIT из подходящих под фильтр. Остальные не
        // размонтируются, а прячутся — вся линейка остаётся в разметке страницы.
        const onScreen = new Set((open ? visible : visible.slice(0, LIMIT)).map((d) => d.id));
        return (
          <div
            key={group.id}
            className={visible.length === 0 ? "hidden" : gi === 0 ? "mt-12" : "mt-20"}
          >
            <Reveal>
              <div>
                <div className="flex items-center gap-5">
                  <h3 className="shrink-0 text-2xl font-semibold sm:text-[28px]">{group.title}</h3>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
                  <span className="shrink-0 font-display text-lg italic text-accent-soft">
                    {visible.length}
                  </span>
                </div>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-mist-400">
                  {group.note}
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {group.items.map((device, i) => (
                <div key={device.id} className={onScreen.has(device.id) ? "h-full" : "hidden"}>
                  <Card
                    device={device}
                    alt={group.alt}
                    priority={gi === 0 && i === 0}
                    delay={(i % 3) * 100}
                  />
                </div>
              ))}
            </div>

            {hiddenCount > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setOpened((prev) =>
                      open ? prev.filter((id) => id !== group.id) : [...prev, group.id],
                    )
                  }
                  aria-expanded={open}
                  className="btn btn-ghost min-h-11"
                >
                  {open ? "Свернуть" : `Показать ещё ${hiddenCount}`}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
