# 🔗 LinkHub v2
> **Open Source Link-in-Bio para Criadores de Conteúdo**
> **URL:** [links.mauricio.com.br](https://links.mauricio.com.br)

Central de links dinâmica, minimalista e open source. Inspirada no Linktree, mas 100% customizável via JSON — sem banco de dados, sem painel admin, sem vendor lock-in.

## 🎯 Objetivo
Ferramenta de conversão para bio do Instagram/TikTok/YouTube. Funciona para qualquer influencer ou criador: basta editar o `data.json` e fazer push.

---

## 🛠️ Stack
- **Next.js 16** (App Router) + **Tailwind CSS v4** + **Framer Motion**
- **Cloudflare Pages** (deploy)
- Dados em `public/data/data.json` (git-tracked)

## 📦 Schema
Tudo dinâmico via JSON: perfil, tema (cor de acento), SEO, e seções de links com tipos `link`, `header`, e `product`.