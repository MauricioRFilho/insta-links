import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mauricio Rodrigues | LinkHub",
    short_name: "LinkHub",
    description: "Engenheiro Fullstack Sênior & Atleta de Endurance",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png", // Requer arquivo na pasta public
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png", // Requer arquivo na pasta public
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable"
      }
    ],
  };
}
