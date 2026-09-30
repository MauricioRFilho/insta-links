import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { readFile } from "fs/promises";
import { join } from "path";
import type { SiteData } from "@/types/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * Reads data.json at build time to populate SEO metadata dynamically.
 * @see SiteData for the full schema definition
 */
async function loadSiteData(): Promise<SiteData> {
  const filePath = join(process.cwd(), "public", "data", "data.json");
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await loadSiteData();
  const { meta, profile } = data;

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL
        ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
        : "https://links.mauricio.com.br"
    ),
    alternates: { canonical: "/" },
    title: meta.title,
    description: meta.description,
    keywords: [profile.name, "Links", "Creator", "Linktree"],
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "profile",
      locale: meta.lang.replace("-", "_"),
      title: meta.title,
      description: meta.description,
      siteName: meta.title,
      images: [
        {
          url: meta.ogImage,
          width: 1200,
          height: 630,
          alt: profile.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
