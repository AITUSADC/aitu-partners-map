"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { GeoJSONSource, Map as MapboxMap, Marker } from "mapbox-gl";
import type { FeatureCollection, LineString } from "geojson";
import type { Partner } from "@/types/partner";
import { ASTANA_VIEW } from "@/data/partners";
import { campuses } from "@/data/campuses";
import type { Campus } from "@/types/campus";
import { CampusSelector } from "./CampusSelector";
import { astanaMapStyle } from "./map-style";
import { CampusMarker, createPartnerMarker } from "./PartnerMarker";
import { PreviewMap, type PreviewMapHandle } from "./PreviewMap";
import { MapControls } from "./MapControls";
import { MapNotice } from "./MapNotice";

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim();
const emptyConnection: FeatureCollection<LineString> = { type: "FeatureCollection", features: [] };
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function mapPadding(selected = false) {
  if (window.innerWidth < 1024) return { top: 110, right: 35, bottom: Math.min(selected ? 360 : 100, window.innerHeight * 0.47), left: 35 };
  return { top: 100, right: selected && window.innerWidth > 1100 ? 380 : 65, bottom: 90, left: document.querySelector(".explorer.sidebar-collapsed") ? 80 : 390 };
}

interface PartnersMapProps {
  sidebarCollapsed: boolean;
  partners: Partner[]; selectedPartner: Partner | null; selectionVersion: number;
  onSelect: (partner: Partner) => void; onReset: () => void;
  activeCampus: Campus; campusFocusVersion: number; onCampusSelect: (campus: Campus) => void;
}

