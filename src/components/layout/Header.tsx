import { ArrowUpRight, CircleHelp, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { Brand } from "./Brand";

interface HeaderProps { onSearch: () => void; onGuide: () => void; onExplore: () => void }

export function Header({ onSearch, onGuide, onExplore }: HeaderProps) {
  return <header className="app-header">
    <Link href="/" className="brand-link" aria-label="AITU Partners home"><Brand /></Link>
    <nav aria-label="Main navigation" className="header-nav">
      <button className="nav-link active" onClick={onExplore}><MapPin size={15} />Explore partners</button>
      <button className="nav-link" onClick={onGuide}>How it works<ArrowUpRight size={14} /></button>
    </nav>
    <div className="header-actions">
      <span className="city-indicator"><span className="status-dot" />Astana, KZ</span>
      <span className="header-divider" />
      <button className="icon-button" onClick={onSearch} aria-label="Search partners" title="Search partners"><Search size={19} /></button>
      <button className="student-guide" onClick={onGuide} aria-label="Open student guide" title="Student guide"><CircleHelp size={18} /></button>
    </div>
  </header>;
}
