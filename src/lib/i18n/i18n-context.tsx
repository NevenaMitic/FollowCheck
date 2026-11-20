"use client";

import { createContext, useContext, useMemo } from "react";
import { dictionaries, type Locale, type Dictionary } from "./dictionaries";

type I18nContextValue = {
  locale: Locale;
  t: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLocale = "sr",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({ locale: initialLocale, t: dictionaries[initialLocale] as Dictionary }),
    [initialLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}