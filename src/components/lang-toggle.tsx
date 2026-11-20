"use client";

import { useI18n } from "@/lib/i18n/i18n-context";
import { locales } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function LangToggle() {
  const { locale } = useI18n();

  return (
    <nav
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-line bg-panel p-1 font-mono text-[11px] uppercase"
    >
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}`}
          hrefLang={l}
          lang={l}
          aria-current={locale === l ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 tracking-wider text-mist transition-colors",
            locale === l && "bg-panel-hi text-ink"
          )}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}