import { ADDRESS, BRAND, EMAIL, HOURS, LEGAL, MAX, PHONES, SITE_URL as SITE } from "@/components/site/contacts";

/**
 * Разметка организации для поисковиков (JSON-LD, schema.org).
 * Даёт Яндексу и Google карточку компании в выдаче: адрес, телефоны, услуги.
 * Работает независимо от запрета индексации — данные просто ждут своего часа.
 *
 * Намеренно не указан рейтинг с Яндекс Карт: оценки чужие и меняются,
 * а поисковики требуют собственные данные сайта.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#organization`,
    name: BRAND,
    legalName: LEGAL.nameFull,
    url: SITE,
    // реквизиты в разметке — сигнал доверия для поисковиков, те же, что в подвале
    taxID: LEGAL.inn,
    identifier: [
      { "@type": "PropertyValue", propertyID: "ИНН", value: LEGAL.inn },
      { "@type": "PropertyValue", propertyID: "ОГРНИП", value: LEGAL.ogrnip },
    ],
    logo: `${SITE}/logo/aurum.svg`,
    image: `${SITE}/products/sigma-10.webp`,
    description:
      "Онлайн-кассы, фискальные накопители, программы 1С и электронная подпись для бизнеса в Москве и Московской области: подбор, регистрация ККТ в ФНС, внедрение и сопровождение.",
    telephone: PHONES.map((p) => p.href.replace("tel:", "")),
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ADDRESS.street}, ${ADDRESS.office}`,
      postalCode: ADDRESS.postcode,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.city,
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: ADDRESS.geo.lat,
      longitude: ADDRESS.geo.lon,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: HOURS.days,
        opens: HOURS.opens,
        closes: HOURS.closes,
      },
    ],
    areaServed: [
      { "@type": "City", name: "Москва" },
      { "@type": "AdministrativeArea", name: "Московская область" },
    ],
    ...(MAX.href ? { sameAs: [MAX.href] } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Услуги",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Контрольно-кассовая техника",
          itemListElement: [
            "Продажа онлайн-касс и смарт-терминалов",
            "Постановка ККТ на учёт в ФНС и подключение ОФД",
            "Фискальные накопители: подбор, замена, перерегистрация",
            "Техническое обслуживание и ремонт касс",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
        {
          "@type": "OfferCatalog",
          name: "1С",
          itemListElement: [
            "Продажа лицензий 1С",
            "Внедрение и настройка 1С",
            "Сопровождение и обновление 1С",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
        {
          "@type": "OfferCatalog",
          name: "Электронная подпись",
          itemListElement: [
            "Выпуск ЭЦП для физических лиц",
            "Машиночитаемые доверенности (МЧД)",
            "Электронные подписи для ЕГАИС",
            "Носители Рутокен и настройка рабочего места",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
