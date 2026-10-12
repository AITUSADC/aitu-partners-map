import { useLocalization } from "@/components/Localization";
import { LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";

export function MapControls({ onZoomIn, onZoomOut, onReset, onCampus, preview }: { onZoomIn: () => void; onZoomOut: () => void; onReset: () => void; onCampus: () => void; preview: boolean }) {
  const { t } = useLocalization();
  return <div className="map-controls" aria-label={t("Map controls")}>
    <button onClick={onCampus} title={t("Go to AITU")} aria-label={t("Go to Astana IT University")}><LocateFixed size={19} /></button>
    <div className="zoom-controls"><button onClick={onZoomIn} title={preview ? t("Zoom in schematic preview") : t("Zoom in")} aria-label={t("Zoom in")}><Plus size={19} /></button><button onClick={onZoomOut} title={t("Zoom out")} aria-label={t("Zoom out")}><Minus size={19} /></button></div>
    <button onClick={onReset} title={t("Reset map view")} aria-label={t("Reset map view")}><RotateCcw size={17} /></button>
  </div>;
}
