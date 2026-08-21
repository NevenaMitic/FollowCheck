"use client";

import { useEffect, useRef, useState } from "react";
import { WifiOff, AlertTriangle } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import {
  parseInstagramExport,
  InstagramParseError,
  type ParseResult,
  type ProgressStep,
} from "@/lib/instagram-parser";

const STEP_TO_LINE_INDEX: Record<ProgressStep, number> = {
  opening: 0,
  locating: 1,
  "reading-followers": 2,
  "reading-following": 3,
  comparing: 4,
  done: 6,
};

const MIN_STEP_MS = 380;
export function ProcessingStep({
  file,
  onDone,
  onBack,
}: {
  file: File;
  onDone: (result: ParseResult) => void;
  onBack: () => void;
}) {
  const { t } = useI18n();
  const lines = t.processing.log;
  const [visible, setVisible] = useState(1);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const startedRef = useRef(false);
  const isMountedRef = useRef(true);

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    // ključna izmena: resetuj na true pri SVAKOM mount-u,
    // uključujući Strict Mode-ov drugi (pravi) mount
    isMountedRef.current = true;

    if (!startedRef.current) {
      startedRef.current = true;

      async function run() {
        try {
          const started = Date.now();
          const result = await parseInstagramExport(file, (step) => {
            const target = STEP_TO_LINE_INDEX[step] + 1;
            setVisible((v) => Math.max(v, target === 7 ? 5 : target));
          });
          if (!isMountedRef.current) return;

          for (const step of [5, 6, 7]) {
            const elapsed = Date.now() - started;
            const wait = Math.max(0, MIN_STEP_MS * step - elapsed);
            await new Promise((r) => setTimeout(r, wait));
            if (!isMountedRef.current) return;
            setVisible(step);
          }

          await new Promise((r) => setTimeout(r, 350));
          if (isMountedRef.current) onDoneRef.current(result);
        } catch (err) {
          if (!isMountedRef.current) return;
          if (err instanceof InstagramParseError) {
            setErrorKey(err.message);
          } else {
            setErrorKey("generic");
          }
        }
      }

      run();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [file]);


  if (errorKey) {
    const message =
      errorKey === "zip-invalid"
        ? t.errors.zipInvalid
        : errorKey === "no-followers-data"
        ? t.errors.noFollowersData
        : errorKey === "empty-data"
        ? t.errors.emptyData
        : t.errors.generic;

    return (
      <div className="animate-fade-up rounded-2xl border border-warn/30 bg-warn-soft p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-warn" />
          <div>
            <p className="text-sm leading-relaxed text-ink">{message}</p>
            <button
              onClick={onBack}
              className="mt-4 rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-warn"
            >
              {t.errors.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {t.processing.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        {t.processing.subtitle}
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-panel">
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
        <div className="min-h-55 space-y-2.5 px-5 py-5 font-mono text-[13px] leading-relaxed">
          {lines.slice(0, visible).map((line, i) => {
            const isLast = i === visible - 1;
            return (
              <div key={line} className="flex items-start gap-2.5 animate-fade-up">
                <span className={isLast ? "text-signal" : "text-signal/60"}>
                  {isLast && visible < lines.length ? "▸" : "✓"}
                </span>
                <span className={isLast ? "text-ink" : "text-mist"}>{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
