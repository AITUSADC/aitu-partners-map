import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AITU Partners — Your city. Your benefits.",
  description: "Explore the AITU partner network in Astana. A frontend demonstration of exclusive student offers across food, coffee, sport, and more.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#030817" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
