"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export function ScanPanel() {
  const { t } = useI18n();
  const lines = t.processing.log;
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    setVisible(1);
    const id = setInterval(() => {
      setVisible((v) => (v >= lines.length ? 1 : v + 1));
    }, 1100);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div className="w-full max-w-sm rounded-2xl border border-line bg-panel shadow-xl shadow-black/3 dark:shadow-black/20">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-fan/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mist">
          <WifiOff size={12} />
          {t.processing.networkNote}
        </div>
      </div>
      <div className="space-y-2 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        {lines.slice(0, visible).map((line, i) => {
          const isLast = i === visible - 1;
          return (
            <div
              key={line}
              className="flex items-start gap-2 text-mist animate-fade-up"
            >
              <span className="mt-0.5 text-signal">{isLast ? "▸" : "✓"}</span>
              <span className={isLast ? "text-ink" : ""}>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
