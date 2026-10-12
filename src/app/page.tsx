import { PartnersExplorer } from "@/components/PartnersExplorer";
import { LocalizationProvider } from "@/components/Localization";

export default function Home() {
  return <LocalizationProvider><PartnersExplorer /></LocalizationProvider>;
}
