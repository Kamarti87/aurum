import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Playfair_Display, Onest } from "next/font/google";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Metrika } from "@/components/site/Metrika";
import { CONSENT_COOKIE, normalize } from "@/components/site/consent";
import { ALLOW_INDEXING, SITE_URL } from "@/components/site/contacts";
import "./globals.css";

/* Заголовки — антиква с курсивом для акцентов, текст — гротеск Onest.
   Оба шрифта с кириллицей. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Аурум — онлайн-кассы, 1С и электронная подпись в Москве",
    template: "%s · Аурум",
  },
  description:
    "Подключаем бизнес в Москве и области к онлайн-кассам, программам 1С и электронной подписи: подбор и регистрация ККТ в ФНС, замена фискальных накопителей, лицензии и внедрение 1С, Рутокен и МЧД.",
  keywords: [
    "онлайн-касса Москва",
    "ККТ",
    "фискальный накопитель",
    "смарт-терминал",
    "АТОЛ Sigma",
    "1С",
    "ЭЦП",
    "МЧД",
    "ЕГАИС",
    "Рутокен",
    "Аурум",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Аурум",
    title: "Аурум — онлайн-кассы, 1С и электронная подпись в Москве",
    description:
      "Касса, учёт и подпись — в одних руках. Онлайн-кассы, программы 1С и электронная подпись для бизнеса в Москве и области.",
  },
  alternates: { canonical: "/" },
  // до запуска закрыто от поисковиков; открывается переменной ALLOW_INDEXING=true
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f2ea",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const consent = normalize((await cookies()).get(CONSENT_COOKIE)?.value);

  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${onest.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink-950">
        {children}
        <CookieBanner initial={consent} />
        <Metrika initial={consent} />
      </body>
    </html>
  );
}
