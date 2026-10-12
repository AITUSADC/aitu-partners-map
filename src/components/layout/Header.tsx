import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "./Brand";

interface HeaderProps { onGuide: () => void; onExplore: () => void }

const TELEGRAM_URL = "https://t.me/aitu_digital_committee";
const SUPPORT_TELEGRAM_URL = "https://t.me/Akend0";


export function Header({ onGuide, onExplore }: HeaderProps) {
  return <header className="app-header">
    <Link href="/" className="brand-link" aria-label="AITU Partners home"><Brand /></Link>
    <nav aria-label="Main navigation" className="header-nav">
      <button className="nav-link active" onClick={onExplore}><MapPin size={15} />Explore partners</button>
      <button className="nav-link" onClick={onGuide}>How it works<ArrowUpRight size={14} /></button>
    </nav>
    <div className="header-actions">
      <span className="city-indicator"><span className="status-dot" />Astana, KZ</span>
      <span className="header-divider" />
      <a className="committee-link" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Digital Committee — Telegram" title="Digital Committee — Telegram">
        <span className="committee-logo-viewport"><Image src="/branding/digital-committee-wordmark.png" width={1280} height={1280} sizes="112px" alt="" loading="eager" /></span>
      </a>
      <a className="support-link" href={SUPPORT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" lang="ru">Связаться с ТП</a>
    </div>
  </header>;
}
