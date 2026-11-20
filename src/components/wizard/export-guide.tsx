"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

function ScreenshotSlot({
  index,
  label,
  priority = false,
}: {
  index: number;
  label: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border border-dashed border-line bg-panel-hi">
      <Image
        src={`/guide/step-${index}.jpeg`}
        alt={label}
        fill
        priority={priority}
        className="object-contain"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
    </div>
  );
}

export function ExportGuide({ onContinue }: { onContinue: () => void }) {
  const { t } = useI18n();

  return (
    <div className="animate-fade-up">
      <h2 className="font-display text-2xl font-semibold tracking-tight">
        {t.guide.title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">
        {t.guide.subtitle}
      </p>

      <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {t.guide.steps.map((step, i) => (
          <li
            key={step.title}
            className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-5"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-soft font-mono text-xs font-medium text-signal">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[15px] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-mist">
                  {step.desc}
                </p>
              </div>
            </div>

            <ScreenshotSlot
              index={i + 1}
              label={`${step.title} – ${t.guide.title}`}
              priority={i < 2}
            />
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {t.guide.next}
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}