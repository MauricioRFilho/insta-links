"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Activity, Twitter, Youtube, Globe } from "lucide-react";
import type { ComponentType } from "react";
import type { Social } from "@/types/schema";

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  strava: Activity,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
};

interface SocialBarProps {
  socials: Social[];
  accentColor: string;
}

/** Horizontal row of social platform icon buttons */
export default function SocialBar({ socials, accentColor }: SocialBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="flex items-center gap-2.5 mt-5"
    >
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
            className="w-10 h-10 rounded-full bg-bg-card border border-border flex items-center justify-center text-text-muted transition-all duration-200"
            style={{
              ["--hover-accent" as string]: accentColor,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = `${accentColor}60`;
              el.style.backgroundColor = `${accentColor}12`;
              el.style.color = accentColor;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "";
              el.style.backgroundColor = "";
              el.style.color = "";
            }}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </motion.div>
  );
}
