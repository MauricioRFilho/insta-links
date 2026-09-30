"use client";

import { useEffect, useState } from "react";
import type { SiteData, Section } from "@/types/schema";
import Avatar from "@/components/Avatar";
import ProfileHeader from "@/components/ProfileHeader";
import SocialBar from "@/components/SocialBar";
import LinkItem from "@/components/LinkItem";
import ProductItem from "@/components/ProductItem";
import SectionHeader from "@/components/SectionHeader";
import Footer from "@/components/Footer";

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    fetch("/data/data.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  /* Loading spinner */
  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="w-5 h-5 border-2 border-text-muted/20 border-t-text-muted rounded-full animate-spin" />
      </main>
    );
  }

  const { profile, theme, sections } = data;
  const accentColor = theme.accentColor;
  const activeSections = sections.filter((s) => s.active);

  /** Renders a section item based on its type */
  function renderSection(section: Section, index: number) {
    switch (section.type) {
      case "link":
        return (
          <LinkItem
            key={`link-${index}`}
            title={section.title}
            subtitle={section.subtitle}
            url={section.url}
            emoji={section.emoji}
            thumbnail={section.thumbnail}
            index={index}
            accentColor={accentColor}
          />
        );
      case "product":
        return (
          <ProductItem
            key={`product-${index}`}
            title={section.title}
            subtitle={section.subtitle}
            url={section.url}
            store={section.store}
            thumbnail={section.thumbnail}
            index={index}
            accentColor={accentColor}
          />
        );
      case "header":
        return (
          <SectionHeader
            key={`header-${index}`}
            title={section.title}
            index={index}
          />
        );
      default:
        return null;
    }
  }

  /* Apply accent color as CSS custom property for dynamic theming */
  const accentStyle = {
    "--accent": accentColor,
  } as React.CSSProperties;

  return (
    <main
      className="flex flex-col items-center min-h-screen px-4 py-14 md:py-20"
      style={accentStyle}
    >
      {/* Profile */}
      <Avatar
        src={profile.avatar}
        name={profile.name}
        verified={profile.verified}
        accentColor={accentColor}
      />
      <ProfileHeader name={profile.name} bio={profile.bio} />
      <SocialBar socials={profile.socials} accentColor={accentColor} />

      {/* Sections */}
      <div className="w-full max-w-[480px] mt-8 flex flex-col gap-2.5">
        {activeSections.map((section, i) => renderSection(section, i))}
      </div>

      {/* Footer */}
      <Footer name={profile.name} />
    </main>
  );
}
