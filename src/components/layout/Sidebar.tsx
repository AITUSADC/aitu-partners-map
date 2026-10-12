import { useLocalization } from "@/components/Localization";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, X } from "lucide-react";
import { useSyncExternalStore, type RefObject } from "react";
import type { CategoryFilter, Partner } from "@/types/partner";
import { PartnerFilters } from "../partners/PartnerFilters";
import { PartnerList } from "../partners/PartnerList";
import { useSheetDrag } from "../ui/useSheetDrag";

const mobileQuery = "(max-width: 1023px)";
function subscribeViewport(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

interface SidebarProps {
  collapsed: boolean; onCollapse: () => void;
  partners: Partner[]; category: CategoryFilter; search: string; selectedId?: string;
  expanded: boolean; searchRef: RefObject<HTMLInputElement | null>;
  onExpandedChange: (expanded: boolean) => void;
  onExpand: () => void; onSearch: (value: string) => void; onCategory: (value: CategoryFilter) => void;
  onSelect: (partner: Partner) => void; onClear: () => void;
}

export function Sidebar({ collapsed, onCollapse, partners, category, search, selectedId, expanded, searchRef, onExpand, onExpandedChange, onSearch, onCategory, onSelect, onClear }: SidebarProps) {
  const { t } = useLocalization();
  const mobile = useSyncExternalStore(subscribeViewport, () => window.matchMedia(mobileQuery).matches, () => false);
  const { sheetRef, dragging, revealing, dragHandlers, onClickCapture, onPointerDownCapture } = useSheetDrag(expanded, onExpandedChange);
  return <><aside ref={sheetRef} id="partners-panel" className={`sidebar glass-panel ${expanded ? "expanded" : ""} ${dragging ? "is-dragging" : ""} ${dragging && revealing ? "is-revealing" : ""}`} onClickCapture={onClickCapture} onPointerDownCapture={onPointerDownCapture} aria-label={t("Discover partners")} inert={!mobile && collapsed}>
    <button className="sheet-handle" {...dragHandlers} onClick={onExpand} aria-label={expanded ? t("Collapse partner panel") : t("Expand partner panel")} aria-expanded={expanded}><span /></button>
    <div className="sidebar-intro">
      <div className="sidebar-eyebrow-row"><div className="eyebrow"><span className="tiny-cross">✦</span> {t("YOUR STUDENT ADVANTAGE")}</div><button type="button" className="desktop-sidebar-collapse icon-button" onClick={onCollapse} aria-label={t("Hide partners panel")} aria-expanded={!collapsed} aria-controls="partners-panel" title={t("Hide partners")}><ChevronLeft size={18} /></button></div>
      <div className="sidebar-heading" {...dragHandlers}><h1 className="standard-sidebar-heading">{t("Discover benefits")}<span>.</span></h1><h1 className="collapsed-mobile-heading"><button type="button" className="mobile-collapsed-trigger" onClick={onExpand} aria-label={t("Expand partners")} aria-expanded={false} aria-controls="partners-panel"><span>{t("Discover benefits")}<span className="title-dot">.</span></span><ChevronUp size={19} /></button></h1><button className="mobile-expand icon-button" onClick={onExpand} aria-label={expanded ? t("Collapse partners") : t("Expand partners")} aria-expanded={expanded}>{expanded ? <ChevronDown size={19} /> : <ChevronUp size={19} />}</button></div>
      <p>{t("Good places. Better prices.")}<br className="desktop-break" /> {t("Exclusively for AITU students.")}</p>
    </div>
    <div className="sidebar-filter-area" inert={mobile && !expanded && !(dragging && revealing)}>
      <label className="search-field"><Search size={17} /><input ref={searchRef} value={search} onChange={(event) => onSearch(event.target.value)} placeholder={t("Search partners...")} aria-label={t("Search partners by name")} autoComplete="off" />{search ? <button onClick={() => onSearch("")} aria-label={t("Clear search")}><X size={15} /></button> : <span className="search-shortcut" aria-hidden="true">/</span>}</label>
      <PartnerFilters value={category} onChange={onCategory} />
    </div>
    <div className="partner-scroll" inert={mobile && !expanded && !(dragging && revealing)}><PartnerList partners={partners} selectedId={selectedId} onSelect={onSelect} onClear={onClear} /></div>
  </aside>{collapsed && <button type="button" className="desktop-sidebar-toggle" onClick={onCollapse} aria-label={t("Show partners panel")} aria-expanded={false} aria-controls="partners-panel" title={t("Show partners")}><ChevronRight size={18} /></button>}</>;
}
