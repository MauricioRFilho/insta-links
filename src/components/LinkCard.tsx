"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface LinkCardProps {
  title: string;
  url: string;
  emoji?: string;
  index: number;
}

/** Individual link button — the core element of the Linktree page */
export default function LinkCard({ title, url, emoji, index }: LinkCardProps) {
  const isExternal = url.startsWith("http");

  return (
    <motion.a
      href={url}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
      className="group relative flex items-center w-full px-5 py-4 rounded-2xl bg-bg-card border border-border hover:border-border-hover hover:bg-bg-card-hover transition-all duration-200 cursor-pointer"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-200" />

      {/* Emoji */}
      {emoji && (
        <span className="text-lg mr-3 relative z-10 group-hover:scale-110 transition-transform duration-200">
          {emoji}
        </span>
      )}

      {/* Title */}
      <span className="flex-1 text-sm font-medium text-text-primary relative z-10 group-hover:text-white transition-colors">
        {title}
      </span>

      {/* External link indicator */}
      {isExternal && (
        <ExternalLink
          size={14}
          className="text-text-secondary opacity-0 group-hover:opacity-60 transition-opacity duration-200 relative z-10"
        />
      )}
    </motion.a>
  );
}
