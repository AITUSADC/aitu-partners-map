import { useLocalization } from "@/components/Localization";
import { MapPin } from "lucide-react";
import type { Partner } from "@/types/partner";
import { Modal } from "../ui/Modal";

export function OfferDetails({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const { t } = useLocalization();
  return <Modal title={partner.name} onClose={onClose}>
    <span className="modal-eyebrow">{t("PARTNER OFFER")}</span>
    <div className="modal-discount">{partner.discount}<span>{partner.offerLabel}</span></div>
    <div className="details-section"><h3><MapPin size={17} />{t("Partner location")}</h3><p>{partner.description}</p></div>
    <button className="primary-button" onClick={onClose}>{t("Back to exploring")}</button>
  </Modal>;
}
