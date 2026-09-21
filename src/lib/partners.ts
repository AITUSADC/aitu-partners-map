import type { CategoryFilter, Partner } from "../types/partner";

export function filterPartners(partners: readonly Partner[], category: CategoryFilter, search: string): Partner[] {
  const query = search.trim().toLocaleLowerCase();
  return partners.filter((partner) =>
    (category === "all" || partner.category === category) &&
    partner.name.toLocaleLowerCase().includes(query),
  );
}

export function distanceKm(from: { latitude: number; longitude: number }, to: { latitude: number; longitude: number }): number {
  const radians = (degrees: number) => degrees * Math.PI / 180;
  const latDelta = radians(to.latitude - from.latitude);
  const lngDelta = radians(to.longitude - from.longitude);
  const a = Math.sin(latDelta / 2) ** 2 + Math.cos(radians(from.latitude)) * Math.cos(radians(to.latitude)) * Math.sin(lngDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
