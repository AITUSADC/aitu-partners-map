import type { StyleSpecification } from "mapbox-gl";

// A deliberately small style: no POIs, commercial labels, or transit markers.
export const astanaMapStyle: StyleSpecification = {
  version: 8,
  name: "AITU Midnight",
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  sources: { astana: { type: "vector", url: "mapbox://mapbox.mapbox-streets-v8" } },
  layers: [
    { id: "background", type: "background", paint: { "background-color": "#071221" } },
    { id: "land", type: "fill", source: "astana", "source-layer": "landuse", paint: { "fill-color": ["match", ["get", "class"], ["park", "wood", "grass"], "#0a2029", "#091827"], "fill-opacity": 0.8 } },
    { id: "water", type: "fill", source: "astana", "source-layer": "water", paint: { "fill-color": "#062e43" } },
    { id: "waterways", type: "line", source: "astana", "source-layer": "waterway", paint: { "line-color": "#0b344a", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 16, 7] } },
    { id: "buildings", type: "fill", source: "astana", "source-layer": "building", minzoom: 11.5, paint: { "fill-color": "#10263a", "fill-outline-color": "#193448", "fill-opacity": 0.65 } },
    { id: "minor-roads", type: "line", source: "astana", "source-layer": "road", filter: ["!", ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]]], layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#18334a", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.4, 14, 1.5, 18, 7] } },
    { id: "major-road-casing", type: "line", source: "astana", "source-layer": "road", filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]], layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#0e3249", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 3, 14, 7, 18, 18], "line-opacity": 0.55 } },
    { id: "major-roads", type: "line", source: "astana", "source-layer": "road", filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]], layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#24617c", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 14, 2.4, 18, 10], "line-opacity": 0.8 } },
    { id: "district-labels", type: "symbol", source: "astana", "source-layer": "place_label", minzoom: 9, maxzoom: 15, filter: ["in", ["get", "type"], ["literal", ["suburb", "neighbourhood", "quarter", "city"]]], layout: { "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]], "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"], "text-size": ["match", ["get", "type"], "city", 20, 11], "text-letter-spacing": 0.2, "text-transform": "uppercase" }, paint: { "text-color": "#688ba4", "text-halo-color": "#071221", "text-halo-width": 2 } },
    { id: "road-labels", type: "symbol", source: "astana", "source-layer": "road", minzoom: 12, filter: ["in", ["get", "class"], ["literal", ["motorway", "trunk", "primary", "secondary"]]], layout: { "symbol-placement": "line", "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]], "text-font": ["DIN Pro Regular", "Arial Unicode MS Regular"], "text-size": 10, "symbol-spacing": 350, "text-max-angle": 25 }, paint: { "text-color": "#65869b", "text-halo-color": "#071221", "text-halo-width": 2 } },
  ],
};
