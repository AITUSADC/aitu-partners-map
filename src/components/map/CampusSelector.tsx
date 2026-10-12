import { GraduationCap, MapPin } from "lucide-react";
import { campuses } from "@/data/campuses";
import type { Campus } from "@/types/campus";

export function CampusSelector({ campus, onSelect }: { campus: Campus; onSelect: (campus: Campus) => void }) {
  return <section className="campus-selector" aria-label="Корпуса AITU" lang="ru">
    <div className="campus-selector-heading"><GraduationCap size={14} /><span>КОРПУСА AITU</span></div>
    <div className="campus-options" role="group" aria-label="Выбрать корпус">
      {campuses.map((item) => <button key={item.id} aria-pressed={campus.id === item.id} onClick={() => onSelect(item)}>{item.shortName}</button>)}
    </div>
    <div className="campus-info" aria-live="polite"><strong>{campus.name}</strong><span><MapPin size={11} />{campus.address}</span></div>
  </section>;
}
