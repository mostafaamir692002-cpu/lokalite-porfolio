import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Archivo } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lokalita — Premium Shopify Ecommerce Partner",
  description:
    "Lokalita builds, launches, and scales high-converting Shopify brands. We partner with retail companies to design and develop custom storefronts, optimize conversion paths, and scale customer acquisition.",
  openGraph: {
    title: "Lokalita — Premium Shopify Ecommerce Partner",
    description:
      "We partner with ambitious retail brands to build and launch high-performing Shopify storefronts. Brand strategy, custom development, and go-to-market — executed as one cohesive project.",
    type: "website",
    url: "https://lokalita-eg.com/",
    siteName: "Lokalita",
    locale: "en_US",
    images: [
      {
        url: "https://lokalita-eg.com/assets/lokalita-logo-original.png",
        width: 1200,
        height: 630,
        alt: "Lokalita — Premium Shopify Ecommerce Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokalita — Premium Shopify Ecommerce Partner",
    description:
      "We partner with ambitious retail brands to build and launch high-performing Shopify storefronts.",
    images: ["https://lokalita-eg.com/assets/lokalita-logo-original.png"],
  },
  robots: "index, follow, max-image-preview:large",
  authors: [{ name: "Lokalita" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${archivo.variable}`}
    >
      <body className="min-h-screen bg-[#060810] text-[#c5cad6] antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif" }}
      >
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
