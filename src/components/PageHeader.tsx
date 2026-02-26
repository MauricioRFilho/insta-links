"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
  parent?: string;
}

export default function PageHeader({ title, description, parent = "~" }: PageHeaderProps) {
  return (
    <header className="mb-8 border-b border-slate-800 pb-6">
      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-4">
        <span className="text-cyber-cyan">user@linkhub</span>
        <span>:</span>
        <span>{parent}</span>
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 uppercase tracking-tighter mb-2 flex items-center gap-3">
            <span className="text-cyber-green animate-pulse">_</span>
            {title}
          </h1>
          <p className="text-slate-400 font-mono text-xs md:text-sm max-w-lg">
            {description}
          </p>
        </div>
        
        <Link 
          href="/"
          className="group flex items-center gap-2 px-4 py-2 border border-slate-800 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-cyber-cyan"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>CD ..</span>
        </Link>
      </div>
    </header>
  );
}
