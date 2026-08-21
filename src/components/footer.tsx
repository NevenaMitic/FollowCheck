"use client";

import { ShieldCheck } from "lucide-react";
import { GithubIcon } from "@/components/icons/github-icon";
import { useI18n } from "@/lib/i18n/i18n-context";

const GITHUB_URL = "https://github.com/";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line/70 bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex gap-3.5">
            <ShieldCheck className="mt-0.5 shrink-0 text-signal" size={20} />
            <div>
              <h3 className="font-display text-sm font-semibold">
                {t.footer.privacyTitle}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist">
                {t.footer.privacyText}
              </p>
            </div>
          </div>
          <div className="flex gap-3.5">
            <GithubIcon className="mt-0.5 shrink-0 text-ink" size={20} />
            <div>
              <h3 className="font-display text-sm font-semibold">
                {t.footer.openSource}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-mist">
                {t.footer.openSourceText}
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
              >
                {t.footer.viewGithub} →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-1.5 border-t border-line/70 pt-5 font-mono text-[11px] text-mist sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.disclaimer}</span>
          <span>© {new Date().getFullYear()} FollowCheck</span>
        </div>
      </div>
    </footer>
  );
}
