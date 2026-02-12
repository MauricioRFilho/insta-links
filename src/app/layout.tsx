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

export const metadata: Metadata = {
  title: "MAURICIO_LINKHUB_v3.1 :: SYSTEM_ONLINE",
  description: "Engenheiro Fullstack Sênior & Atleta de Endurance",
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
