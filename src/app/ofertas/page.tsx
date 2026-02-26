"use client";

import PageHeader from "@/components/PageHeader";
import { Flame, ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/actions/admin";

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  rating?: number;
  url: string;
  shopee_id: string;
}

export default function OfertasPage() {
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts(); // Busca do Supabase
        if (data) {
          setOffers(data);
        }
      } catch (error) {
        console.error("Failed to load offers", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="max-w-4xl mx-auto min-h-screen p-4 md:p-8 relative z-10">
      <PageHeader 
        title="Ofertas & Deals" 
        description="Curadoria de equipamentos de alta performance e setup."
        parent="~/ofertas"
      />

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-cyber-green" size={32} />
        </div>
      ) : (
        <div className="grid gap-4">
          {offers.map((offer, i) => (
            <motion.a
              key={offer.id}
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group block border border-slate-800 bg-slate-900/30 hover:border-cyber-green/50 hover:bg-slate-900/80 transition-all duration-300 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-slate-800 relative overflow-hidden flex items-center justify-center text-cyber-green group-hover:scale-110 transition-transform">
                     {offer.image_url ? (
                        <Image src={offer.image_url} alt={offer.title} fill unoptimized className="object-cover" />
                     ) : (
                        <Flame size={24} />
                     )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-cyber-green border border-cyber-green/30 px-1.5 py-0.5 rounded">
                        OFFER
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                        [SHOPEE]
                      </span>
                    </div>
                    <h3 className="text-slate-200 font-bold group-hover:text-cyber-green transition-colors line-clamp-1">
                      {offer.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {offer.currency || 'BRL'} {offer.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <ExternalLink size={16} className="text-slate-600 group-hover:text-cyber-green transition-colors opacity-0 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
          
          {offers.length === 0 && (
            <div className="text-center py-12 text-slate-500 font-mono text-sm border border-dashed border-slate-800">
              Nenhuma oferta ativa no momento.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
