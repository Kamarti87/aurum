/**
 * Согласие на cookie хранится в самой cookie, а не в localStorage.
 * Так сервер видит выбор посетителя ещё до отрисовки и отдаёт баннер прямо
 * в HTML: он виден и проверяющему роботу, который не выполняет скрипты,
 * и не мигает у тех, кто уже ответил.
 *
 * "all"       — разрешены и внешние сервисы (карта Яндекса)
 * "necessary" — только технически необходимое
 */
export const CONSENT_COOKIE = "aurum_consent";
export const CONSENT_EVENT = "aurum:consent-changed";

export type Consent = "all" | "necessary" | null;

export function normalize(value: string | undefined | null): Consent {
  return value === "all" || value === "necessary" ? value : null;
}

export function readConsent(): Consent {
  if (typeof document === "undefined") return null;
  const hit = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`));
  return normalize(hit?.split("=")[1]);
}

/**
 * Cookie, которые ставит Яндекс Метрика. Их срок жизни дольше, чем у нашего
 * согласия, поэтому при отказе они остались бы в браузере — удаляем сами.
 */
const METRIKA_COOKIES = ["_ym_uid", "_ym_d", "_ym_isad", "_ym_visorc", "_ym_debug"];

function forget(name: string) {
  const base = `${name}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = base;
  // часть cookie выставлена на домен с точкой — без неё удаление не сработает
  document.cookie = `${base}; domain=${location.hostname}`;
  document.cookie = `${base}; domain=.${location.hostname}`;
}

export function writeConsent(value: Exclude<Consent, null>) {
  // полгода — разумный срок: дольше держать выбор без переспроса не стоит
  const maxAge = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;

  if (value === "necessary") METRIKA_COOKIES.forEach(forget);

  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
