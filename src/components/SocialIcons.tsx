import { Github, Linkedin, Instagram, Activity } from "lucide-react";
import type { ComponentType } from "react";

interface Social {
  platform: string;
  url: string;
}

interface SocialIconsProps {
  socials: Social[];
}

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  strava: Activity,
};

/** Row of social media icon links */
export default function SocialIcons({ socials }: SocialIconsProps) {
  return (
    <div className="flex items-center gap-3 mt-4">
      {socials.map((s) => {
        const Icon = ICON_MAP[s.platform];
        if (!Icon) return null;

        return (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.platform}
            className="w-10 h-10 rounded-full bg-white/5 border border-border hover:border-accent/40 hover:bg-accent-glow flex items-center justify-center text-text-secondary hover:text-accent transition-all duration-200"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
