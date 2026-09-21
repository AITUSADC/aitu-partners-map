import { KeyRound, RefreshCw, TriangleAlert } from "lucide-react";

export function MapNotice({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  return <div className="map-notice" role="status">
    <span className="map-notice-icon">{error ? <TriangleAlert size={17} /> : <KeyRound size={17} />}</span>
    <div><strong>{error ? "Live map unavailable" : "Mapbox token required"}</strong><p>{error || <>Add <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to <code>.env.local</code></>}</p><small>{error ? "Check your connection and public token, then retry." : "Restart the dev server to connect the live map."} Schematic preview below.</small></div>
    {onRetry && <button className="icon-button" onClick={onRetry} aria-label="Retry live map" title="Retry live map"><RefreshCw size={16} /></button>}
  </div>;
}
