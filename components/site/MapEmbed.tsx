"use client";

import { useEffect, useState } from "react";
import { ADDRESS } from "@/components/site/contacts";
import { CONSENT_EVENT, type Consent } from "@/components/site/consent";
import { IconMapPin } from "@/components/ui/Icons";

/**
 * Карта Яндекса ставит свои cookie, поэтому до согласия её грузить нельзя.
 * Пока согласия нет — показываем заглушку с кнопкой: посетитель может
 * загрузить карту разово, не меняя общий выбор.
 */
export function MapEmbed({ initial }: { initial: Consent }) {
  const [consent, setConsent] = useState<Consent>(initial);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent === "all" || forced) {
    return (
      <iframe
        src={ADDRESS.widget}
        title={`Аурум на карте: ${ADDRESS.full}`}
        loading="lazy"
        allowFullScreen
        className="h-[340px] w-full border-0 sm:h-[420px] lg:h-[520px]"
      />
    );
  }

  return (
    <div className="relative flex h-[340px] w-full flex-col items-center justify-center gap-5 overflow-hidden px-6 text-center sm:h-[420px] lg:h-[520px] lg:pl-[420px]">
      <div className="bg-grid absolute inset-0 opacity-25" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-accent-soft">
        <IconMapPin className="h-7 w-7" />
      </span>
      <p className="relative max-w-sm text-sm leading-relaxed text-mist-400">
        Карта загружается с сервиса Яндекса и ставит свои файлы cookie. Мы не показываем
        её без вашего согласия.
      </p>
      <button type="button" className="btn btn-ghost relative" onClick={() => setForced(true)}>
        Показать карту
      </button>
    </div>
  );
}
