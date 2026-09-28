import { ADDRESS, HOURS } from "@/components/site/contacts";
import { Reveal } from "@/components/ui/Reveal";

const ITEMS = [
  {
    q: "Нужен ли фискальный накопитель к новой кассе?",
    a: "Да. Кассы поставляются без накопителя, а без него касса не работает и не регистрируется в налоговой. Срок накопителя — 15 или 36 месяцев — подбираем под налоговый режим и вид деятельности.",
  },
  {
    q: "Что нужно, чтобы зарегистрировать кассу в ФНС?",
    a: "Кассу регистрируют через личный кабинет на сайте налоговой — для этого нужна квалифицированная электронная подпись руководителя или ИП. Ещё понадобится договор с оператором фискальных данных (ОФД). Регистрацию проведём сами и подключим ОФД.",
  },
  {
    q: "Где руководителю получить электронную подпись?",
    a: "Подпись руководителя организации и индивидуального предпринимателя выдаёт удостоверяющий центр ФНС. Мы подберём сертифицированный носитель Рутокен и настроим рабочее место, а сотрудникам выпустим подпись физического лица и оформим машиночитаемую доверенность.",
  },
  {
    q: "Вы официальный партнёр 1С?",
    a: "Да, у нас статус 1С:Франчайзинг — мы входим в партнёрскую сеть фирмы «1С». Продаём лицензии 1С:Предприятие 8 с официальными документами, оформляем и продлеваем договоры сопровождения 1С:ИТС, ставим обновления и подключаем сервисы 1С.",
  },
  {
    q: "Сколько стоят касса и обслуживание?",
    a: "Зависит от модели, комплектации и срока накопителя, поэтому стоимость считаем под задачу — оставьте заявку, и мы пришлём расчёт. Открытые цены есть только на программы 1С: они фиксированные и указаны в разделе выше.",
  },
  {
    q: "Работаете с маркировкой и ЕГАИС?",
    a: "Да. Подберём кассу с поддержкой ФФД 1.2 для «Честного знака», выпустим подпись для ЕГАИС и свяжем кассу с товароучётом в 1С.",
  },
  {
    q: "Где вы находитесь?",
    a: `Офис в Москве: ${ADDRESS.full} (район Лефортово). Работаем с клиентами в Москве и Московской области. Часы работы — ${HOURS.display.toLowerCase()}.`,
  },
];

/**
 * Частые вопросы. Раскрываются нативным <details> — без скриптов, и ответы
 * целиком лежат в разметке. Та же пара «вопрос — ответ» уходит поисковикам
 * разметкой FAQPage.
 */
export function Faq() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ITEMS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" className="relative scroll-mt-28 py-24 lg:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">Вопросы</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
              Коротко о <span className="text-hl">главном</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-lg text-mist-400">
              Не нашли ответа — позвоните или оставьте заявку, разберёмся с вашим случаем.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a href="#contact" className="btn btn-primary mt-8">
              Задать вопрос
            </a>
          </Reveal>
        </div>

        <div className="border-t border-ink-600/70">
          {ITEMS.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 60}>
              <details className="group border-b border-ink-600/70" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-xl font-semibold text-fg sm:text-2xl">{q}</span>
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-600 transition-colors group-open:border-fg group-open:bg-fg">
                    <span className="absolute h-px w-3.5 bg-fg transition-colors group-open:bg-ink-950" />
                    <span className="absolute h-3.5 w-px bg-fg transition-all group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pr-12 text-[15px] leading-relaxed text-mist-400">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
