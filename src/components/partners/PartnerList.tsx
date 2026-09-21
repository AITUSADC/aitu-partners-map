import { SearchX } from "lucide-react";
import type { Partner } from "@/types/partner";
import { PartnerListItem } from "./PartnerListItem";

export function PartnerList({ partners, selectedId, onSelect, onClear }: { partners: Partner[]; selectedId?: string; onSelect: (partner: Partner) => void; onClear: () => void }) {
  if (!partners.length) return <div className="empty-results" role="status"><SearchX size={27} /><h3>No partners found</h3><p>Try another name or explore a different category.</p><button onClick={onClear}>Clear filters</button></div>;
  return <ul className="partner-list" aria-label="Partners">{partners.map((partner) => <PartnerListItem key={partner.id} partner={partner} selected={partner.id === selectedId} onSelect={onSelect} />)}</ul>;
}
