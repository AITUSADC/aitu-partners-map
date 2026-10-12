import { useLocalization } from "@/components/Localization";
import { SearchX } from "lucide-react";
import type { Partner } from "@/types/partner";
import { PartnerListItem } from "./PartnerListItem";

export function PartnerList({ partners, selectedId, onSelect, onClear }: { partners: Partner[]; selectedId?: string; onSelect: (partner: Partner) => void; onClear: () => void }) {
  const { t } = useLocalization();
  if (!partners.length) return <div className="empty-results" role="status"><SearchX size={27} /><h3>{t("No partners found")}</h3><p>{t("Try another name or explore a different category.")}</p><button onClick={onClear}>{t("Clear filters")}</button></div>;
  return <ul className="partner-list" aria-label={t("Partners")}>{partners.map((partner) => <PartnerListItem key={partner.id} partner={partner} selected={partner.id === selectedId} onSelect={onSelect} />)}</ul>;
}
