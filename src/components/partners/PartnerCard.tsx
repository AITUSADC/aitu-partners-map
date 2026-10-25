import { useLocalization } from "@/components/Localization";
import { ArrowRight, ArrowUpRight, Check, Map as MapIcon, MapPin, Navigation, X } from "lucide-react";
import { useId, type CSSProperties } from "react";
import { campuses } from "@/data/campuses";
import type { Partner } from "@/types/partner";
import type { Campus } from "@/types/campus";
import { distanceKm } from "@/lib/partners";
import { getDirectionsUrl } from "@/lib/directions";
import { categoryMeta } from "./categories";

export function PartnerCard({ partner, campus, onCampusChange, onClose, onDetails }: { partner: Partner; campus: Campus; onCampusChange: (campus: Campus) => void; onClose: () => void; onDetails: () => void }) {
  const { t } = useLocalization();
  const campusSelectId = useId();
  const { icon: Icon, label, color } = categoryMeta[partner.category];
  const distance = `${distanceKm(campus, partner.location).toFixed(1)} ${t("km · AITU")} ${t(campus.shortName)}`;
  return <section className="partner-card glass-panel" aria-label={`${partner.name} — ${t("offer")}`} aria-live="polite">
    <button className="icon-button card-close" aria-label={t("Close partner card")} onClick={onClose}><X size={17} /></button>
    <div className="partner-card-content">
    <div className="card-identity"><span className="category-icon large" style={{ "--category-color": color } as CSSProperties}><Icon size={27} strokeWidth={1.5} /></span><div><h2>{partner.name}</h2><span>{t(label)}</span></div></div>
    <div className="offer-display"><div>{partner.discount}</div><p>{partner.offerLabel}</p><span className="offer-orbit" aria-hidden="true" /></div>
    <div className="card-location"><MapPin size={16} /><div><strong>{partner.location.name}</strong><span>{partner.location.address}</span></div></div>
    <p className="card-distance" title={t("straight-line estimate")} aria-label={`${distance}, ${t("straight-line estimate")}`}><Navigation size={12} aria-hidden="true" />≈ {distance}</p>
    </div>
    <div className="card-actions">
    <button className="offer-details-button" onClick={onDetails}>{t("Offer details")}<ArrowRight size={16} aria-hidden="true" /></button>
    <fieldset className="route-origin">
      <legend>{t("From campus")}</legend>
      <div className="route-campus-options">
        {campuses.map((item) => <label className="route-campus-option" key={item.id} title={`${t(item.name)} — ${t(item.address)}`}>
          <input className="sr-only" type="radio" name={`${campusSelectId}-origin`} value={item.id} checked={campus.id === item.id} onChange={() => onCampusChange(item)} />
          <span className="route-campus-choice"><Check className="route-campus-check" size={13} strokeWidth={2.5} aria-hidden="true" /><span>{t(item.shortName)}</span></span>
        </label>)}
      </div>
    </fieldset>
    <a className="primary-button route-button" href={getDirectionsUrl(campus, partner.location)} target="_blank" rel="noopener noreferrer" aria-label={`${t("Create route")} (${t("Bus")}): AITU ${t(campus.shortName)} → ${partner.name}. ${t("Opens 2GIS in a new tab")}`}>
      <span className="route-button-label"><MapIcon size={18} aria-hidden="true" /><span>{t("Create route")}</span></span><span className="route-provider">2GIS<ArrowUpRight size={17} aria-hidden="true" /></span>
    </a>
    </div>
  </section>;
}
