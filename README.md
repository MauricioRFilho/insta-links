# 🔗 Mauricio Links

Central de links pessoal estilo Linktree, com painel admin que publica via
GitHub API.

**URL:** [links.mauricio.com.br](https://links.mauricio.com.br)

---

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animações)
- **Lucide React** (ícones)
- **Zero banco de dados** — dados em `public/data/links.json`

---

## Estrutura

```
src/
├── app/
│   ├── page.tsx              ← Página pública (Linktree)
│   ├── admin/page.tsx        ← Painel admin (login + CRUD + publish)
│   ├── api/
│   │   ├── auth/route.ts     ← Validação de senha
│   │   └── publish/route.ts  ← Push JSON via GitHub API
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ProfileHeader.tsx     ← Avatar + nome + bio
│   ├── SocialIcons.tsx       ← Ícones redes sociais
│   ├── LinkCard.tsx          ← Botão de link pessoal
│   └── RecommendationCard.tsx ← Card de produto com badge da loja
public/
├── data/links.json           ← "Banco de dados" (git-tracked)
└── profile-short.png
```

---

## Como funciona

1. **Página pública** (`/`) — Lê `links.json` e renderiza os links
2. **Admin** (`/admin`) — Login com senha → CRUD de links e recomendações
3. **Publicar** — O admin faz `PUT` no JSON via GitHub Contents API → commit
   automático → Vercel detecta o push e redesplega

```
Admin edita links → Clica "Publicar"
  → API Route /api/publish
    → GitHub Contents API (PUT links.json)
      → Vercel Webhook → Redeploy automático
```

---

## Variáveis de Ambiente

| Variável | Tipo | Descrição |
|----------|------|-----------|
| `NEXT_PUBLIC_BASE_URL` | Pública | Domínio do site (sem `https://`) |
| `ADMIN_PASSWORD` | **Secreta** | Senha de acesso ao painel admin |
| `GITHUB_TOKEN` | **Secreta** | Personal Access Token do GitHub (permissão `repo`) |
| `GITHUB_REPO` | Server | Repositório no formato `owner/repo` |

### Como gerar o GITHUB_TOKEN

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. **Generate new token (classic)**
3. Selecione o scope: **`repo`** (Full control of private repositories)
4. Copie o token gerado (`ghp_...`)
5. Cole como valor de `GITHUB_TOKEN` no `.env.local` e na Vercel

---

## Deploy (Vercel)

### Variáveis que devem ser configuradas na Vercel:

```
NEXT_PUBLIC_BASE_URL = links.mauricio.com.br
ADMIN_PASSWORD       = (sua senha forte)
GITHUB_TOKEN         = ghp_XXXXXXXXXXXXXX
GITHUB_REPO          = MauricioRFilho/insta-links
```

**Onde configurar:** Vercel Dashboard → Projeto → Settings → Environment Variables

> ⚠️ Marque `ADMIN_PASSWORD` e `GITHUB_TOKEN` como **Sensitive** na Vercel.

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse:
- Página: [localhost:3000](http://localhost:3000)
- Admin: [localhost:3000/admin](http://localhost:3000/admin)

---

## Gerenciamento de links

### Via Admin (recomendado)
1. Acesse `/admin` e faça login
2. Use a aba **Links** para links pessoais (GitHub, Strava, Contato)
3. Use a aba **Recomendações** para produtos com badge de loja (Shopee, Amazon, ML)
4. Clique **Publicar** para salvar as mudanças

### Via JSON (manual)
Edite `public/data/links.json` diretamente e faça commit/push.
