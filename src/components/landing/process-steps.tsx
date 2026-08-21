"use client";

import { useI18n } from "@/lib/i18n/i18n-context";

export function ProcessSteps() {
  const { t } = useI18n();
  return (
    <section className="border-y border-line/70 bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-mist">
          {t.steps.title}
        </h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.items.map((step, i) => (
            <li key={step.label} className="relative pl-9">
              <span className="absolute left-0 top-0 font-mono text-xs text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute left-2.25 top-1 h-full w-px bg-line last:hidden" />
              <h3 className="font-display text-[15px] font-semibold text-ink">
                {step.label}
              </h3>
              <p className="mt-1 text-sm leading-snug text-mist">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
