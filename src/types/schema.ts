/** SEO and page metadata */
export interface SiteMeta {
  title: string;
  description: string;
  ogImage: string;
  favicon: string;
  lang: string;
}

/** Theme configuration — accent color applied dynamically via CSS custom properties */
export interface Theme {
  accentColor: string;
  style: "dark";
}

/** Social media platform link */
export interface Social {
  platform: string;
  url: string;
}

/** Creator profile information */
export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  verified: boolean;
  socials: Social[];
}

/** Base fields shared by all section types */
interface SectionBase {
  active: boolean;
}

/** A clickable link with optional emoji, thumbnail, and subtitle */
export interface LinkSection extends SectionBase {
  type: "link";
  title: string;
  subtitle: string | null;
  url: string;
  emoji: string | null;
  thumbnail: string | null;
}

/** A visual divider/header to separate groups of links */
export interface HeaderSection extends SectionBase {
  type: "header";
  title: string;
}

/** A product recommendation with store badge and optional thumbnail */
export interface ProductSection extends SectionBase {
  type: "product";
  title: string;
  subtitle: string | null;
  url: string;
  store: string;
  thumbnail: string | null;
}

/** Union of all possible section types */
export type Section = LinkSection | HeaderSection | ProductSection;

/** Root schema for data.json — the single source of truth */
export interface SiteData {
  meta: SiteMeta;
  theme: Theme;
  profile: Profile;
  sections: Section[];
}
