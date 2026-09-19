import { Logo } from "@/components/ui/Logo";
import { ADDRESS, EMAIL, HOURS, LEGAL, MAX, PHONES } from "@/components/site/contacts";

const LINKS = [
  { href: "#devices", label: "Онлайн-кассы" },
  { href: "#fiscal", label: "Фискальные накопители" },
  { href: "#onec", label: "Программы 1С" },
  { href: "#ecp", label: "Электронная подпись" },
  { href: "#faq", label: "Вопросы и ответы" },
  { href: "#map", label: "Как нас найти" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark relative border-t border-ink-700/60">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        {/* строка-призыв над колонками */}
        <div className="flex flex-col gap-6 border-b border-ink-700/60 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
            Нужна касса, 1С или подпись?{" "}
            <span className="text-hl">Позвоните — подскажем.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={PHONES[0].href} className="btn btn-primary">
              {PHONES[0].display}
            </a>
            <a href="#contact" className="btn btn-ghost">
              Оставить заявку
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="full" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist-500">
              Онлайн-кассы, фискальные накопители, программы 1С и электронная подпись для бизнеса
              в Москве и Московской области.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-500">
              {ADDRESS.full}
            </p>
          </div>

          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
              Разделы
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-y-0.5 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-block py-1.5 text-sm text-mist-500 transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-mist-400">
              Контакты
            </h3>
            <p className="mt-4 text-sm text-mist-500">{HOURS.display}</p>
            <ul className="mt-2 space-y-0.5 text-sm">
              {PHONES.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-block py-1.5 text-mist-500 transition-colors hover:text-fg"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block py-1.5 text-mist-500 transition-colors hover:text-fg"
                >
                  {EMAIL}
                </a>
              </li>
              {MAX.href && (
                <li>
                  <a
                    href={MAX.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1.5 text-mist-500 transition-colors hover:text-fg"
                  >
                    Написать в MAX
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-700/60 pt-6 text-xs text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {LEGAL.name}. Все права защищены.
            <br className="sm:hidden" />
            <span className="sm:ml-2">
              ИНН {LEGAL.inn} · ОГРНИП {LEGAL.ogrnip}
            </span>
          </p>
          <p>
            <a href="/privacy" className="transition-colors hover:text-fg">
              Политика обработки персональных данных
            </a>
          </p>
          <p>
            Цены на сайте не публикуются: стоимость рассчитывается индивидуально под задачу.
          </p>
        </div>
      </div>
    </footer>
  );
}
