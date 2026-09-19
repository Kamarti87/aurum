import { cookies } from "next/headers";
import { ADDRESS, HOURS, PHONES } from "@/components/site/contacts";
import { CONSENT_COOKIE, normalize } from "@/components/site/consent";
import { MapEmbed } from "@/components/site/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrow, IconClock, IconMapPin, IconPhone } from "@/components/ui/Icons";

/** Карта во всю ширину, адрес — карточкой поверх неё (на телефоне — под ней). */
export async function MapSection() {
  const consent = normalize((await cookies()).get(CONSENT_COOKIE)?.value);

  return (
    <section id="map" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow">Как нас найти</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                Приезжайте <span className="text-hl">в офис</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="text-lg text-mist-400">Москва, район Лефортово</p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="relative mt-10">
            <div className="card overflow-hidden p-0">
              <MapEmbed initial={consent} />
            </div>

            <div className="card mt-5 p-6 sm:p-7 lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:w-[380px] lg:shadow-[0_30px_60px_-30px_rgba(70,52,20,0.55)]">
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5">
                  <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                  <span className="text-[15px] leading-snug text-fg">
                    {ADDRESS.street}
                    <span className="mt-0.5 block text-sm text-mist-400">
                      {ADDRESS.office} · {ADDRESS.postcode}, {ADDRESS.city}
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3.5">
                  <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                  <span className="text-[15px] text-mist-300">{HOURS.display}</span>
                </li>
                <li className="flex items-start gap-3.5">
                  <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                  <a href={PHONES[0].href} className="text-[15px] font-semibold text-fg hover:text-accent-soft">
                    {PHONES[0].display}
                  </a>
                </li>
              </ul>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={ADDRESS.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 px-4"
                >
                  Маршрут
                  <IconArrow className="h-4 w-4" />
                </a>
                <a
                  href={ADDRESS.card}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost flex-1 px-4"
                >
                  Яндекс Карты
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
