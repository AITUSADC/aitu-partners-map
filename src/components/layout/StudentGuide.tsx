import { GraduationCap, MapPin, Sparkles } from "lucide-react";
import { Modal } from "../ui/Modal";

export function StudentGuide({ onClose }: { onClose: () => void }) {
  return <Modal title="Student life, with a little extra." onClose={onClose}>
    <span className="modal-eyebrow">THE AITU PARTNER NETWORK</span>
    <p className="modal-description">A city full of possibilities. Discover places around Astana and explore what your student ID could unlock.</p>
    <ol className="guide-steps">
      <li><span><MapPin size={21} /></span><div><h3>01. Find your next spot</h3><p>Search for a partner or pick a category. Select a pin or a place in the list.</p></div></li>
      <li><span><Sparkles size={21} /></span><div><h3>02. Explore the offer</h3><p>Open the offer details to see the benefit, location, and conditions.</p></div></li>
      <li><span><GraduationCap size={21} /></span><div><h3>03. Bring your student ID</h3><p>In a live network, you would show your AITU student ID before paying.</p></div></li>
    </ol>
    {/* <div className="demo-notice">You’re exploring an MVP with 12 fictional partners. All offers and locations are sample data, not redeemable benefits.</div> */}
    <button className="primary-button" onClick={onClose}>Let’s explore</button>
  </Modal>;
}
