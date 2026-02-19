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
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/pt",
      "en-US": "/en",
    },
  },
  title: {
    default: "Mauricio Rodrigues | Engenheiro Fullstack & Atleta",
    template: "%s | Mauricio Rodrigues"
  },
  description: "Engenheiro Fullstack Sênior especializado em React, Node.js e Arquitetura de Software. Atleta de Endurance em busca de limites físicos e digitais.",
  keywords: ["Fullstack Engineer", "React", "Next.js", "Software Architecture", "Triathlon", "Endurance", "Curitiba"],
  authors: [{ name: "Mauricio Rodrigues", url: baseUrl }],
  creator: "Mauricio Rodrigues",
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: baseUrl,
    title: "Mauricio Rodrigues | Engenheiro Fullstack & Atleta",
    description: "Engenheiro Fullstack Sênior & Atleta de Endurance. Unindo código e performance.",
    siteName: "Mauricio LinkHub",
    images: [
      {
        url: "/og-image.jpg", // Precisa ser criado ou usar o avatar como fallback
        width: 1200,
        height: 630,
        alt: "Mauricio Rodrigues - Profile"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauricio Rodrigues | Engenheiro Fullstack",
    description: "Engenheiro Fullstack Sênior & Atleta de Endurance.",
    creator: "@mauriciootk", // Assumindo baseado no Instagram, ajustar se necessário
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION", // Placeholder para env var
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-slate-950 font-mono text-slate-300 antialiased min-h-screen relative overflow-x-hidden selection:bg-cyber-cyan selection:text-black">
        {/* FX Layer */}
        <div className="fixed inset-0 scanlines pointer-events-none z-50 opacity-15"></div>
        <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-cyan via-cyber-green to-cyber-cyan z-50 opacity-80"></div>
        
        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
