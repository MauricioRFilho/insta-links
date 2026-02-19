"use client";

import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { Loader2, Plus, Save, Search, ExternalLink, Package, AlertCircle, Check, Star, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchShopeeProducts, saveProduct, getProducts, deleteProduct } from "@/actions/admin";

interface ShopeeResult {
  shopee_id: string;
  title: string;
  image_url: string;
  price: number;
  currency: string;
  url: string;
  commission_rate?: string;
  rating?: number;
  sales?: number;
}

export default function AdminPage() {
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [results, setResults] = useState<ShopeeResult[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dbProducts, setDbProducts] = useState<any[]>([]);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    const data = await getProducts();
    setDbProducts(data || []);
  }

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    setSearching(true);
    setError("");
    setResults([]);

    const { success, data, error: apiError } = await searchShopeeProducts(keyword.trim());
    
    if (success && data) {
      setResults(data);
    } else {
      setError(apiError || "Erro na busca.");
    }
    setSearching(false);
  };

  const handleSave = async (product: ShopeeResult) => {
    setSaving(product.shopee_id);
    setError("");

    const result = await saveProduct(product);
    
    if (result.success) {
      setSuccess(`"${product.title.substring(0, 40)}..." salvo!`);
      await loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.error || "Erro ao salvar.");
    }
    setSaving(null);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Deseja realmente excluir "${title}"?`)) return;

    setDeleting(id);
    const result = await deleteProduct(id);

    if (result.success) {
      setSuccess("Produto excluído com sucesso.");
      await loadProducts();
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(result.error || "Erro ao excluir.");
    }
    setDeleting(null);
  };

  const isAlreadySaved = (id: string) => dbProducts.some(p => p.shopee_id === id);

  return (
    <main className="max-w-6xl mx-auto min-h-screen p-4 md:p-8 relative z-10">
      <PageHeader
        title="Admin Panel"
        description="Busque produtos na Shopee e adicione ao catálogo."
        parent="~/admin"
      />

      {/* Barra de Busca */}
      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Cole uma URL da Shopee ou busque por nome (ex: mouse gamer)"
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 px-4 py-3 text-sm focus:border-cyber-cyan outline-none transition-colors rounded font-mono"
          />
          <button
            onClick={handleSearch}
            disabled={searching || !keyword.trim()}
            className="bg-cyber-green text-slate-950 font-bold px-6 py-3 rounded hover:bg-cyber-green/90 transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {searching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            Buscar
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-red-400 text-xs flex items-center gap-1 mt-2">
              <AlertCircle size={12} /> {error}
            </motion.p>
          )}
          {success && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-cyber-green text-xs font-bold mt-2 flex items-center gap-1">
              <Check size={12} /> {success}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resultados da Busca */}
        <section className="lg:col-span-2">
          {searching && (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-cyber-green" size={32} />
            </div>
          )}

          {!searching && results.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-mono text-slate-500 mb-2">
                {results.length} resultados da API Shopee
              </h2>
              {results.map((product) => {
                const saved = isAlreadySaved(product.shopee_id);
                return (
                  <motion.div
                    key={product.shopee_id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border p-4 rounded flex gap-4 transition-colors ${
                      saved 
                        ? 'border-cyber-green/30 bg-cyber-green/5' 
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-20 h-20 bg-slate-800 rounded overflow-hidden shrink-0">
                      <img src={product.image_url} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-200 font-bold text-sm line-clamp-2">{product.title}</h3>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-cyber-green font-mono text-sm font-bold">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.rating && (
                          <span className="text-xs text-yellow-500 flex items-center gap-0.5">
                            <Star size={10} fill="currentColor" /> {Number(product.rating).toFixed(1)}
                          </span>
                        )}
                        {product.commission_rate && (
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                            {product.commission_rate}% comissão
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {saved ? (
                        <span className="text-cyber-green text-xs flex items-center gap-1 px-3 py-2">
                          <Check size={14} /> Salvo
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSave(product)}
                          disabled={saving === product.shopee_id}
                          className="bg-slate-800 hover:bg-cyber-green/20 text-cyber-green border border-slate-700 hover:border-cyber-green px-3 py-2 rounded transition-all text-xs flex items-center gap-1 disabled:opacity-50"
                        >
                          {saving === product.shopee_id 
                            ? <Loader2 className="animate-spin" size={14} />
                            : <Save size={14} />
                          }
                          Salvar
                        </button>
                      )}
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-500 hover:text-cyber-cyan flex items-center gap-1 justify-center transition-colors"
                      >
                        <ExternalLink size={10} /> Ver
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!searching && results.length === 0 && !error && (
            <div className="text-center py-16 text-slate-600 font-mono text-xs border border-dashed border-slate-800 rounded">
              <Search size={24} className="mx-auto mb-2 opacity-40" />
              Busque por um produto para começar.
            </div>
          )}
        </section>

        {/* Lista de Produtos Salvos */}
        <section className="bg-slate-900/20 border border-slate-800 p-4 rounded-lg h-fit">
          <h2 className="text-sm font-bold text-slate-400 mb-3 flex items-center justify-between">
            <span>Catálogo</span>
            <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {dbProducts.length}
            </span>
          </h2>

          {dbProducts.length === 0 ? (
            <div className="text-center py-8 text-slate-600 font-mono text-[10px] border border-dashed border-slate-800 rounded flex flex-col items-center gap-2">
              <Package size={20} />
              Catálogo vazio.
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {dbProducts.map((prod) => (
                <div key={prod.id} className="border border-slate-800 bg-slate-900/40 p-3 rounded flex gap-2 group">
                  <div className="w-10 h-10 bg-slate-800 rounded overflow-hidden shrink-0">
                    {prod.image_url ? (
                      <img src={prod.image_url} alt={prod.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600"><Package size={14} /></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-slate-300 text-xs font-bold truncate">{prod.title}</h4>
                    <span className="text-[10px] text-cyber-green font-mono">
                      R$ {Number(prod.price).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(prod.id, prod.title)}
                    disabled={deleting === prod.id}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-all shrink-0 disabled:opacity-50"
                    title="Excluir produto"
                  >
                    {deleting === prod.id ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
