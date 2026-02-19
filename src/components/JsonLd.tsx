import { DATA } from "@/data/profile";

export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA["pt"].name,
    jobTitle: DATA["pt"].role,
    url: "https://links.mauricio.com.br",
    sameAs: DATA["pt"].socials.map((s) => s.url),
    image: `https://links.mauricio.com.br${DATA["pt"].avatar}`,
    description: DATA["pt"].bio.join(" "),
    knowsAbout: ["Fullstack Development", "Endurance Sports", "Software Engineering"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
