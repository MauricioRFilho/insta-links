"use client";

import PageHeader from "@/components/PageHeader";
import { Bike, Activity, Timer, Zap } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { label: "FTP", value: "245W", icon: Zap },
  { label: "VO2 Max", value: "58", icon: Activity },
  { label: "Weekly Volume", value: "12h", icon: Timer },
];

export default function EndurancePage() {
  return (
    <main className="max-w-4xl mx-auto min-h-screen p-4 md:p-8 relative z-10">
      <PageHeader 
        title="Endurance Logs" 
        description="Métricas de performance e loadout de triatlo."
        parent="~/endurance"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-slate-800 bg-slate-900/30 p-4 text-center"
          >
            <div className="flex justify-center text-cyber-red mb-2">
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">{stat.value}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-mono text-cyber-red font-bold mb-4 flex items-center gap-2">
          <Bike size={16} />
          GEAR_LOADOUT
        </h2>
        
        <div className="relative border-l-2 border-slate-800 ml-3 pl-8 py-2 space-y-8">
          {[
            { title: "Bike", model: "Oggi Velloce 2024", desc: "Original (Sem alterações)" },
            { title: "Indoor", model: "Absolute 2", desc: "Rolo de treino" },
            { title: "Run", model: "Saucony Endorphin Pro 3", desc: "Carbon Plated, Speedroll Tech" },
            { title: "Swim", model: "Zone3 Aspire", desc: "Wetsuit, Yamamoto Rubber" }
          ].map((gear, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[41px] top-1 w-5 h-5 bg-slate-900 border-2 border-slate-800 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-cyber-red rounded-full"></div>
              </span>
              <h3 className="text-slate-200 font-bold">{gear.title} <span className="text-slate-600">::</span> {gear.model}</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">{gear.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
