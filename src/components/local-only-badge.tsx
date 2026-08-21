"use client";

import { useI18n } from "@/lib/i18n/i18n-context";

export function LocalOnlyBadge() {
  const { t } = useI18n();
  return (
    <div
      className="group relative inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5"
      title={t.localOnly.tooltip}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-scan-pulse rounded-full bg-signal" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
      </span>
      <span className="font-mono text-[11px] uppercase tracking-wider text-ink/80">
        {t.localOnly.badge}
      </span>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-lg border border-line bg-panel-hi p-2.5 text-xs text-mist opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        {t.localOnly.tooltip}
      </div>
    </div>
  );
}
