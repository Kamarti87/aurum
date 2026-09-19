"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { CONSENT_EVENT, type Consent } from "@/components/site/consent";
import { GOAL_LEAD, METRIKA_ID } from "@/components/site/analytics";

export { GOAL_LEAD, METRIKA_ID };

declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** Отправка цели. Молчит, если счётчик не загружен — например, нет согласия. */
export function reachGoal(goal: string) {
  if (METRIKA_ID) window.ym?.(METRIKA_ID, "reachGoal", goal);
}

/**
 * Яндекс Метрика ставит свои cookie и передаёт IP, поэтому грузится только
 * после согласия на все файлы cookie — так же, как карта в разделе «Как нас
 * найти». Отказался посетитель — счётчика на странице просто нет.
 *
 * Вебвизор намеренно выключен: он записывает действия на странице, включая
 * ввод в поля формы, и потребовал бы отдельного описания в политике.
 */
export function Metrika({ initial }: { initial: Consent }) {
  const [consent, setConsent] = useState<Consent>(initial);
  const pathname = usePathname();

  useEffect(() => {
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // переходы между страницами внутри сайта Метрика сама не считает
  useEffect(() => {
    if (METRIKA_ID && consent === "all") window.ym?.(METRIKA_ID, "hit", pathname);
  }, [consent, pathname]);

  if (!METRIKA_ID || consent !== "all") return null;

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j=0; j<document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${METRIKA_ID}, "init", { webvisor: false, clickmap: true, trackLinks: true, accurateTrackBounce: true });`}
    </Script>
  );
}
