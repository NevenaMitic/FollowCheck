"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  ShieldCheck,
  X,
} from "lucide-react";

import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils";

type Category = "general" | "export" | "results" | "privacy";

type QuestionKey =
  | "howItWorks"
  | "login"
  | "catchAll"
  | "password"
  | "ban"
  | "mode"
  | "people"
  | "export"
  | "time"
  | "exportFormat"
  | "upload"
  | "differentNumbers"
  | "notFollowingBack"
  | "fans"
  | "mutual"
  | "stored"
  | "openSource";

const categoryQuestions: Record<Category, QuestionKey[]> = {
  general: [
    "howItWorks",
    "login",
    "catchAll",
    "password",
    "ban",
    "mode",
    "people",
  ],

  export: ["export", "time", "exportFormat", "upload"],

  results: [
    "differentNumbers",
    "notFollowingBack",
    "fans",
    "mutual",
  ],

  privacy: ["stored", "openSource"],
};

const categoryIcons = {
  general: CircleHelp,
  export: Download,
  results: BarChart3,
  privacy: ShieldCheck,
} as const;

export function FAQ() {
  const { t } = useI18n();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
  const [question, setQuestion] = useState<QuestionKey | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => {
    setOpen(false);
    setCategory(null);
    setQuestion(null);
  };

  const handleBack = () => {
    if (question) {
      setQuestion(null);
      return;
    }

    if (category) {
      setCategory(null);
    }
  };

  const openCategory = (key: Category) => {
    setCategory(key);
    setQuestion(null);
  };

  const openQuestion = (key: QuestionKey) => {
    setQuestion(key);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* FLOATING FAQ BUTTON */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.faq.button}
        className={cn(
          "fixed z-9999",
          "bottom-4 right-4",

          "flex h-12 w-12 items-center justify-center",
          "rounded-full border border-line bg-panel",
          "text-ink shadow-xl",
          "transition-all duration-200",

          "hover:-translate-y-0.5 hover:shadow-2xl",
          "active:translate-y-0",

          "sm:h-auto sm:w-auto",
          "sm:gap-2 sm:px-4 sm:py-3"
        )}
      >
        <CircleHelp size={19} />

        <span className="hidden text-sm font-medium sm:inline">
          {t.faq.button}
        </span>
      </button>

      {/* FAQ OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-10000">
          {/* Backdrop */}
          <button
            type="button"
            aria-label={t.faq.close}
            onClick={close}
            className="absolute inset-0 h-full w-full bg-ink/10 backdrop-blur-[2px]"
          />

          {/* FAQ PANEL */}
          <div
            className={cn(
              "absolute z-10001",

              "bottom-4 left-4 right-4",
              "sm:bottom-5 sm:left-auto sm:right-5 sm:w-97.5",

              "flex flex-col overflow-hidden",
              "h-[min(620px,calc(100dvh-32px))]",

              "rounded-2xl border border-line bg-panel",
              "shadow-2xl",
              "animate-fade-up"
            )}
          >
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center gap-2.5">
                {(question || category) && (
                  <button
                    type="button"
                    onClick={handleBack}
                    aria-label={t.faq.back}
                    className={cn(
                      "shrink-0 rounded-full p-1.5",
                      "text-mist transition-colors",
                      "hover:bg-panel-hi hover:text-ink"
                    )}
                  >
                    <ChevronLeft size={18} />
                  </button>
                )}

                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-semibold text-ink">
                    {question
                      ? t.faq.questions[question].question
                      : category
                        ? t.faq.categories[category]
                        : t.faq.title}
                  </h2>

                  {!question && !category && (
                    <p className="mt-0.5 text-xs text-mist">
                      {t.faq.subtitle}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={close}
                aria-label={t.faq.close}
                className={cn(
                  "ml-3 shrink-0 rounded-full p-1.5",
                  "text-mist transition-colors",
                  "hover:bg-panel-hi hover:text-ink"
                )}
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4">
              {question ? (
                /* ANSWER */
                <div className="animate-fade-up">
                  <div className="rounded-xl bg-panel-hi p-4">
                    <p className="text-sm leading-6 text-ink">
                      {t.faq.questions[question].answer}
                    </p>
                  </div>
                </div>
              ) : category ? (
                /* QUESTIONS */
                <div className="space-y-2 animate-fade-up">
                  {categoryQuestions[category].map((key) => (
                    <button
                      type="button"
                      key={key}
                      onClick={() => openQuestion(key)}
                      className={cn(
                        "group flex w-full items-center justify-between",
                        "rounded-xl border border-line bg-panel",
                        "px-3.5 py-3.5 sm:px-4",
                        "text-left",
                        "transition-colors",
                        "hover:bg-panel-hi"
                      )}
                    >
                      <span className="pr-3 text-sm font-medium leading-5 text-ink">
                        {t.faq.questions[key].question}
                      </span>

                      <ChevronRight
                        size={16}
                        className={cn(
                          "shrink-0 text-mist",
                          "transition-transform",
                          "group-hover:translate-x-0.5"
                        )}
                      />
                    </button>
                  ))}
                </div>
              ) : (
                /* CATEGORIES */
                <div className="space-y-2">
                  {(Object.keys(t.faq.categories) as Category[]).map(
                    (key) => {
                      const Icon = categoryIcons[key];

                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => openCategory(key)}
                          className={cn(
                            "group flex w-full items-center gap-3",
                            "rounded-xl border border-line bg-panel",
                            "px-3.5 py-3.5 sm:px-4 sm:py-4",
                            "text-left",
                            "transition-all",
                            "hover:bg-panel-hi"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center",
                              "rounded-lg bg-panel-hi text-signal"
                            )}
                          >
                            <Icon size={18} />
                          </span>

                          <span className="flex-1 text-sm font-medium text-ink">
                            {t.faq.categories[key]}
                          </span>

                          <ChevronRight
                            size={17}
                            className={cn(
                              "shrink-0 text-mist",
                              "transition-transform",
                              "group-hover:translate-x-0.5"
                            )}
                          />
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}