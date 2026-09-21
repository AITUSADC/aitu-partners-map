import { GraduationCap } from "lucide-react";
import type { Partner } from "@/types/partner";
import type { Campus } from "@/types/campus";

export function PartnerMarker({ partner, selected, onSelect, showLabel = false }: { partner: Partner; selected: boolean; onSelect: (partner: Partner) => void; showLabel?: boolean }) {
  return <button className={`network-marker ${selected ? "is-selected" : ""} ${showLabel ? "show-label" : ""}`} onClick={() => onSelect(partner)} aria-label={`${partner.name}, ${partner.discount} student offer`} aria-pressed={selected}>
    <span className="marker-ring" /><span className="marker-core" /><span className="marker-label">{partner.name}<span>{partner.discount.includes("%") ? `−${partner.discount}` : partner.discount}</span></span>
  </button>;
}

export function CampusMarker({ campus, selected, onSelect }: { campus: Campus; selected: boolean; onSelect: (campus: Campus) => void }) {
  return <button type="button" className={`campus-marker campus-${campus.id} ${selected ? "is-active" : ""}`} aria-label={`AITU: ${campus.name}`} aria-pressed={selected} onClick={() => onSelect(campus)} title={`${campus.description} ${campus.locationNote}`} lang="ru"><span className="campus-orbit" /><span className="campus-core"><GraduationCap size={20} strokeWidth={1.6} /></span><span className="campus-label">AITU · {campus.shortName}{campus.isMain && <small>Главный корпус</small>}</span></button>;
}

// Mapbox owns the positioning wrapper; CSS transforms only affect its children.
// Text is assigned with textContent so partner data never becomes HTML.
export function createPartnerMarker(partner: Partner, onSelect: () => void): { element: HTMLDivElement; button: HTMLButtonElement } {
  const element = document.createElement("div");
  const button = document.createElement("button");
  button.className = "network-marker";
  button.setAttribute("aria-label", `${partner.name}, ${partner.discount} student offer`);
  const ring = document.createElement("span"); ring.className = "marker-ring";
  const core = document.createElement("span"); core.className = "marker-core";
  const label = document.createElement("span"); label.className = "marker-label"; label.textContent = partner.name;
  const discount = document.createElement("span"); discount.textContent = partner.discount.includes("%") ? `−${partner.discount}` : partner.discount;
  label.append(discount); button.append(ring, core, label); element.append(button);
  button.addEventListener("click", onSelect);
  return { element, button };
}
