"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  LogIn,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Check,
  AlertCircle,
  ExternalLink,
  Pencil,
  ShoppingBag,
  Link2,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ─── Types ─── */

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

type Tab = "links" | "recommendations";

/* ─── Helpers ─── */

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ─── Component ─── */

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const [data, setData] = useState<LinksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("links");

  const showToast = useCallback(
    (type: "success" | "error", msg: string) => {
      setToast({ type, msg });
      setTimeout(() => setToast(null), 3500);
    },
    []
  );

  /* ─── Auth ─── */

  const handleLogin = async () => {
    if (!password.trim()) return;
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setAuthed(true);
      } else {
        setAuthError(result.error || "Senha incorreta.");
      }
    } catch {
      setAuthError("Erro de conexão.");
    }
    setAuthLoading(false);
  };

  /* ─── Data loading ─── */

  useEffect(() => {
    if (!authed) return;

    fetch("/data/links.json")
      .then((r) => r.json())
      .then((d) => {
        setData({ ...d, recommendations: d.recommendations || [] });
        setLoading(false);
      })
      .catch(() => {
        showToast("error", "Erro ao carregar dados.");
        setLoading(false);
      });
  }, [authed, showToast]);

  /* ─── Generic updater ─── */

  const updateData = (updater: (prev: LinksData) => LinksData) => {
    setData((prev) => {
      if (!prev) return prev;
      setDirty(true);
      return updater(prev);
    });
  };

  /* ─── Links CRUD ─── */

  const addLink = () => {
    const newLink: LinkItem = {
      id: generateId(),
      title: "Novo Link",
      url: "https://",
      emoji: "🔗",
      active: true,
      order: data ? data.links.length : 0,
    };
    updateData((prev) => ({ ...prev, links: [...prev.links, newLink] }));
    setEditingId(newLink.id);
  };

  const removeLink = (id: string) => {
    updateData((prev) => ({
      ...prev,
      links: prev.links
        .filter((l) => l.id !== id)
        .map((l, i) => ({ ...l, order: i })),
    }));
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    updateData((prev) => ({
      ...prev,
      links: prev.links.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));
  };

  const moveLinkItem = (id: string, direction: "up" | "down") => {
    updateData((prev) => {
      const sorted = [...prev.links].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((l) => l.id === id);
      if (
        (direction === "up" && idx <= 0) ||
        (direction === "down" && idx >= sorted.length - 1)
      )
        return prev;
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      [sorted[idx].order, sorted[swapIdx].order] = [
        sorted[swapIdx].order,
        sorted[idx].order,
      ];
      return { ...prev, links: sorted };
    });
  };

  const toggleLink = (id: string) => {
    updateData((prev) => ({
      ...prev,
      links: prev.links.map((l) =>
        l.id === id ? { ...l, active: !l.active } : l
      ),
    }));
  };

  /* ─── Recommendations CRUD ─── */

  const addRecommendation = () => {
    const newRec: RecommendationItem = {
      id: generateId(),
      title: "Novo Produto",
      url: "https://",
      store: "shopee",
      active: true,
      order: data ? data.recommendations.length : 0,
    };
    updateData((prev) => ({
      ...prev,
      recommendations: [...prev.recommendations, newRec],
    }));
    setEditingId(newRec.id);
  };

  const removeRecommendation = (id: string) => {
    updateData((prev) => ({
      ...prev,
      recommendations: prev.recommendations
        .filter((r) => r.id !== id)
        .map((r, i) => ({ ...r, order: i })),
    }));
  };

  const updateRecommendation = (
    id: string,
    updates: Partial<RecommendationItem>
  ) => {
    updateData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    }));
  };

  const moveRecommendation = (id: string, direction: "up" | "down") => {
    updateData((prev) => {
      const sorted = [...prev.recommendations].sort(
        (a, b) => a.order - b.order
      );
      const idx = sorted.findIndex((r) => r.id === id);
      if (
        (direction === "up" && idx <= 0) ||
        (direction === "down" && idx >= sorted.length - 1)
      )
        return prev;
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      [sorted[idx].order, sorted[swapIdx].order] = [
        sorted[swapIdx].order,
        sorted[idx].order,
      ];
      return { ...prev, recommendations: sorted };
    });
  };

  const toggleRecommendation = (id: string) => {
    updateData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((r) =>
        r.id === id ? { ...r, active: !r.active } : r
      ),
    }));
  };

  /* ─── Publish ─── */

  const handlePublish = async () => {
    if (!data || !dirty) return;
    setPublishing(true);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, data }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setDirty(false);
        showToast(
          "success",
          `Publicado! Commit: ${result.commitSha?.slice(0, 7)}`
        );
      } else {
        showToast("error", result.error || "Erro ao publicar.");
      }
    } catch {
      showToast("error", "Erro de conexão ao publicar.");
    }
    setPublishing(false);
  };

  /* ─── Login Screen ─── */

  if (!authed) {
    return (
      <main className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
              <LogIn size={20} className="text-accent" />
            </div>
            <h1 className="text-lg font-bold text-text-primary">Admin</h1>
            <p className="text-sm text-text-secondary mt-1">
              Insira a senha para gerenciar seus links.
            </p>
          </div>

          <div className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Senha"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-bg-card border border-border text-text-primary text-sm focus:border-accent/50 focus:outline-none transition-colors placeholder:text-text-secondary/40"
            />
            <button
              onClick={handleLogin}
              disabled={authLoading || !password.trim()}
              className="w-full py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Entrar"
              )}
            </button>

            {authError && (
              <p className="text-red-400 text-xs flex items-center gap-1 justify-center">
                <AlertCircle size={12} /> {authError}
              </p>
            )}
          </div>
        </motion.div>
      </main>
    );
  }

  /* ─── Loading ─── */

  if (loading || !data) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <Loader2 size={24} className="animate-spin text-accent" />
      </main>
    );
  }

  const sortedLinks = [...data.links].sort((a, b) => a.order - b.order);
  const sortedRecs = [...data.recommendations].sort(
    (a, b) => a.order - b.order
  );

  /* ─── Shared row renderer ─── */

  function renderItemRow(
    item: { id: string; title: string; url: string; active: boolean },
    extra: React.ReactNode,
    actions: {
      onMove: (dir: "up" | "down") => void;
      onToggle: () => void;
      onRemove: () => void;
    }
  ) {
    const isEditing = editingId === item.id;
    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border transition-colors ${
          item.active
            ? "bg-bg-card border-border"
            : "bg-bg-card/50 border-border/50 opacity-60"
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          {/* Extra (emoji or store badge) */}
          {extra}

          {/* Title & URL */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-1.5">{renderEditFields(item)}</div>
            ) : (
              <>
                <p className="text-sm font-medium text-text-primary truncate">
                  {item.title}
                </p>
                <p className="text-[11px] text-text-secondary/60 truncate font-mono">
                  {item.url}
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => actions.onMove("up")}
              className="p-1.5 rounded-lg text-text-secondary/40 hover:text-text-primary hover:bg-white/5 transition-colors"
            >
              <ArrowUp size={14} />
            </button>
            <button
              onClick={() => actions.onMove("down")}
              className="p-1.5 rounded-lg text-text-secondary/40 hover:text-text-primary hover:bg-white/5 transition-colors"
            >
              <ArrowDown size={14} />
            </button>
            <button
              onClick={() => setEditingId(isEditing ? null : item.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                isEditing
                  ? "text-accent bg-accent/10"
                  : "text-text-secondary/40 hover:text-accent hover:bg-accent/5"
              }`}
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={actions.onToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                item.active
                  ? "text-green-400/60 hover:text-green-400"
                  : "text-text-secondary/30 hover:text-text-secondary"
              }`}
            >
              {item.active ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <button
              onClick={actions.onRemove}
              className="p-1.5 rounded-lg text-text-secondary/30 hover:text-red-400 hover:bg-red-400/5 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  function renderEditFields(item: {
    id: string;
    title: string;
    url: string;
  }) {
    const isRec = activeTab === "recommendations";
    return (
      <>
        <input
          type="text"
          value={item.title}
          onChange={(e) =>
            isRec
              ? updateRecommendation(item.id, { title: e.target.value })
              : updateLink(item.id, { title: e.target.value })
          }
          placeholder="Título"
          className="w-full bg-bg-primary border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary focus:border-accent/50 focus:outline-none"
        />
        <input
          type="url"
          value={item.url}
          onChange={(e) =>
            isRec
              ? updateRecommendation(item.id, { url: e.target.value })
              : updateLink(item.id, { url: e.target.value })
          }
          placeholder="https://..."
          className="w-full bg-bg-primary border border-border rounded-lg px-3 py-1.5 text-xs text-text-secondary font-mono focus:border-accent/50 focus:outline-none"
        />
      </>
    );
  }

  /* ─── Admin Dashboard ─── */

  return (
    <main className="max-w-2xl mx-auto min-h-screen px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-text-primary">
            Gerenciar Links
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            {data.links.length} links · {data.recommendations.length} recomendações
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            className="px-3 py-2 rounded-xl text-xs text-text-secondary border border-border hover:border-border-hover hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <ExternalLink size={12} /> Ver site
          </a>
          <button
            onClick={handlePublish}
            disabled={publishing || !dirty}
            className="px-4 py-2 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            {publishing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            {dirty ? "Publicar" : "Salvo"}
          </button>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl bg-bg-card border border-border">
        <button
          onClick={() => setActiveTab("links")}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "links"
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <Link2 size={14} /> Links ({data.links.length})
        </button>
        <button
          onClick={() => setActiveTab("recommendations")}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "recommendations"
              ? "bg-accent text-white"
              : "text-text-secondary hover:text-text-primary"
          }`}
        >
          <ShoppingBag size={14} /> Recomendações ({data.recommendations.length})
        </button>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-4 px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
              toast.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {toast.type === "success" ? (
              <Check size={14} />
            ) : (
              <AlertCircle size={14} />
            )}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links Tab */}
      {activeTab === "links" && (
        <div className="space-y-2">
          {sortedLinks.map((link) => {
            const isEditing = editingId === link.id;
            return renderItemRow(
              link,
              isEditing ? (
                <input
                  type="text"
                  value={link.emoji || ""}
                  onChange={(e) =>
                    updateLink(link.id, { emoji: e.target.value })
                  }
                  className="w-8 text-center bg-transparent text-lg focus:outline-none"
                  maxLength={2}
                />
              ) : (
                <span className="text-lg w-8 text-center shrink-0">
                  {link.emoji}
                </span>
              ),
              {
                onMove: (dir) => moveLinkItem(link.id, dir),
                onToggle: () => toggleLink(link.id),
                onRemove: () => removeLink(link.id),
              }
            );
          })}

          <button
            onClick={addLink}
            className="w-full mt-2 py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/30 hover:bg-accent/5 text-text-secondary hover:text-accent transition-all text-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Adicionar link
          </button>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === "recommendations" && (
        <div className="space-y-2">
          {sortedRecs.map((rec) => {
            const isEditing = editingId === rec.id;
            const storeColors: Record<string, string> = {
              shopee: "text-orange-400 bg-orange-400/10",
              amazon: "text-yellow-400 bg-yellow-400/10",
              mercadolivre: "text-yellow-300 bg-yellow-300/10",
            };
            const storeClass =
              storeColors[rec.store] || "text-text-secondary bg-white/5";

            return renderItemRow(
              rec,
              isEditing ? (
                <select
                  value={rec.store}
                  onChange={(e) =>
                    updateRecommendation(rec.id, { store: e.target.value })
                  }
                  className="text-[10px] font-bold uppercase bg-bg-primary border border-border rounded-lg px-2 py-1 text-text-primary focus:outline-none shrink-0"
                >
                  <option value="shopee">Shopee</option>
                  <option value="amazon">Amazon</option>
                  <option value="mercadolivre">Mercado Livre</option>
                </select>
              ) : (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg shrink-0 ${storeClass}`}
                >
                  {rec.store}
                </span>
              ),
              {
                onMove: (dir) => moveRecommendation(rec.id, dir),
                onToggle: () => toggleRecommendation(rec.id),
                onRemove: () => removeRecommendation(rec.id),
              }
            );
          })}

          <button
            onClick={addRecommendation}
            className="w-full mt-2 py-3 rounded-2xl border-2 border-dashed border-border hover:border-accent/30 hover:bg-accent/5 text-text-secondary hover:text-accent transition-all text-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Adicionar recomendação
          </button>
        </div>
      )}

      {/* Publish reminder */}
      {dirty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-2xl shadow-lg shadow-accent/20 text-sm font-medium flex items-center gap-3 z-50"
        >
          <span>Alterações não publicadas</span>
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
          >
            {publishing ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Save size={12} />
            )}
            Publicar
          </button>
        </motion.div>
      )}
    </main>
  );
}
