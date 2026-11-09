import { useLocalization } from "@/components/Localization";
import { BadgeCheck, GraduationCap, MapPin } from "lucide-react";
import type { Partner } from "@/types/partner";
import { Modal } from "../ui/Modal";

export function OfferDetails({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const { t } = useLocalization();
  return <Modal title={partner.name} onClose={onClose}>
    <span className="modal-eyebrow">{t("PARTNER OFFER")}</span>
    <div className="modal-discount">{partner.discount}<span>{partner.offerLabel}</span></div>
    <p className="modal-description">{partner.description}</p>
    <div className="details-section"><h3><GraduationCap size={17} />{t("How it works")}</h3><p>{t("Check each offer's terms and show your AITU student ID or use the listed code when required.")}</p></div>
    <div className="details-section"><h3><BadgeCheck size={17} />{t("Offer terms")}</h3><p>{partner.terms}</p></div>
    <div className="details-section"><h3><MapPin size={17} />{t("Partner location")}</h3><p>{partner.location.name}<br />{partner.location.address}{t(", Astana")}</p></div>
    <button className="primary-button" onClick={onClose}>{t("Back to exploring")}</button>
  </Modal>;
}
