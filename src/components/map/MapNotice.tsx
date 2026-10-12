import { useLocalization } from "@/components/Localization";
import { KeyRound, RefreshCw, TriangleAlert } from "lucide-react";

export function MapNotice({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  const { t } = useLocalization();
  return <div className="map-notice" role="status">
    <span className="map-notice-icon">{error ? <TriangleAlert size={17} /> : <KeyRound size={17} />}</span>
    <div><strong>{error ? t("Live map unavailable") : t("Mapbox token required")}</strong><p>{(error ? t(error) : null) || <>{t("Add")} <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> {t("to")} <code>.env.local</code></>}</p><small>{error ? t("Check your connection and public token, then retry.") : t("Restart the dev server to connect the live map.")} {t("Schematic preview below.")}</small></div>
    {onRetry && <button className="icon-button" onClick={onRetry} aria-label={t("Retry live map")} title={t("Retry live map")}><RefreshCw size={16} /></button>}
  </div>;
}
