import { useLocalization } from "@/components/Localization";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Modal } from "../ui/Modal";

export function StudentGuide({ onClose }: { onClose: () => void }) {
  const { t } = useLocalization();
  return <Modal title={t("Student life, with a little extra.")} onClose={onClose}>
    <span className="modal-eyebrow">{t("THE AITU PARTNER NETWORK")}</span>
    <p className="modal-description">{t("A city full of possibilities. Discover places around Astana and explore what your student ID could unlock.")}</p>
    <ol className="guide-steps">
      <li><span><MapPin size={21} /></span><div><h3>{t("01. Find your next spot")}</h3><p>{t("Search for a partner or pick a category. Select a pin or a place in the list.")}</p></div></li>
      <li><span><Sparkles size={21} /></span><div><h3>{t("02. Explore the offer")}</h3><p>{t("Open the offer details to see the benefit, location, and conditions.")}</p></div></li>
      <li><span><GraduationCap size={21} /></span><div><h3>{t("03. Bring your student ID")}</h3><p>{t("In a live network, you would show your AITU student ID before paying.")}</p></div></li>
    </ol>
    {/* <div className="demo-notice">You’re exploring an MVP with 12 fictional partners. All offers and locations are sample data, not redeemable benefits.</div> */}
    <button className="primary-button" onClick={onClose}>{t("Let’s explore")}</button>
  </Modal>;
}
