import { useId } from "react";

/** Три золотых тона: светлая грань, основной цвет, тень. */
const GOLD = { light: "#f0d99a", base: "#c9a24b", deep: "#8a6a26" };

/**
 * Знак «Монета», утверждён 18 сентября 2026: геометричная «А» в кольце
 * с насечкой, перекладина выходит за букву. Тот же рисунок, без насечки
 * (на 16 пикселях она сливается), — в иконке сайта app/icon.svg.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  const g = useId();
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD.light} />
          <stop offset="55%" stopColor={GOLD.base} />
          <stop offset="100%" stopColor={GOLD.deep} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="20" stroke={`url(#${g})`} strokeWidth="2.2" />
      <circle
        cx="24"
        cy="24"
        r="16.2"
        stroke={GOLD.base}
        strokeWidth="0.8"
        strokeDasharray="1 2.2"
        opacity="0.7"
      />
      <path
        d="M15.5 34 L24 12.5 L32.5 34"
        stroke={`url(#${g})`}
        strokeWidth="3"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <path d="M17.5 27 H40" stroke={GOLD.light} strokeWidth="2" />
    </svg>
  );
}

/**
 * Логотип «Аурум»: знак-монета и надпись курсивной антиквой.
 *
 * variant="header" — знак и надпись в строку.
 * variant="full"   — крупнее и с подписью направлений, для подвала.
 */
export function Logo({
  variant = "header",
  className = "",
}: {
  variant?: "header" | "full";
  className?: string;
}) {
  if (variant === "full") {
    return (
      <span className={`inline-flex items-center gap-4 ${className}`}>
        <LogoMark className="h-14 w-14 shrink-0" />
        <span className="flex flex-col">
          <span className="font-display text-[2rem] font-medium italic leading-none tracking-[0.01em] text-fg">
            Аурум
          </span>
          <span className="mt-2 text-[11px] font-medium uppercase tracking-[0.24em] text-mist-500">
            Кассы · 1С · ЭЦП
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="font-display text-[1.6rem] font-medium italic leading-none tracking-[0.01em] text-fg">
        Аурум
      </span>
    </span>
  );
}
