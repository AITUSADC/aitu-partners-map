import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "AITU partners",
  description: "Explore AITU partner discounts in Astana, including offer conditions and mapped locations.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#030817" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
