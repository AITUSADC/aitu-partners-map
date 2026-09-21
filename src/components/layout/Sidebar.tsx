import { ArrowUpRight, ChevronDown, ChevronUp, Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import type { RefObject } from "react";
import type { CategoryFilter, Partner } from "@/types/partner";
import { PartnerFilters } from "../partners/PartnerFilters";
import { PartnerList } from "../partners/PartnerList";

interface SidebarProps {
  partners: Partner[]; total: number; category: CategoryFilter; search: string; selectedId?: string;
  expanded: boolean; searchRef: RefObject<HTMLInputElement | null>;
  onExpand: () => void; onSearch: (value: string) => void; onCategory: (value: CategoryFilter) => void;
  onSelect: (partner: Partner) => void; onClear: () => void; onGuide: () => void;
}

export function Sidebar({ partners, total, category, search, selectedId, expanded, searchRef, onExpand, onSearch, onCategory, onSelect, onClear, onGuide }: SidebarProps) {
  return <aside className={`sidebar glass-panel ${expanded ? "expanded" : ""}`} aria-label="Discover partners">
    <button className="sheet-handle" onClick={onExpand} aria-label={expanded ? "Collapse partner panel" : "Expand partner panel"} aria-expanded={expanded}><span /></button>
    <div className="sidebar-intro">
      <div className="eyebrow"><span className="tiny-cross">✦</span> YOUR STUDENT ADVANTAGE</div>
      <div className="sidebar-heading"><h1>Discover benefits<span>.</span></h1><button className="mobile-expand icon-button" onClick={onExpand} aria-label={expanded ? "Collapse partners" : "Expand partners"}>{expanded ? <ChevronDown size={19} /> : <ChevronUp size={19} />}</button></div>
      <p>Good places. Better prices.<br className="desktop-break" /> Exclusively for AITU students.</p>
    </div>
    <div className="sidebar-filter-area">
      <label className="search-field"><Search size={17} /><input ref={searchRef} value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search partners..." aria-label="Search partners by name" autoComplete="off" />{search ? <button onClick={() => onSearch("")} aria-label="Clear search"><X size={15} /></button> : <span className="search-shortcut" aria-hidden="true">/</span>}</label>
      <PartnerFilters value={category} onChange={onCategory} />
    </div>
    <div className="list-heading"><span><strong>{partners.length}</strong> {category === "all" && !search ? "partners in Astana" : `of ${total} partners`}</span><SlidersHorizontal size={14} aria-hidden="true" /></div>
    <div className="partner-scroll"><PartnerList partners={partners} selectedId={selectedId} onSelect={onSelect} onClear={onClear} /></div>
    <div className="sidebar-footer"><button onClick={onGuide} className="student-tip"><span className="tip-icon"><Sparkles size={17} /></span><span><strong>Your student ID opens doors.</strong><small>See how to use your benefits</small></span><ArrowUpRight size={16} /></button><p><span className="demo-dot" />Demo network<span>Made for AITU students</span></p></div>
  </aside>;
}
