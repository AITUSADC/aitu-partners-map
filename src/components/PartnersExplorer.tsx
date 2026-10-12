"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { partners } from "@/data/partners";
import { MAIN_CAMPUS } from "@/data/campuses";
import type { Campus } from "@/types/campus";
import { filterPartners } from "@/lib/partners";
import type { CategoryFilter, Partner } from "@/types/partner";
import { Header } from "./layout/Header";
import { Sidebar } from "./layout/Sidebar";
import { StudentGuide } from "./layout/StudentGuide";
import { PartnersMap } from "./map/PartnersMap";
import { PartnerCard } from "./partners/PartnerCard";
import { OfferDetails } from "./partners/OfferDetails";

export function PartnersExplorer() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectionVersion, setSelectionVersion] = useState(0);
  const [activeCampus, setActiveCampus] = useState<Campus>(MAIN_CAMPUS);
  const [campusFocusVersion, setCampusFocusVersion] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dialog, setDialog] = useState<"guide" | "details" | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const visiblePartners = useMemo(() => filterPartners(partners, category, search), [category, search]);
  const selectedPartner = visiblePartners.find((partner) => partner.id === selectedId) ?? null;
  const selectPartner = useCallback((partner: Partner) => { setSelectedId(partner.id); setSelectionVersion((value) => value + 1); setExpanded(false); }, []);
  const selectCampus = useCallback((campus: Campus) => { setActiveCampus(campus); setCampusFocusVersion((value) => value + 1); setSelectedId(null); setExpanded(false); }, []);
  const clearFilters = () => { setCategory("all"); setSearch(""); setSelectedId(null); };
  const focusSearch = useCallback(() => { setExpanded(true); setSidebarCollapsed(false); requestAnimationFrame(() => searchRef.current?.focus()); }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(target.tagName) && !target.isContentEditable && !document.querySelector("dialog[open]")) { event.preventDefault(); focusSearch(); }
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) setSelectedId(null);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusSearch]);

  return <main className={`explorer ${selectedPartner ? "has-selection" : ""} ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
    <Header onGuide={() => setDialog("guide")} onExplore={focusSearch} />
    <PartnersMap sidebarCollapsed={sidebarCollapsed} partners={visiblePartners} selectedPartner={selectedPartner} selectionVersion={selectionVersion} onSelect={selectPartner} onReset={() => setSelectedId(null)} activeCampus={activeCampus} campusFocusVersion={campusFocusVersion} onCampusSelect={selectCampus} />
    <Sidebar collapsed={sidebarCollapsed} onCollapse={() => setSidebarCollapsed((value) => !value)} partners={visiblePartners} category={category} search={search} selectedId={selectedPartner?.id} expanded={expanded} searchRef={searchRef} onExpand={() => setExpanded((value) => !value)} onSearch={(value) => { setSearch(value); setSelectedId(null); setExpanded(true); }} onCategory={(value) => { setCategory(value); setSelectedId(null); }} onSelect={selectPartner} onClear={clearFilters} />
    {selectedPartner && <PartnerCard key={selectedPartner.id} partner={selectedPartner} campus={activeCampus} onClose={() => setSelectedId(null)} onDetails={() => setDialog("details")} />}
    {dialog === "guide" && <StudentGuide onClose={() => setDialog(null)} />}
    {dialog === "details" && selectedPartner && <OfferDetails partner={selectedPartner} onClose={() => setDialog(null)} />}
    <span className="sr-only" role="status" aria-live="polite">{visiblePartners.length} partners found{category !== "all" ? ` in ${category}` : ""}{search ? ` matching ${search}` : ""}.</span>
  </main>;
}
