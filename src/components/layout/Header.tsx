"use client";

import { ArrowUpRight, CircleHelp, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "./Brand";

interface HeaderProps { onGuide: () => void; onExplore: () => void }

const TELEGRAM_URL = "https://t.me/aitu_digital_committee";
const SUPPORT_TELEGRAM_URL = "https://t.me/Akend0";


export function Header({ onGuide, onExplore }: HeaderProps) {
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
    <Link href="/" className="brand-link" aria-label="AITU Partners home"><Brand /></Link>
    <nav aria-label="Main navigation" className="header-nav">
      <button className="nav-link active" onClick={onExplore}><MapPin size={15} />Explore partners</button>
      <button className="nav-link" onClick={onGuide}>How it works<ArrowUpRight size={14} /></button>
    </nav>
    <div className="header-actions">
      <a className="committee-link" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Digital Committee — Telegram" title="Digital Committee — Telegram">
        <span className="committee-logo-viewport"><Image src="/branding/digital-committee-wordmark.png" width={1280} height={1280} sizes="112px" alt="" loading="eager" /></span>
      </a>
      <a className="support-link" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" lang="ru">Связаться с ТП</a>
      <button ref={menuTrigger} type="button" className="mobile-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {menuOpen && <nav id={menuId} className="mobile-nav-dropdown" aria-label="Mobile navigation">
      <button type="button" className="mobile-nav-item active" onClick={() => { setMenuOpen(false); onExplore(); }}><MapPin size={18} /><span>Explore partners</span></button>
      <button type="button" className="mobile-nav-item" onClick={() => { setMenuOpen(false); menuTrigger.current?.focus(); onGuide(); }}><CircleHelp size={18} /><span>How it works</span></button>
      <div className="mobile-nav-divider" />
      <a className="mobile-nav-item" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" lang="ru" onClick={() => setMenuOpen(false)}><MessageCircle size={18} /><span>Связаться с ТП</span><ArrowUpRight size={14} /></a>
    </nav>}
  </header>;
}
