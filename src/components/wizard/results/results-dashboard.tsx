"use client";

import { useState } from "react";
import { Info, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import type { ParseResult } from "@/lib/instagram-parser";
import { StatCard } from "@/components/wizard/results/stat-card";
import { UserList } from "@/components/wizard/results/user-list";
import { cn } from "@/lib/utils";

type Tab = "notFollowingBack" | "fans" | "mutual";

export function ResultsDashboard({
  result,
  onRestart,
}: {
  result: ParseResult;
  onRestart: () => void;
}) {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("notFollowingBack");

  const tabs: {
    key: Tab;
    label: string;
    desc: string;
    count: number;
    accent: "warn" | "fan" | "signal";
  }[] = [
      {
        key: "notFollowingBack",
        label: t.results.notFollowingBack,
        desc: t.results.notFollowingBackDesc,
        count: result.notFollowingBack.length,
        accent: "warn",
      },
      {
        key: "fans",
        label: t.results.fans,
        desc: t.results.fansDesc,
        count: result.fans.length,
        accent: "fan",
      },
      {
        key: "mutual",
        label: t.results.mutualTab,
        desc: t.results.mutualDesc,
        count: result.mutual.length,
        accent: "signal",
      },
    ];

  const activeUsers =
    tab === "notFollowingBack"
      ? result.notFollowingBack
      : tab === "fans"
        ? result.fans
        : result.mutual;

  return (
    <div className="animate-fade-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {t.results.title}
        </h2>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-panel px-3.5 py-2 text-xs font-medium text-mist transition-colors hover:text-ink"
        >
          <RotateCcw size={13} />
          {t.results.newAnalysis}
        </button>
      </div>

      <div className="mt-3 flex items-start gap-3 rounded-lg border border-line bg-panel px-4 py-3">
        <Info size={17} className="mt-0.5 shrink-0 text-signal" />
        <p className="text-xs text-mist">{t.results.description}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={t.results.followers} value={result.followers.length} />
        <StatCard label={t.results.following} value={result.following.length} />
        <StatCard label={t.results.mutual} value={result.mutual.length} accent="signal" />
        <StatCard
          label={t.results.notFollowingBack}
          value={result.notFollowingBack.length}
          accent="warn"
        />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-line pb-4">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === item.key
                ? "border-ink bg-ink text-void"
                : "border-line bg-panel text-mist hover:text-ink"
            )}
          >
            {item.label}
            <span
              className={cn(
                "ml-2 rounded-full px-1.5 py-0.5 font-mono text-[11px]",
                tab === item.key ? "bg-void/15" : "bg-panel-hi"
              )}
            >
              {item.count}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm text-mist">
        {tabs.find((tItem) => tItem.key === tab)?.desc}
      </p>

      <div className="mt-4">
        <UserList
          users={activeUsers}
          emptyListMessage={t.results.emptyList}
          accent={tabs.find((tItem) => tItem.key === tab)?.accent}
        />
      </div>
    </div>
  );
}
