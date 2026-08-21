"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries, locales, type Locale, type Dictionary } from "./dictionaries";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "nepratilac-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "sr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && locales.includes(stored as Locale)) return stored as Locale;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("sr") ? "sr" : "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("sr");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLocaleState(detectInitialLocale());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale, hydrated]);

  const setLocale = (next: Locale) => setLocaleState(next);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: dictionaries[locale] as Dictionary }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
