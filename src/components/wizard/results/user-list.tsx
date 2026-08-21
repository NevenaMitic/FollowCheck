"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ExternalLink, ArrowUpDown, AlertTriangle } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import type { IgUser } from "@/lib/instagram-parser";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/avatar";
import { isFlagged, toggleFlagged } from "@/lib/flagged-profiles";

type Sort = "recent" | "alpha";

export function UserList({
  users,
  emptyListMessage,
  accent = "ink",
}: {
  users: IgUser[];
  emptyListMessage: string;
  accent?: "ink" | "warn" | "fan" | "signal";
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("recent");
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initial = new Set<string>();
    for (const u of users) {
      if (isFlagged(u.username)) initial.add(u.username);
    }
    setFlagged(initial);
  }, [users]);

  const handleToggleFlag = (username: string) => {
    const nowFlagged = toggleFlagged(username);
    setFlagged((prev) => {
      const next = new Set(prev);
      if (nowFlagged) {
        next.add(username);
      } else {
        next.delete(username);
      }
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? users.filter((u) => u.username.toLowerCase().includes(q))
      : users;
    const sorted = [...base];
    if (sort === "alpha") {
      sorted.sort((a, b) => a.username.localeCompare(b.username));
    } else {
      sorted.sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
    }
    return sorted;
  }, [users, query, sort]);

  const dotClass =
    accent === "warn"
      ? "bg-warn"
      : accent === "fan"
      ? "bg-fan"
      : accent === "signal"
      ? "bg-signal"
      : "bg-mist";

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line py-14 text-center text-sm text-mist">
        {emptyListMessage}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.results.searchPlaceholder}
            className="w-full rounded-full border border-line bg-panel py-2.5 pl-9 pr-4 text-sm outline-none focus:border-signal"
          />
        </div>
        <button
          onClick={() => setSort((s) => (s === "recent" ? "alpha" : "recent"))}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-line bg-panel px-3.5 py-2.5 text-xs font-medium text-mist transition-colors hover:text-ink"
        >
          <ArrowUpDown size={13} />
          {sort === "recent" ? t.results.sortRecent : t.results.sortAlpha}
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-center text-sm text-mist">{t.results.empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {filtered.map((user) => {
            const isUserFlagged = flagged.has(user.username);

            return (
              <li
                key={user.username}
                className="flex items-center justify-between gap-3 bg-panel px-4 py-3 transition-colors hover:bg-panel-hi"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", dotClass)} />
                  <Avatar username={user.username} />
                  <span className="truncate font-mono text-sm text-ink">
                    @{user.username}
                  </span>
                  {isUserFlagged ? (
                    <span
                      title={t.results.flaggedHint}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-warn/10 px-2 py-0.5 text-[10px] font-medium text-warn"
                    >
                      <AlertTriangle size={11} />
                      {t.results.flaggedLabel}
                    </span>
                  ) : null}
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFlag(user.username)}
                    title={t.results.flagToggleHint}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors",
                      isUserFlagged ? "text-warn hover:text-warn/70" : "text-mist hover:text-warn"
                    )}
                  >
                    <AlertTriangle size={12} />
                  </button>

                  <a
                    href={user.href}
                    target="_blank"
                    rel="noreferrer"
                    title={t.results.statusHint}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs text-mist transition-colors hover:text-signal"
                  >
                    {t.results.openProfile}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}