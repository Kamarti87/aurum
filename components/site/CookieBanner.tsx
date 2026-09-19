"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, writeConsent, type Consent } from "@/components/site/consent";
import { METRIKA_ID } from "@/components/site/analytics";

/**
 * Баннер согласия на cookie.
 *
 * По требованиям Роскомнадзора у посетителя должна быть возможность отказаться:
 * баннер только с кнопкой «Принять» считается некорректным. Поэтому две
 * равнозначные кнопки, а внешние сервисы (карта Яндекса) не загружаются,
 * пока согласия нет.
 */
export function CookieBanner({ initial }: { initial: Consent }) {
  const [consent, setConsent] = useState<Consent>(initial);

  useEffect(() => {
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Использование файлов cookie"
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="card card-sheen mx-auto flex max-w-4xl flex-col gap-3.5 p-4 shadow-2xl backdrop-blur-md sm:gap-5 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
        <p className="flex-1 text-[13px] leading-relaxed text-mist-300 sm:text-sm">
          Сайт использует файлы cookie, чтобы работать корректно и помнить ваш выбор.
          Если разрешите все, подключится карта Яндекса
          {METRIKA_ID ? " и Яндекс Метрика" : ""}. Подробности в{" "}
          <a href="/privacy" className="font-semibold text-accent-soft underline underline-offset-2 hover:text-fg">
            политике обработки персональных данных
          </a>
          .
        </p>

        <div className="flex shrink-0 gap-2.5 lg:flex-col xl:flex-row">
          <button
            type="button"
            className="btn btn-primary flex-1 px-3 py-3 text-[13px] sm:px-5 sm:text-[15px]"
            onClick={() => writeConsent("all")}
          >
            Принять все
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1 px-3 py-3 text-[13px] sm:px-5 sm:text-[15px]"
            onClick={() => writeConsent("necessary")}
          >
            Только необходимые
          </button>
        </div>
      </div>
    </div>
  );
}