export function PartnersMap({ sidebarCollapsed, partners, selectedPartner, selectionVersion, onSelect, onReset, activeCampus, campusFocusVersion, onCampusSelect }: PartnersMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const mapboxRef = useRef<typeof import("mapbox-gl").default | null>(null);
  const markerRefs = useRef(new Map<string, { marker: Marker; button: HTMLButtonElement }>());
  const previewRef = useRef<PreviewMapHandle>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string>();
  const [retry, setRetry] = useState(0);
  const [campusElements, setCampusElements] = useState<{ campus: Campus; element: HTMLDivElement }[]>([]);
  const preview = !token || !!error;

  useEffect(() => {
    if (ready && mapRef.current) mapRef.current.setPadding(mapPadding(!!selectedPartner));
  }, [sidebarCollapsed, ready, selectedPartner]);

  useEffect(() => {
    if (!container.current || !token) return;
    let cancelled = false;
    let instance: MapboxMap | null = null;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const markerStore = markerRefs.current;

    async function initialize() {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (cancelled || !container.current) return;
        mapboxRef.current = mapboxgl;
        instance = new mapboxgl.Map({
          container: container.current, accessToken: token,
          style: astanaMapStyle,
          center: [ASTANA_VIEW.longitude, ASTANA_VIEW.latitude],
          zoom: ASTANA_VIEW.zoom, pitch: ASTANA_VIEW.pitch, bearing: ASTANA_VIEW.bearing,
          minZoom: 9, maxZoom: 18,
          maxBounds: [[70.95, 50.85], [71.95, 51.5]],
          attributionControl: false,
          logoPosition: "bottom-right",
        });
        mapRef.current = instance;
        instance.jumpTo({ padding: mapPadding() });
        instance.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
        timeout = setTimeout(() => { if (!cancelled) setError("The map is taking too long to connect."); }, 20000);
        instance.on("error", (event) => {
          if (cancelled) return;
          const message = event.error?.message || "";
          if (/401|403|token|unauthorized|forbidden/i.test(message)) {
            clearTimeout(timeout);
            setError("Your Mapbox token could not be authorized.");
          }
        });
        instance.on("load", () => {
          if (cancelled || !instance) return;
          clearTimeout(timeout);
          instance.addSource("aitu-connection", { type: "geojson", data: emptyConnection });
          instance.addLayer({ id: "aitu-connection", type: "line", source: "aitu-connection", layout: { "line-cap": "round" }, paint: { "line-color": "#00d9ff", "line-width": 1.5, "line-opacity": 0.26, "line-dasharray": [3, 4] } });
          const loadedMap = instance;
          setCampusElements(campuses.map((campus) => {
            const element = document.createElement("div");
            element.style.zIndex = "3";
            new mapboxgl.Marker({ element }).setLngLat([campus.longitude, campus.latitude]).addTo(loadedMap);
            return { campus, element };
          }));
          setError(undefined);
          setReady(true);
        });
      } catch {
        if (!cancelled) setError("This browser could not initialize the live map.");
      }
    }
    void initialize();
    return () => {
      cancelled = true; clearTimeout(timeout);
      markerStore.forEach(({ marker }) => marker.remove()); markerStore.clear();
      instance?.remove(); mapRef.current = null;
    };
  }, [retry]);

  useEffect(() => {
    if (!ready || !mapRef.current || !mapboxRef.current) return;
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;
    const markers = markerRefs.current;
    const ids = new Set(partners.map((partner) => partner.id));
    markers.forEach(({ marker }, id) => { if (!ids.has(id)) { marker.remove(); markers.delete(id); } });
    for (const partner of partners) {
      if (markers.has(partner.id)) continue;
      const { element, button } = createPartnerMarker(partner, () => onSelect(partner));
      const marker = new mapboxgl.Marker({ element }).setLngLat([partner.location.longitude, partner.location.latitude]).addTo(map);
      button.setAttribute("aria-pressed", "false");
      markers.set(partner.id, { marker, button });
    }
  }, [partners, ready, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!ready || !map) return;
    markerRefs.current.forEach(({ button, marker }, id) => {
      const selected = selectedPartner?.id === id;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
      marker.getElement().style.zIndex = selected ? "5" : "1";
    });
    const connection = map.getSource<GeoJSONSource>("aitu-connection");
    connection?.setData(selectedPartner ? { type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [[activeCampus.longitude, activeCampus.latitude], [selectedPartner.location.longitude, selectedPartner.location.latitude]] } }] } : emptyConnection);
    if (selectedPartner) map.flyTo({ center: [selectedPartner.location.longitude, selectedPartner.location.latitude], zoom: 13.7, padding: mapPadding(true), duration: reducedMotion() ? 0 : 1400, essential: false });
  }, [selectedPartner, selectionVersion, ready, activeCampus]);

  useEffect(() => {
    if (campusFocusVersion === 0) return;
    if (preview) previewRef.current?.campus(activeCampus);
    else if (ready) mapRef.current?.flyTo({ center: [activeCampus.longitude, activeCampus.latitude], zoom: 15, padding: mapPadding(), duration: reducedMotion() ? 0 : 1200 });
  }, [activeCampus, campusFocusVersion, ready, preview]);

  function resetMap() {
    onReset();
    if (preview) previewRef.current?.reset();
    else mapRef.current?.flyTo({ center: [ASTANA_VIEW.longitude, ASTANA_VIEW.latitude], zoom: ASTANA_VIEW.zoom, pitch: ASTANA_VIEW.pitch, bearing: ASTANA_VIEW.bearing, padding: mapPadding(), duration: reducedMotion() ? 0 : 1200 });
  }

  function goToCampus() {
    onCampusSelect(activeCampus);
  }

  return <section className={`map-surface${" map-local-preview" }`} aria-label="Astana partner map">
    <div ref={container} className={`mapbox-container ${preview ? "map-hidden" : ""}`} />
    {preview && <PreviewMap ref={previewRef} partners={partners} selectedId={selectedPartner?.id} onSelect={onSelect} activeCampus={activeCampus} onCampusSelect={onCampusSelect} />}
    {!preview && !ready && <div className="map-loading"><span className="loading-ring" /><strong>Connecting to Astana</strong><span>Your next favorite spot is on the map.</span></div>}
    {!preview && campusElements.map(({ campus, element }) => createPortal(<CampusMarker campus={campus} selected={activeCampus.id === campus.id} onSelect={onCampusSelect} />, element, campus.id))}
    <div className="map-vignette" />
    <div className="map-location-label"><span className="eyebrow"><span className="status-dot" />AITU PARTNER NETWORK</span></div>
    {preview && <MapNotice error={error} onRetry={token ? () => { setReady(false); setError(undefined); setCampusElements([]); setRetry((value) => value + 1); } : undefined} />}
    <CampusSelector campus={activeCampus} onSelect={onCampusSelect} />
    <MapControls preview={preview} onZoomIn={() => preview ? previewRef.current?.zoom(0.2) : mapRef.current?.zoomIn({ duration: reducedMotion() ? 0 : 250 })} onZoomOut={() => preview ? previewRef.current?.zoom(-0.2) : mapRef.current?.zoomOut({ duration: reducedMotion() ? 0 : 250 })} onReset={resetMap} onCampus={goToCampus} />
  </section>;
}
