"use client";

import { useLocalization } from "@/components/Localization";

import { ArrowUpRight, CircleHelp, Globe2, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "./Brand";
import { MotionPresence } from "../ui/MotionPresence";

interface HeaderProps { onGuide: () => void; onExplore: () => void }

const TELEGRAM_URL = "https://t.me/aitu_digital_committee";
const SUPPORT_TELEGRAM_URL = "https://t.me/Akend0";

function LanguageSwitch({ desktop = false }: { desktop?: boolean }) {
  const { t, locale, setLocale } = useLocalization();
  const index = { kk: 0, ru: 1, en: 2 }[locale];
  return <div className={`language-switch${desktop ? " desktop-language-switch" : ""}`} style={{ "--language-index": index } as CSSProperties} role="group" aria-label={t("Language")}>
    <span className="language-indicator" aria-hidden="true" />
    {([{ code: "kk", label: "KZ", name: "Қазақша" }, { code: "ru", label: "RU", name: "Русский" }, { code: "en", label: "EN", name: "English" }] as const).map(({ code, label, name }) => <button key={code} type="button" lang={code} aria-label={name} aria-pressed={locale === code} onClick={() => setLocale(code)}>{label}</button>)}
  </div>;
}

export function Header({ onGuide, onExplore }: HeaderProps) {
  const { t } = useLocalization();
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    function dismiss(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function resize(event: MediaQueryListEvent) { if (event.matches) setMenuOpen(false); }
    document.addEventListener("pointerdown", dismiss);
    desktop.addEventListener("change", resize);
    return () => { document.removeEventListener("pointerdown", dismiss); desktop.removeEventListener("change", resize); };
  }, [menuOpen]);

  return <header ref={header} className="app-header" onKeyDown={(event) => {
    if (event.key === "Escape" && menuOpen) { event.stopPropagation(); setMenuOpen(false); menuTrigger.current?.focus(); }
  }}>
    <Link href="/" className="brand-link" aria-label={t("AITU Partners home")}><Brand /></Link>
    <nav aria-label={t("Main navigation")} className="header-nav">
      <button className="nav-link active" onClick={onExplore}><MapPin size={15} />{t("Explore partners")}</button>
      <button className="nav-link" onClick={onGuide}>{t("How it works")}<ArrowUpRight size={14} /></button>
    </nav>
    <div className="header-actions">
      <a className="committee-link" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={t("Digital Committee — Telegram")} title={t("Digital Committee — Telegram")}>
        <span className="committee-logo-viewport"><Image src="/branding/digital-committee-wordmark.png" width={1280} height={1280} sizes="112px" alt="" loading="eager" /></span>
      </a>
      <a className="support-link" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">{t("Contact support")}</a>
      <LanguageSwitch desktop />
      <button ref={menuTrigger} type="button" className="mobile-menu-toggle" aria-label={menuOpen ? t("Close navigation") : t("Open navigation")} aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    <MotionPresence open={menuOpen}><nav id={menuId} className="mobile-nav-dropdown" aria-label={t("Mobile navigation")}>
      <button type="button" className="mobile-nav-item active" onClick={() => { setMenuOpen(false); onExplore(); }}><MapPin size={18} /><span>{t("Explore partners")}</span></button>
      <button type="button" className="mobile-nav-item" onClick={() => { setMenuOpen(false); menuTrigger.current?.focus(); onGuide(); }}><CircleHelp size={18} /><span>{t("How it works")}</span></button>
      <div className="mobile-nav-divider" />
      <a className="mobile-nav-item" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}><MessageCircle size={18} /><span>{t("Contact support")}</span><ArrowUpRight size={14} /></a>
      <div className="language-section">
        <span className="language-label"><Globe2 size={15} />{t("Language")}</span>
        <LanguageSwitch />
      </div>
    </nav></MotionPresence>
  </header>;
}
