import type { Campus } from "../types/campus";

// Buildings supplied by the project owner, separate from the fictional partners.
// Campus coordinates are approximate building/area locations, not verified entrances.
// C1 address: https://astanait.edu.kz/ru/contacts
// C1 coordinates: https://as.bebeshka.info/astana/astana-it-university-1087487/
// EXPO venue: https://2gis.kz/astana/geo/70030076894676907
// Korkem address confirmed by the project owner: Turkistan 14A/1.
// Building coordinates: https://yandex.kz/maps/ru/163/astana/house/turkistan_koshesi_14a_1/Y0gYcgVlTkEHQFtrfX1xdnpmYQ%3D%3D/
export const campuses: readonly Campus[] = [
  {
    id: "expo-c1",
    name: "Главный корпус · EXPO C1",
    shortName: "EXPO C1",
    description: "Главный учебный корпус Astana IT University на территории EXPO, блок C1.",
    address: "пр. Мангилик Ел, 55/11, блок C1",
    latitude: 51.0909,
    longitude: 71.4184,
    isMain: true,
    locationNote: "Приблизительное расположение корпуса.",
  },
  {
    id: "expo-mvc",
    name: "МВЦ · EXPO",
    shortName: "МВЦ",
    description: "Международный выставочный центр рядом с главным корпусом. Здесь также проходят отдельные занятия AITU.",
    address: "пр. Мангилик Ел, 53/1",
    latitude: 51.092933,
    longitude: 71.420898,
    isMain: false,
    locationNote: "Приблизительная точка МВЦ. Аудиторию и вход уточняй по расписанию.",
  },
  {
    id: "korkem",
    name: "Комплекс «Көркем»",
    shortName: "Көркем",
    description: "Новый учебный комплекс AITU возле Ботанического сада.",
    address: "ул. Туркестан, 14А/1",
    latitude: 51.107655,
    longitude: 71.425740,
    isMain: false,
    locationNote: "Точка здания. Нужный вход и аудиторию уточняй по расписанию.",
  },
];

export const MAIN_CAMPUS = campuses[0];
