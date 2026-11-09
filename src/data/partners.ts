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
      latitude: 51.110771,
      longitude: 71.426198,
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
      latitude: 51.094127,
      longitude: 71.423054,
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
      latitude: 51.100507,
      longitude: 71.42636,
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
      latitude: 51.116329,
      longitude: 71.439763,
    },
  },
  {
    id: "luna-coffee",
    name: "Luna Coffee",
    category: "coffee",
    discount: "10%",
    offerLabel: "with student ID",
    description: "Coffee shop chain. Another mapped branch is at Mangilik El Avenue, 40.",
    terms: "Present your student ID for 10% off.",
    location: {
      name: "Mangilik El Avenue",
      address: "Mangilik El Avenue, 37",
      latitude: 51.103685,
      longitude: 71.428722,
    },
  },
  {
    id: "metaforce",
    name: "MetaForce",
    category: "entertainment",
    discount: "15%",
    offerLabel: "with student ID",
    description: "Virtual reality arena with team games. Another branch is at Ahmet Baitursynuly Street, 33/2.",
    terms: "Present your student ID for 15% off.",
    location: {
      name: "K. Mukhamedkhanov Street",
      address: "K. Mukhamedkhanov Street, 17",
      latitude: 51.140854,
      longitude: 71.38716,
    },
  },
];
