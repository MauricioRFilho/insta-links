# 🔗 LinkHub

Central de links para criadores de conteúdo — minimalista, dinâmica, open source.

**URL:** [links.mauricio.com.br](https://links.mauricio.com.br)

---

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion** (animações)
- **Lucide React** (ícones)
- **Cloudflare Pages** (deploy)
- **Zero banco de dados** — dados em `public/data/data.json`

---

## Estrutura

```
src/
├── app/
│   ├── page.tsx              ← Página pública (renderiza sections)
│   ├── layout.tsx            ← Layout com meta dinâmico do JSON
│   ├── globals.css           ← Design system
│   ├── icon.tsx              ← Favicon gerado
│   ├── manifest.ts           ← PWA manifest
│   ├── robots.ts             ← robots.txt
│   └── sitemap.ts            ← sitemap.xml
├── components/
│   ├── Avatar.tsx            ← Avatar com ring animado + verified
│   ├── ProfileHeader.tsx     ← Nome + bio
│   ├── SocialBar.tsx         ← Ícones de redes sociais
│   ├── LinkItem.tsx          ← Card de link genérico
│   ├── ProductItem.tsx       ← Card de produto com badge de loja
│   ├── SectionHeader.tsx     ← Divider de seção
│   └── Footer.tsx            ← Footer minimalista
├── types/
│   └── schema.ts             ← Tipagem do JSON schema
public/
├── data/data.json            ← "Banco de dados" (fonte da verdade)
├── avatar.png                ← Foto de perfil
└── thumbnails/               ← Thumbnails opcionais dos links
```

---

## Como funciona

1. **Página pública** (`/`) — Lê `data.json` e renderiza as seções dinâmicas
2. **Gestão de links** — Edite `public/data/data.json` e faça push → Cloudflare Pages rebuilda automaticamente

```
Editar data.json → git push
  → Cloudflare Pages detecta push
    → Rebuild automático → Site atualizado
```

---

## Schema (`data.json`)

O JSON é dividido em 4 seções:

| Seção | Descrição |
|-------|-----------|
| `meta` | SEO: title, description, ogImage, lang |
| `theme` | Cor de acento (`accentColor`), estilo |
| `profile` | Nome, bio, avatar, verified, redes sociais |
| `sections[]` | Lista de itens: `link`, `header`, ou `product` |

### Tipos de seção

| type | Campos | Descrição |
|------|--------|-----------|
| `link` | title, subtitle, url, emoji, thumbnail | Link genérico |
| `header` | title | Divider visual entre grupos |
| `product` | title, subtitle, url, store, thumbnail | Recomendação com badge de loja |

---

## Personalização

Para usar em outro perfil, edite apenas `public/data/data.json`:

1. **Perfil**: nome, bio, avatar, redes sociais
2. **Tema**: `accentColor` aceita qualquer cor hex (ex: `#3b82f6` para azul)
3. **Links**: adicione/remova itens em `sections[]`
4. **SEO**: title, description, ogImage em `meta`

---

## Deploy (Cloudflare Pages)

### Configuração no dashboard:

1. Conecte o repositório GitHub
2. **Build command:** `npx @cloudflare/next-on-pages`
3. **Output directory:** `.vercel/output/static`
4. **Compatibility flags:** `nodejs_compat`

### Variáveis de ambiente:

```
NEXT_PUBLIC_BASE_URL = links.mauricio.com.br
NODE_VERSION = 20
```

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: [localhost:3000](http://localhost:3000)

---

## Licença

MIT
