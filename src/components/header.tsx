"use client";

import Image from "next/image";
import { GithubIcon } from "@/components/icons/github-icon";
import { useI18n } from "@/lib/i18n/i18n-context";
import { LocalOnlyBadge } from "@/components/local-only-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { LangToggle } from "@/components/lang-toggle";

const GITHUB_URL = "https://github.com/";

export function Header() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-void/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center justify-center rounded-lg bg-transparent text-void">
            <Image src="/favicon.ico" alt="Logo" width={52} height={52} />
          </span>
          <span className="font-display text-[14px] uppercase font-semibold tracking-tight">
            {t.brand}
          </span>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LocalOnlyBadge />
        </div>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden h-8 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[11px] uppercase tracking-wider text-mist transition-colors hover:text-ink sm:inline-flex"
          >
            <GithubIcon size={13} />
            {t.nav.github}
          </a>
          <LangToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="flex justify-center border-t border-line/70 py-1.5 md:hidden">
        <LocalOnlyBadge />
      </div>
    </header>
  );
}
