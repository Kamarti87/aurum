"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { ADDRESS, EMAIL, HOURS, PHONES } from "@/components/site/contacts";
import { IconClock, IconMail, IconMapPin, IconPhone } from "@/components/ui/Icons";

const NAV = [
  { href: "#devices", label: "Кассы" },
  { href: "#fiscal", label: "Накопители" },
  { href: "#onec", label: "1С" },
  { href: "#its", label: "1С:ИТС" },
  { href: "#ecp", label: "Подпись" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Контакты" },
  // только в мобильном меню: на десктопе адрес виден в верхней строке
  { href: "#map", label: "Как нас найти", mobileOnly: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink-700/70 bg-ink-950/85 shadow-[0_10px_30px_-24px_rgba(70,52,20,0.6)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div
        className={`hidden overflow-hidden border-b border-ink-700/70 transition-[max-height,opacity] duration-300 lg:block ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center gap-7 px-5 text-[13px] text-mist-400 lg:px-8">
          <a href="#map" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            <IconMapPin className="h-3.5 w-3.5 text-accent-soft" />
            {ADDRESS.city}, {ADDRESS.street}
          </a>
          <span className="inline-flex items-center gap-2">
            <IconClock className="h-3.5 w-3.5 text-accent-soft" />
            {HOURS.display}
          </span>
          <a
            href={`mailto:${EMAIL}`}
            className="ml-auto inline-flex items-center gap-2 transition-colors hover:text-fg"
          >
            <IconMail className="h-3.5 w-3.5 text-accent-soft" />
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="shrink-0" aria-label="Аурум, на главную">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.filter((item) => !item.mobileOnly).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative whitespace-nowrap px-3 py-2 text-sm font-medium text-mist-300 transition-colors after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={PHONES[0].href}
            className="hidden items-center gap-2 text-[15px] font-semibold text-fg transition-colors hover:text-accent-soft xl:inline-flex"
          >
            <IconPhone className="h-4 w-4 text-accent-soft" />
            {PHONES[0].display}
          </a>

          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
            Рассчитать
          </a>

          {/* на телефоне звонок важнее формы — выносим отдельной кнопкой */}
          <a
            href={PHONES[0].href}
            aria-label={`Позвонить ${PHONES[0].display}`}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-600 bg-ink-850/80 text-fg sm:hidden"
          >
            <IconPhone className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-600 bg-ink-850/80 text-fg lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* мобильное меню */}
      <div
        className={`overflow-hidden border-t border-ink-700/60 bg-ink-950/95 backdrop-blur-md transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3.5 text-base font-medium text-mist-200 transition-colors hover:bg-ink-800 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2 w-full"
          >
            Рассчитать стоимость
          </a>
        </nav>
      </div>
    </header>
  );
}
