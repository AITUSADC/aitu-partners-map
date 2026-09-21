import { LocateFixed, Minus, Plus, RotateCcw } from "lucide-react";

export function MapControls({ onZoomIn, onZoomOut, onReset, onCampus, preview }: { onZoomIn: () => void; onZoomOut: () => void; onReset: () => void; onCampus: () => void; preview: boolean }) {
  return <div className="map-controls" aria-label="Map controls">
    <button onClick={onCampus} title="Go to AITU" aria-label="Go to Astana IT University"><LocateFixed size={19} /></button>
    <div className="zoom-controls"><button onClick={onZoomIn} title={preview ? "Zoom in schematic preview" : "Zoom in"} aria-label="Zoom in"><Plus size={19} /></button><button onClick={onZoomOut} title="Zoom out" aria-label="Zoom out"><Minus size={19} /></button></div>
    <button onClick={onReset} title="Reset map view" aria-label="Reset map view"><RotateCcw size={17} /></button>
  </div>;
}
