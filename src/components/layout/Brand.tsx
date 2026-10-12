import { useLocalization } from "@/components/Localization";
import Image from "next/image";

export function Brand({ compact = false }: { compact?: boolean }) {
  const { t } = useLocalization();
  return <span className={`brand ${compact ? "brand-compact" : ""}`}>
    <Image className="brand-mark" src="/branding/aitu-logo-light.png" width={5741} height={6728} sizes="34px" alt="" aria-hidden="true" loading="eager" />
    {!compact && <span className="brand-wordmark"><strong>AITU<span>PARTNERS</span></strong><small>{t("A little more to student life.")}</small></span>}
  </span>;
}
