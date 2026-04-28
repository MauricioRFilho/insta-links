"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  url: string;
  store: string;
  index: number;
}

/** Store logo/badge mapping */
const STORE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  shopee: { label: "Shopee", color: "text-orange-400", bg: "bg-orange-400/10" },
  amazon: { label: "Amazon", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  mercadolivre: { label: "Mercado Livre", color: "text-yellow-300", bg: "bg-yellow-300/10" },
};

/** Product recommendation card with store badge indicator */
export default function RecommendationCard({
  title,
  url,
  store,
  index,
}: RecommendationCardProps) {
  const storeInfo = STORE_CONFIG[store] || {
    label: store,
    color: "text-text-secondary",
    bg: "bg-white/5",
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
      className="group relative flex items-center w-full px-5 py-4 rounded-2xl bg-bg-card border border-border hover:border-border-hover hover:bg-bg-card-hover transition-all duration-200 cursor-pointer"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-200" />

      {/* Store badge */}
      <span
        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${storeInfo.bg} ${storeInfo.color} relative z-10 mr-3 shrink-0`}
      >
        {storeInfo.label}
      </span>

      {/* Title */}
      <span className="flex-1 text-sm font-medium text-text-primary relative z-10 group-hover:text-white transition-colors">
        {title}
      </span>

      {/* External link indicator */}
      <ExternalLink
        size={14}
        className="text-text-secondary opacity-0 group-hover:opacity-60 transition-opacity duration-200 relative z-10 shrink-0"
      />
    </motion.a>
  );
}
