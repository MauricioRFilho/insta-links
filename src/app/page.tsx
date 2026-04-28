"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "@/components/ProfileHeader";
import SocialIcons from "@/components/SocialIcons";
import LinkCard from "@/components/LinkCard";
import RecommendationCard from "@/components/RecommendationCard";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface Social {
  platform: string;
  url: string;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
  emoji?: string;
  active: boolean;
  order: number;
}

interface RecommendationItem {
  id: string;
  title: string;
  url: string;
  store: string;
  active: boolean;
  order: number;
}

interface LinksData {
  profile: {
    name: string;
    avatar: string;
    bio: string;
    socials: Social[];
  };
  links: LinkItem[];
  recommendations: RecommendationItem[];
}

export default function Home() {
  const [data, setData] = useState<LinksData | null>(null);

  useEffect(() => {
    fetch("/data/links.json")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </main>
    );
  }

  const activeLinks = data.links
    .filter((l) => l.active)
    .sort((a, b) => a.order - b.order);

  const activeRecs = (data.recommendations || [])
    .filter((r) => r.active)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-12 md:py-16">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfileHeader
          name={data.profile.name}
          bio={data.profile.bio}
          avatar={data.profile.avatar}
        />
        <div className="flex justify-center">
          <SocialIcons socials={data.profile.socials} />
        </div>
      </motion.div>

      {/* Links */}
      <div className="w-full max-w-[480px] mt-8 flex flex-col gap-3">
        {activeLinks.map((link, i) => (
          <LinkCard
            key={link.id}
            title={link.title}
            url={link.url}
            emoji={link.emoji}
            index={i}
          />
        ))}
      </div>

      {/* Recommendations Section */}
      {activeRecs.length > 0 && (
        <div className="w-full max-w-[480px] mt-10 flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mb-1"
          >
            <ShoppingBag size={14} className="text-text-secondary/50" />
            <span className="text-xs font-medium text-text-secondary/60 uppercase tracking-wider">
              Recomendações
            </span>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {activeRecs.map((rec, i) => (
            <RecommendationCard
              key={rec.id}
              title={rec.title}
              url={rec.url}
              store={rec.store}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-auto pt-12 text-[11px] text-text-secondary/40"
      >
        © {new Date().getFullYear()} Mauricio Rodrigues
      </motion.footer>
    </main>
  );
}
