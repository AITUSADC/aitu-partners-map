import { useLocalization } from "@/components/Localization";
import { BadgeCheck, GraduationCap, MapPin } from "lucide-react";
import type { Partner } from "@/types/partner";
import { Modal } from "../ui/Modal";

export function OfferDetails({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const { t } = useLocalization();
  return <Modal title={partner.name} onClose={onClose}>
    <span className="modal-eyebrow">{t("SAMPLE STUDENT OFFER")}</span>
    <div className="modal-discount">{partner.discount}<span>{partner.offerLabel}</span></div>
    <p className="modal-description">{partner.description}</p>
    <div className="details-section"><h3><GraduationCap size={17} />{t("How it would work")}</h3><p>{t("Visit the partner and show your valid AITU student ID before ordering or paying.")}</p></div>
    <div className="details-section"><h3><BadgeCheck size={17} />{t("Offer terms")}</h3><p>{partner.terms}</p></div>
    <div className="details-section"><h3><MapPin size={17} />{t("Sample location")}</h3><p>{partner.location.name}<br />{partner.location.address}{t(", Astana")}</p></div>
    <div className="demo-notice">{t("This is a fictional partner and offer. Locations are approximate. No real discount or partnership is implied.")}</div>
    <button className="primary-button" onClick={onClose}>{t("Back to exploring")}</button>
  </Modal>;
}
