"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { translate, type Locale } from "@/lib/translations";

const storageKey = "aitu-partners-language";
const languageEvent = "aitu-language-change";
let fallbackLocale: Locale = "en";
function getLocale(): Locale {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "kk" || value === "ru" ? value : "en";
  } catch { return fallbackLocale; }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(languageEvent, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(languageEvent, listener); };
}
const Localization = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; t: (text: string) => string } | null>(null);

export function LocalizationProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, () => "en" as Locale);
  const t = useCallback((text: string) => translate(locale, text), [locale]);
  const setLocale = useCallback((value: Locale) => {
    fallbackLocale = value;
    try { localStorage.setItem(storageKey, value); } catch { /* Private storage may be unavailable. */ }
    window.dispatchEvent(new Event(languageEvent));
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <Localization.Provider value={value}>{children}</Localization.Provider>;
}

export function useLocalization() {
  const context = useContext(Localization);
  if (!context) throw new Error("LocalizationProvider is required");
  return context;
}
