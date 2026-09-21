import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import type { Partner } from "@/types/partner";
import { categoryMeta } from "./categories";

export function PartnerListItem({ partner, selected, onSelect }: { partner: Partner; selected: boolean; onSelect: (partner: Partner) => void }) {
  const { icon: Icon, label, color } = categoryMeta[partner.category];
  return <li>
    <button className={`partner-list-item ${selected ? "selected" : ""}`} onClick={() => onSelect(partner)} aria-pressed={selected}>
      <span className="category-icon" style={{ "--category-color": color } as CSSProperties}><Icon size={20} strokeWidth={1.6} /></span>
      <span className="partner-list-copy"><strong>{partner.name}</strong><span>{label}<span className="item-dot">·</span>{partner.location.name}</span></span>
      <span className="discount-pill">{partner.discount.includes("%") ? `−${partner.discount}` : partner.discount}</span>
      <ChevronRight size={13} className="item-chevron" />
    </button>
  </li>;
}
