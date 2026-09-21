import { BadgeCheck, GraduationCap, MapPin } from "lucide-react";
import type { Partner } from "@/types/partner";
import { Modal } from "../ui/Modal";

export function OfferDetails({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  return <Modal title={partner.name} onClose={onClose}>
    <span className="modal-eyebrow">SAMPLE STUDENT OFFER</span>
    <div className="modal-discount">{partner.discount}<span>{partner.offerLabel}</span></div>
    <p className="modal-description">{partner.description}</p>
    <div className="details-section"><h3><GraduationCap size={17} />How it would work</h3><p>Visit the partner and show your valid AITU student ID before ordering or paying.</p></div>
    <div className="details-section"><h3><BadgeCheck size={17} />Offer terms</h3><p>{partner.terms}</p></div>
    <div className="details-section"><h3><MapPin size={17} />Sample location</h3><p>{partner.location.name}<br />{partner.location.address}, Astana</p></div>
    <div className="demo-notice">This is a fictional partner and offer. Locations are approximate. No real discount or partnership is implied.</div>
    <button className="primary-button" onClick={onClose}>Back to exploring</button>
  </Modal>;
}
