// app/data.js
export const industries = [
  "ALL",
  "NON-PROFIT",
  "AUTO",
  "CPG",
  "ENTERTAINMENT",
  "ENERGY / UTILITIES",
  "FINANCIAL SERVICES",
  "HEALTHCARE / PHARMA",
  "QSR / DINING OUT",
  "RETAIL",
  "TECHNOLOGY",
  "TRAVEL / TOURISM",
];

export const formats = [
  "ALL",
  "IN-VIDEO",
  "IN-ARTICLE",
  "IN-SCREENS",
  "SKINS",
  "STANDARD VIDEO",
];

export const channels = [
  "ALL",
  "VIDEO",
  "CTV/OTT",
  "MOBILE",
  "DESKTOP",
];

// Simple image paths — update these if your images live in other paths
const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
];

const titles = [
  "Velocity",
  "Momentum",
  "Ignite",
  "Pulse",
  "Orbit",
  "Launch",
  "Catalyst",
  "Fusion",
  "Spark",
  "Drift",
  "Rise",
  "Eclipse",
  "Vibe",
  "Surge",
  "Flow",
  "Nova",
  "Shift",
  "Echo",
  "Wave",
  "Radiance",
];

const brands = [
  "SAFARICOM",
  "EQUITY BANK",
  "KCB",
  "MPESA",
  "TUSKYS",
  "NAIVAS",
  "JAVA HOUSE",
  "ARTCAFFE",
  "KCB BANK",
  "CO-OPERATIVE BANK",
  "EABL",
  "BROOKSIDE",
  "BAT KENYA",
  "BIDCO",
  "CHANDARIA",
  "SAMSUNG KENYA",
  "JUMIA KENYA",
  "TWIGA FOODS",
  "BRITAM",
  "SANLAM KENYA",
];

const icons = ["monitor", "mobile", "both"];

// Plain-JS helper (no TypeScript generics)
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Build cards with industry/format/channel fields so filtering can work
export const cards = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: randomFrom(titles),
  brand: randomFrom(brands),
  image: randomFrom(images),
  icon: randomFrom(icons),
  industry: randomFrom(industries.filter((x) => x !== "ALL")),
  format: randomFrom(formats.filter((x) => x !== "ALL")),
  channel: randomFrom(channels.filter((x) => x !== "ALL")),
}));