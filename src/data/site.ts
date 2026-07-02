/* ============================================================
   SITE — Brand constants, links, and metadata
   Single source of truth for Lokalita identity
   ============================================================ */

export const SITE = {
  name: "Lokalita",
  tagline: "Ecommerce Studio",
  description:
    "Lokalita builds, launches, and scales high-converting Shopify brands. We partner with retail companies to design and develop custom storefronts, optimize conversion paths, and scale customer acquisition.",
  url: "https://lokalita-eg.com",
  email: "lokalita75@gmail.com",
  phone: "+20 111 863 0150",
  location: "Cairo, Egypt",
  timezone: "GMT+2",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61579605985661",
    instagram: "https://www.instagram.com/lokalitaeg/",
    whatsapp: "https://wa.me/201118630150",
  },
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
] as const;

export const CLIENTS = [
  { name: "Royal Sea", glyph: "👑" },
  { name: "Medieval Aloud", glyph: "🏰" },
  { name: "Seafood Mood", glyph: "✦" },
  { name: "UNITED", glyph: "" },
  { name: "Pantoufla", glyph: "🌿" },
  { name: "FISHMONGER", glyph: "" },
] as const;

export const SERVICES = [
  {
    icon: "shopify",
    title: "Shopify Development",
    description: "Custom stores built for performance and scale.",
  },
  {
    icon: "brand",
    title: "Brand Identity",
    description: "Distinctive identities that connect and convert.",
  },
  {
    icon: "launch",
    title: "Launch & Tracking",
    description: "Everything set for a smooth and data-driven launch.",
  },
] as const;
