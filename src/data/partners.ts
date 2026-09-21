import type { Partner } from "../types/partner";

// All businesses, offers, and addresses below are illustrative demo data.
// Coordinates are approximate; these are not verified business locations.
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
    id: "urban-coffee", name: "Urban Coffee", category: "coffee", discount: "15%",
    offerLabel: "off your daily coffee",
    description: "A little fuel for your next big idea. Find your favorite brew, a quiet corner, and something freshly baked.",
    terms: "Sample offer: 15% off drinks and pastries with a valid AITU student ID. Cannot be combined with other offers.",
    location: { name: "MEGA Silk Way", address: "Kabanbay Batyr Avenue, 62", latitude: 51.0892, longitude: 71.4094 },
  },
  {
    id: "burger-lab", name: "Burger Lab", category: "food", discount: "15%",
    offerLabel: "off your next bite",
    description: "Good food, good company. Handcrafted burgers and crispy fries for your well-earned study break.",
    terms: "Sample offer: 15% off food from Monday to Friday with your AITU student ID. Delivery excluded.",
    location: { name: "Turkistan Street", address: "Turkistan Street, 16", latitude: 51.1138, longitude: 71.4224 },
  },
  {
    id: "fitspace", name: "FitSpace", category: "sport", discount: "20%",
    offerLabel: "off student memberships",
    description: "Make room for movement. A bright, welcoming studio with strength training, group classes, and a fresh start.",
    terms: "Sample offer: 20% off a monthly membership for enrolled AITU students. Personal training excluded.",
    location: { name: "Botanical Garden", address: "Turkistan Street, 28", latitude: 51.1035, longitude: 71.4156 },
  },
  {
    id: "study-hub", name: "Study Hub", category: "education", discount: "10%",
    offerLabel: "off your focus time",
    description: "Your next favorite study spot. Quiet desks, fast Wi-Fi, and bookable rooms for the projects that matter.",
    terms: "Sample offer: 10% off day passes and meeting rooms. Show a valid AITU student ID at reception.",
    location: { name: "Nurzhol Boulevard", address: "Dostyk Street, 13", latitude: 51.1286, longitude: 71.4258 },
  },
  {
    id: "cinema-point", name: "Cinema Point", category: "entertainment", discount: "1,500 ₸",
    offerLabel: "your student ticket",
    description: "Step away from your screen and into a bigger one. Discover new stories with your favorite people.",
    terms: "Sample offer: 1,500 ₸ standard tickets on weekdays before 18:00. Premium formats and premieres excluded.",
    location: { name: "Khan Shatyr area", address: "Turan Avenue, 37", latitude: 51.1316, longitude: 71.4044 },
  },
  {
    id: "paper-plane", name: "Paper Plane", category: "services", discount: "20%",
    offerLabel: "off print & binding",
    description: "Bring your work to life. Thoughtful printing, presentation binding, and the finishing touches your project deserves.",
    terms: "Sample offer: 20% off standard printing and binding with your AITU student ID. Specialty materials excluded.",
    location: { name: "Mangilik El Avenue", address: "Mangilik El Avenue, 35", latitude: 51.1083, longitude: 71.4352 },
  },
  {
    id: "daily-dose", name: "Daily Dose", category: "coffee", discount: "10%",
    offerLabel: "off your coffee ritual",
    description: "Specialty coffee, slow mornings, and a place to catch up. Your everyday ritual, made a little better.",
    terms: "Sample offer: 10% off handcrafted drinks all week with a valid AITU student ID.",
    location: { name: "Akmeshit Street", address: "Akmeshit Street, 9", latitude: 51.1192, longitude: 71.4178 },
  },
  {
    id: "bowl-theory", name: "Bowl Theory", category: "food", discount: "15%",
    offerLabel: "off something fresh",
    description: "Colorful bowls built around fresh ingredients. A feel-good lunch between lectures, meetings, and everything else.",
    terms: "Sample offer: 15% off bowls and salads for AITU students. Available for dine-in only.",
    location: { name: "Syganak Street", address: "Syganak Street, 21", latitude: 51.1214, longitude: 71.4388 },
  },
  {
    id: "motion-club", name: "Motion Club", category: "sport", discount: "25%",
    offerLabel: "off your first month",
    description: "Find your rhythm with climbing, yoga, and a community that keeps you moving.",
    terms: "Sample offer: 25% off the first month for new student members. Equipment rental charged separately.",
    location: { name: "Turan Avenue", address: "Turan Avenue, 19", latitude: 51.1415, longitude: 71.4085 },
  },
  {
    id: "code-corner", name: "Code Corner", category: "education", discount: "20%",
    offerLabel: "off practical workshops",
    description: "Build something beyond the classroom. Small-group coding workshops for curious minds and ambitious ideas.",
    terms: "Sample offer: 20% off selected weekend workshops. Registration and a valid student ID required.",
    location: { name: "Diplomatic quarter", address: "Kunayev Street, 12", latitude: 51.1348, longitude: 71.4328 },
  },
  {
    id: "pixel-play", name: "Pixel Play", category: "entertainment", discount: "20%",
    offerLabel: "off your next game",
    description: "A friendly escape for your whole squad. Console lounges, board games, and a little healthy competition.",
    terms: "Sample offer: 20% off hourly bookings on weekdays. AITU student ID required for each discounted player.",
    location: { name: "Right bank", address: "Kenesary Street, 40", latitude: 51.1618, longitude: 71.4295 },
  },
  {
    id: "fresh-fold", name: "Fresh & Fold", category: "services", discount: "15%",
    offerLabel: "off laundry day",
    description: "One less thing on your to-do list. Simple laundry and garment care to keep your week running smoothly.",
    terms: "Sample offer: 15% off standard wash and fold services. Express service excluded.",
    location: { name: "Expo district", address: "Uly Dala Avenue, 7", latitude: 51.0994, longitude: 71.4458 },
  },
];
