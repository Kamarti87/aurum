"use client";

import type { ReactNode } from "react";

export const MODEL_EVENT = "aurum:request-model";

/**
 * Кнопка «узнать условия»: прокручивает к форме и подставляет туда модель,
 * чтобы менеджер сразу видел, о чём спрашивают. По технике цены считаем
 * индивидуально; опубликован только прайс на программы 1С — он фиксированный.
 */
export function RequestButton({
  model,
  children,
  className = "btn btn-ghost w-full",
}: {
  model: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(MODEL_EVENT, { detail: model }));
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {children}
    </button>
  );
}
