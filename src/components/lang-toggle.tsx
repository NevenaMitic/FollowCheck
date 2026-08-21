"use client";

import { useI18n } from "@/lib/i18n/i18n-context";
import { locales } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const { locale, setLocale } = useI18n();
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-panel p-1 font-mono text-[11px] uppercase">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "rounded-full px-2.5 py-1 tracking-wider text-mist transition-colors",
            locale === l && "bg-panel-hi text-ink"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
