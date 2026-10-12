"use client";

import { useLocalization } from "@/components/Localization";

import { Check, ChevronDown, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { campuses } from "@/data/campuses";
import type { Campus } from "@/types/campus";
import { MotionPresence } from "../ui/MotionPresence";

export function CampusSelector({ campus, onSelect }: { campus: Campus; onSelect: (campus: Campus) => void }) {
  const { t, locale } = useLocalization();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const optionsId = useId();

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return <section ref={root} className="campus-selector" aria-label={t("Корпуса AITU")} lang={locale} onKeyDown={(event) => {
    if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus(); }
  }}>
    <button ref={trigger} type="button" className="campus-trigger" aria-label={`${t("Select campus")}: ${t(campus.shortName)}`} aria-expanded={open} aria-controls={optionsId} onClick={() => setOpen((value) => !value)}>
      <span className="campus-trigger-icon"><GraduationCap size={18} strokeWidth={1.6} /></span>
      <span className="campus-trigger-copy"><small>{t("Корпус AITU")}</small><strong>{t(campus.shortName)}</strong></span>
      <ChevronDown className={`campus-chevron ${open ? "is-open" : ""}`} size={16} />
    </button>
    <MotionPresence open={open}><div id={optionsId} className="campus-options" role="group" aria-label={t("Выбрать корпус")}>
      <p className="campus-options-label">{t("Выбери корпус")}</p>
      {campuses.map((item) => <button type="button" key={item.id} aria-pressed={campus.id === item.id} onClick={() => { onSelect(item); setOpen(false); trigger.current?.focus(); }}>
        <MapPin size={15} className="campus-option-pin" />
        <span className="campus-option-copy"><strong>{t(item.shortName)}{item.isMain && <small>{t("Главный")}</small>}</strong><span>{t(item.address)}</span></span>
        {campus.id === item.id && <Check size={15} className="campus-option-check" />}
      </button>)}
    </div></MotionPresence>
  </section>;
}
