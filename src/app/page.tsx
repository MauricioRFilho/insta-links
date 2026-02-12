"use client";

import { motion } from "framer-motion";
import { 
  Github, Linkedin, Instagram, Activity, 
  Flame, Send, Laptop, Terminal, Dumbbell, HeartPulse, 
  MapPin, CheckCircle2, ChevronRight, Globe 
} from "lucide-react";
import { DATA } from "@/data/profile";
import { useState, useEffect } from "react";

// Icon Map
const IconMap: { [key: string]: any } = {
  Github, Linkedin, Instagram, Activity,
  Flame, Send, Laptop, Terminal, Dumbbell, HeartPulse
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = DATA[lang];

  if (!mounted) return null;

  return (
    <main className="max-w-6xl mx-auto min-h-screen p-4 md:p-8 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 relative z-10">
      
      {/* Sidebar: System Status / Profile */}
      <aside className="flex flex-col gap-6 md:sticky md:top-8 h-fit">
        
        {/* Identity Module */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-slate-800 bg-slate-900/50 p-6 relative group overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-1">
            <div className="w-2 h-2 bg-cyber-green animate-pulse"></div>
          </div>
          
          <div className="relative w-24 h-24 mb-4 border border-cyber-cyan/30 p-1">
            <img 
              src={content.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Corner Accents */}
            <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-cyber-cyan"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-cyber-cyan"></div>
          </div>

          <h1 className="text-xl font-bold text-slate-100 tracking-tighter uppercase mb-1">
            {content.name}
          </h1>
          <p className="text-xs text-cyber-cyan font-bold uppercase tracking-widest mb-4">
            {content.role}
          </p>
          
          <div className="h-px w-full bg-slate-800 mb-4"></div>
          
          <div className="text-xs text-slate-400 leading-relaxed font-sans mb-6 space-y-1">
            {content.bio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Social Matrix */}
          <div className="grid grid-cols-4 gap-2">
            {content.socials.map((s, i) => {
              const Icon = IconMap[s.icon] || Terminal;
              return (
                <a 
                  key={i} 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-10 border border-slate-700 hover:border-cyber-cyan text-slate-500 hover:text-cyber-cyan hover:bg-cyber-cyan/10 flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* System Status Module */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-slate-800 bg-slate-900/30 p-4 text-[10px] uppercase tracking-wider space-y-2"
        >
          <div className="flex justify-between">
            <span className="text-slate-500">SYS.STATUS</span>
            <span className="text-cyber-green flex items-center gap-1">
              <CheckCircle2 size={10} /> {lang === 'pt' ? 'ONLINE' : 'ONLINE'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">LOC.COORDS</span>
            <span className="text-slate-300 flex items-center gap-1">
              <MapPin size={10} /> {content.location}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">UPTIME</span>
            <span className="text-slate-300">99.9%</span>
          </div>
          <div className="w-full bg-slate-800 h-1 mt-2 overflow-hidden">
            <div className="bg-cyber-cyan h-full w-[85%] animate-[glitch_2s_infinite]"></div>
          </div>
        </motion.div>

      </aside>

      {/* Main Stream: Command Links */}
      <section className="flex flex-col gap-8">
        
        {/* Terminal Header & Lang Switch */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-b border-slate-800 pb-2 mb-4 flex justify-between items-end"
        >
          <div className="text-xs text-cyber-cyan font-mono">
            <span className="mr-2">user@linkhub:~$</span>
            <span className="animate-pulse">_</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Lang Toggle */}
            <button 
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="group flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider hover:text-cyber-cyan transition-colors"
            >
               <Globe size={12} className="text-slate-600 group-hover:text-cyber-cyan" />
               <span className={lang === 'pt' ? 'text-cyber-cyan font-bold' : 'text-slate-600'}>[ PT ]</span>
               <span className="text-slate-700">/</span>
               <span className={lang === 'en' ? 'text-cyber-cyan font-bold' : 'text-slate-600'}>EN</span>
            </button>
            
            <div className="text-[10px] text-slate-600 border-l border-slate-800 pl-4">v3.1.0 I18N</div>
          </div>
        </motion.div>

        {/* Dynamic Link Stream */}
        <div className="space-y-10">
          {content.modules.map((mod, i) => (
            <motion.div 
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              className="space-y-4"
            >
              <h2 className={`font-mono text-sm font-bold ${mod.accent} flex items-center gap-2 border-b border-slate-800 pb-2`}>
                {mod.title}
              </h2>
              <div className="grid gap-2">
                {mod.items.map((item, j) => {
                  const Icon = IconMap[item.icon] || Terminal;
                  return (
                    <a 
                      key={j} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block border-l-2 border-slate-800 hover:border-cyber-cyan hover:bg-slate-900/50 pl-4 py-3 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-mono text-sm font-bold ${item.highlight ? 'text-cyber-green' : 'text-slate-200'} group-hover:text-cyber-cyan transition-colors flex items-center gap-2`}>
                          <Icon size={14} className="opacity-60" />
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          EXEC <ChevronRight size={10} />
                        </span>
                      </div>
                      <p className="font-sans text-xs text-slate-500 group-hover:text-slate-400 pl-6">
                        {item.desc}
                      </p>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-auto pt-12 border-t border-slate-800/50 flex justify-between text-[10px] text-slate-600 uppercase"
        >
          <div>© {new Date().getFullYear()} Mauricio_LinkHub</div>
          <div>EXEC_TIME: 0.04ms</div>
        </motion.footer>
      </section>

    </main>
  );
}
