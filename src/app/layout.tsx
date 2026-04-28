import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "https://links.mauricio.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: { canonical: "/" },
  title: {
    default: "Mauricio Rodrigues | Links",
    template: "%s | Mauricio Rodrigues",
  },
  description:
    "Links oficiais de Mauricio Rodrigues — Engenheiro Fullstack Sênior & Atleta de Endurance.",
  keywords: [
    "Mauricio Rodrigues",
    "Linktree",
    "Links",
    "Fullstack Engineer",
    "Endurance",
  ],
  authors: [{ name: "Mauricio Rodrigues", url: baseUrl }],
  creator: "Mauricio Rodrigues",
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: baseUrl,
    title: "Mauricio Rodrigues | Links",
    description:
      "Links oficiais de Mauricio Rodrigues — Engenheiro Fullstack & Atleta de Endurance.",
    siteName: "Mauricio Links",
    images: [
      {
        url: "/profile-short.png",
        width: 1200,
        height: 630,
        alt: "Mauricio Rodrigues",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauricio Rodrigues | Links",
    description: "Links oficiais — Fullstack & Endurance.",
    images: ["/profile-short.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-mesh min-h-screen">{children}</body>
    </html>
  );
}
