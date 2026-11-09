import type { Partner } from "../types/partner";

// Map markers use the mapped building points, not exact business entrances.
export { MAIN_CAMPUS as AITU_LOCATION } from "./campuses.ts";

export const ASTANA_VIEW = {
  longitude: 71.4304,
  latitude: 51.1282,
  zoom: 11.5,
  pitch: 38,
  bearing: -4,
};

export const partners: Partner[] = [
  {
    id: "aki-time",
    name: "Aki Time",
    category: "entertainment",
    discount: "20%",
    offerLabel: "partner discount",
    description: "An anti-café for spending time and playing games.",
    terms: "The source table lists a 20% discount but does not specify eligibility or how to claim it.",
    location: {
      name: "Turkistan Street",
      address: "Turkistan Street, 10",
      latitude: 51.111273,
      longitude: 71.426744,
    },
  },
  {
    id: "asgard-cyber-club",
    name: "Asgard Cyber Club",
    category: "entertainment",
    discount: "15%",
    offerLabel: "with student ID",
    description: "A computer club for gaming sessions.",
    terms: "Present your student ID for 15% off.",
    location: {
      name: "Mangilik El Avenue",
      address: "Mangilik El Avenue, 51/4",
      latitude: 51.094317,
      longitude: 71.423155,
    },
  },
  {
    id: "alan-cyber-club",
    name: "ALAN Cyber Club",
    category: "entertainment",
    discount: "15%",
    offerLabel: "with student ID",
    description: "A computer club for gaming sessions.",
    terms: "Present your student ID for 15% off gaming packages.",
    location: {
      name: "Bukhar Zhyrau Street",
      address: "Bukhar Zhyrau Street, 19",
      latitude: 51.100677,
      longitude: 71.426497,
    },
  },
  {
    id: "imperator-playstation",
    name: "Imperator PlayStation",
    category: "entertainment",
    discount: "15%",
    offerLabel: "with code AITUPOWER",
    description: "PlayStation gaming club.",
    terms: "Use code AITUPOWER for 15% off.",
    location: {
      name: "Alihan Bokeikhan Street",
      address: "Alihan Bokeikhan Street, 6",
      latitude: 51.116909,
      longitude: 71.438815,
    },
  },
  {
    id: "luna-coffee",
    name: "Luna Coffee",
    category: "coffee",
    discount: "10%",
    offerLabel: "with student ID",
    description: "Coffee shop chain. 2GIS lists branches at Mangilik El Avenue, 37 and 40; Turan Avenue, 52/2; Tauelsizdik Avenue, 34/6; and Taha Khusein Street, 1a.",
    terms: "Present your student ID for 10% off.",
    location: {
      name: "Mangilik El Avenue",
      address: "Mangilik El Avenue, 37",
      latitude: 51.103367,
      longitude: 71.429098,
    },
  },
  {
    id: "metaforce",
    name: "MetaForce",
    category: "entertainment",
    discount: "15%",
    offerLabel: "with student ID",
    description: "Virtual reality arena with team games. 2GIS lists branches at K. Mukhamedkhanov Street, 17 and Ahmet Baitursynuly Street, 33/2.",
    terms: "Present your student ID for 15% off.",
    location: {
      name: "K. Mukhamedkhanov Street",
      address: "K. Mukhamedkhanov Street, 17",
      latitude: 51.141633,
      longitude: 71.38737,
    },
  },
];
