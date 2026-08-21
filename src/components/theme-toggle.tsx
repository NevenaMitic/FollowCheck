"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="inline-flex items-center rounded-full border border-line bg-panel p-1">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={t.theme[value]}
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-mist transition-colors",
            mounted && theme === value && "bg-panel-hi text-ink"
          )}
        >
          <Icon size={14} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
