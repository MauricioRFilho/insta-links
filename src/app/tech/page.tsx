"use client";

import PageHeader from "@/components/PageHeader";
import { Laptop, Cpu, Monitor, Mouse, Keyboard } from "lucide-react";
import { motion } from "framer-motion";

const SETUP_ITEMS = [
  { icon: Laptop, item: "MacBook Pro M3 Max", spec: "14\" Space Black, 36GB RAM" },
  { icon: Monitor, item: "LG Ultrawide 34WP65C", spec: "160Hz, VA Panel" },
  { icon: Keyboard, item: "Keychron K2 Pro", spec: "Banana Switches, PBT Keycaps" },
  { icon: Mouse, item: "Logitech MX Master 3S", spec: "Pale Grey" },
];

export default function TechPage() {
  return (
    <main className="max-w-4xl mx-auto min-h-screen p-4 md:p-8 relative z-10">
      <PageHeader 
        title="Tech & Setup" 
        description="Manifesto de hardware e ambiente de desenvolvimento."
        parent="~/tech"
      />

      <section className="mb-12">
        <h2 className="text-sm font-mono text-cyber-cyan font-bold mb-6 flex items-center gap-2">
          <Cpu size={16} />
          KERNEL_CONFIG
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SETUP_ITEMS.map((setup, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="border border-slate-800 bg-slate-900/20 p-4 hover:border-cyber-cyan/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <setup.icon size={20} className="text-slate-500" />
                <div>
                  <h3 className="text-slate-200 text-sm font-bold">{setup.item}</h3>
                  <p className="text-xs text-slate-500 font-mono">{setup.spec}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-mono text-cyber-cyan font-bold mb-6 flex items-center gap-2">
          <Laptop size={16} />
          PROJECTS.git
        </h2>
        <div className="border border-slate-800 border-dashed p-8 text-center bg-slate-900/10">
          <p className="text-slate-500 font-mono text-xs">Waiting for GitHub API connection...</p>
        </div>
      </section>
    </main>
  );
}
