import { ArrowRight, GraduationCap, MapPin, Navigation, X } from "lucide-react";
import type { CSSProperties } from "react";
import type { Partner } from "@/types/partner";
import type { Campus } from "@/types/campus";
import { distanceKm } from "@/lib/partners";
import { categoryMeta } from "./categories";

export function PartnerCard({ partner, campus, onClose, onDetails }: { partner: Partner; campus: Campus; onClose: () => void; onDetails: () => void }) {
  const { icon: Icon, label, color } = categoryMeta[partner.category];
  return <section className="partner-card glass-panel" aria-label={`${partner.name} offer`} aria-live="polite">
    <div className="card-topline"><span className="eyebrow"><span className="status-dot" />PARTNER SPOTLIGHT</span><button className="icon-button" aria-label="Close partner card" onClick={onClose}><X size={17} /></button></div>
    <div className="card-identity"><span className="category-icon large" style={{ "--category-color": color } as CSSProperties}><Icon size={27} strokeWidth={1.5} /></span><div><h2>{partner.name}</h2><span>{label}<span className="item-dot">·</span>Sample partner</span></div></div>
    <div className="offer-display"><div>{partner.discount}<span>STUDENT<br />BENEFIT</span></div><p>{partner.offerLabel}</p><span className="offer-orbit" aria-hidden="true" /></div>
    <div className="card-location"><MapPin size={16} /><div><strong>{partner.location.name}</strong><span>{partner.location.address}</span></div></div>
    <p className="card-distance"><Navigation size={12} />{distanceKm(campus, partner.location).toFixed(1)} km · AITU {campus.shortName}<span>straight-line estimate</span></p>
    <div className="card-student-note"><GraduationCap size={15} /><span>A little extra, just for AITU students.</span></div>
    <button className="primary-button" onClick={onDetails}>View offer details<ArrowRight size={17} /></button>
    <p className="sample-caption">Sample offer · for demonstration only</p>
  </section>;
}
