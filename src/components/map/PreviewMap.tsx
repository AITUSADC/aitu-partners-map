"use client";

import { useLocalization } from "@/components/Localization";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { Partner } from "@/types/partner";
import { campuses } from "@/data/campuses";
import type { Campus } from "@/types/campus";
import { CampusMarker, PartnerMarker } from "./PartnerMarker";

export interface PreviewMapHandle { zoom: (delta: number) => void; reset: () => void; campus: (campus: Campus) => void }

function project(location: { longitude: number; latitude: number }) {
  return { x: ((location.longitude - 71.375) / 0.11) * 1200, y: ((51.183 - location.latitude) / 0.115) * 900 };
}

const river = "M-100 247 C120 90 236 132 345 206 S473 400 654 338 S810 211 917 295 S1086 408 1300 320";
// Illustrative geometry only. This deliberately does not claim to be geographic map data.
const blocks = Array.from({ length: 420 }, (_, index) => {
  const col = index % 24; const row = Math.floor(index / 24);
  return { x: col * 62 - 140 + (row % 2) * 6, y: row * 57 - 90, w: 29 + (index * 13 % 17), h: 18 + (index * 7 % 23) };
});
const roads = [
  "M320 -80 401 197 470 329 544 505 696 980", "M550 -80 597 196 680 362 762 515 914 980", "M22 15 143 310 270 546 466 1000", "M875 -60 895 228 1038 529 1158 960",
  "M-150 470 214 375 492 299 843 188 1230 119", "M-80 750 263 633 593 521 965 394 1320 312", "M-70 971 369 815 734 697 1062 614 1330 550",
  "M-60 160 237 103 486 43 805 -48", "M-120 575 268 461 623 409 1033 514 1300 474",
];

export const PreviewMap = forwardRef<PreviewMapHandle, { partners: Partner[]; selectedId?: string; onSelect: (partner: Partner) => void; activeCampus: Campus; onCampusSelect: (campus: Campus) => void }>(function PreviewMap({ partners, selectedId, onSelect, activeCampus, onCampusSelect }, ref) {
  const { t } = useLocalization();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [camera, setCamera] = useState({ zoom: 1, x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  useImperativeHandle(ref, () => ({
    zoom: (delta) => setCamera((current) => ({ ...current, zoom: Math.min(2.3, Math.max(0.75, current.zoom + delta)) })),
    reset: () => setCamera({ zoom: 1, x: 0, y: 0 }),
    campus: (location) => {
      const scene = sceneRef.current;
      if (!scene) return;
      const point = project(location);
      const zoom = 1.8;
      setCamera({ zoom, x: (0.5 - point.x / 1200) * scene.clientWidth * zoom, y: (0.5 - point.y / 900) * scene.clientHeight * zoom });
    },
  }), []);
  const selected = partners.find((partner) => partner.id === selectedId);
  const selectedPoint = selected ? project(selected.location) : null;
  const campus = project(activeCampus);
  return <div className="preview-map" aria-label={t("Illustrative Astana network preview. Add a Mapbox token for the real map.")}
    onPointerDown={(event) => { if ((event.target as HTMLElement).closest?.("button")) return; drag.current = { x: event.clientX, y: event.clientY, startX: camera.x, startY: camera.y }; event.currentTarget.setPointerCapture(event.pointerId); }}
    onPointerMove={(event) => { const start = drag.current; if (start) setCamera((current) => ({ ...current, x: start.startX + event.clientX - start.x, y: start.startY + event.clientY - start.y })); }}
    onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
    <div ref={sceneRef} className="preview-scene" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }}>
      <svg className="preview-geography" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
        <defs><pattern id="map-grid" width="62" height="57" patternUnits="userSpaceOnUse"><path d="M62 0H0V57" fill="none" stroke="#1b3447" strokeWidth="1" /></pattern><linearGradient id="river-fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#09364b" /><stop offset="1" stopColor="#08293d" /></linearGradient></defs>
        <g transform="rotate(-21 600 450)"><rect x="-500" y="-500" width="2200" height="2000" fill="url(#map-grid)" opacity=".58" />{blocks.map((block, index) => <rect key={index} x={block.x} y={block.y} width={block.w} height={block.h} rx="2" fill={index % 7 === 0 ? "#0b2430" : "#0d2031"} stroke="#142a3d" strokeWidth=".7" />)}</g>
        <path d="M190 557 340 511 463 779 316 838Z" fill="#0a242a" stroke="#143b40" opacity=".65" />
        <path d="M846 40 981 47 1055 191 910 212Z" fill="#0a242a" opacity=".7" />
        <path d={river} fill="none" stroke="#124455" strokeWidth="48" /><path d={river} fill="none" stroke="url(#river-fill)" strokeWidth="43" />
        {roads.map((road, index) => <g key={index}><path d={road} fill="none" stroke="#0c1c2a" strokeWidth="9" /><path d={road} fill="none" stroke={index < 4 ? "#23516a" : "#1c4259"} strokeWidth={index < 4 ? 2.1 : 1.7} /></g>)}
        <g fill="#58788d" fontFamily="sans-serif" fontSize="9" letterSpacing="2"><text x="338" y="116">{t("SARYARKA DISTRICT")}</text><text x="846" y="540">{t("ALMATY DISTRICT")}</text><text x="307" y="550" transform="rotate(-21 307 550)">{t("YESIL DISTRICT")}</text><text x="720" y="803">{t("EXPO DISTRICT")}</text></g>
        <g fill="#658397" fontFamily="sans-serif" fontSize="9"><text x="356" y="446" transform="rotate(-18 356 446)">{t("Dostyk Street")}</text><text x="671" y="620" transform="rotate(69 671 620)">{t("Mangilik El Avenue")}</text><text x="212" y="635" transform="rotate(65 212 635)">{t("Kabanbay Batyr Avenue")}</text><text x="866" y="400" transform="rotate(-19 866 400)">{t("Tauelsizdik Avenue")}</text><text x="676" y="288" transform="rotate(-17 676 288)" letterSpacing="3" fill="#528ca2">{t("YESIL RIVER")}</text></g>
        <g transform="translate(614 431)" opacity=".48"><circle r="9" fill="none" stroke="#53788b" /><path d="M0-16V16M-16 0H16" stroke="#53788b" /><text x="18" y="4" fill="#69859b" fontSize="10">{t("Bayterek")}</text></g>
        {selectedPoint && <path d={`M${campus.x} ${campus.y} Q${campus.x - 70} ${selectedPoint.y} ${selectedPoint.x} ${selectedPoint.y}`} fill="none" stroke="#00d9ff" strokeWidth="1.5" strokeDasharray="5 7" opacity=".28" />}
      </svg>
      {partners.map((partner) => { const point = project(partner.location); return <div key={partner.id} className={`preview-marker-position ${selectedId === partner.id ? "selected" : ""}`} style={{ left: `${point.x / 12}%`, top: `${point.y / 9}%` }}><PartnerMarker partner={partner} selected={selectedId === partner.id} onSelect={onSelect} showLabel={["urban-coffee", "cinema-point", "code-corner"].includes(partner.id)} /></div>; })}
      {campuses.map((item) => { const point = project(item); return <div key={item.id} className="preview-marker-position campus-position" style={{ left: `${point.x / 12}%`, top: `${point.y / 9}%` }}><CampusMarker campus={item} selected={activeCampus.id === item.id} onSelect={onCampusSelect} /></div>; })}
    </div>
  </div>;
});
