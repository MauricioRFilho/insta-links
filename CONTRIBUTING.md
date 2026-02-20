# Guia de Contribuição e Organização do Projeto

Bem-vindo ao repositório do **Insta Links**! Este documento serve como guia para manter o projeto organizado e consistente em futuras atualizações.

## 📁 Estrutura do Projeto

O projeto é construído com Next.js (App Router) e segue a seguinte arquitetura de pastas dentro de `src/`:

- `app/`: Contém as rotas da aplicação (páginas visíveis).
  - `/ofertas`: Lista as ofertas ativas para o usuário final.
  - `/admin`: Painel administrativo para buscar e salvar produtos na base.
- `components/`: Componentes de UI reutilizáveis (ex: botões, inputs, cabeçalhos).
- `actions/`: Server Actions (funções que rodam no servidor). Centraliza a comunicação com APIs externas e banco de dados.
- `services/`: Lógica de integração com serviços de terceiros (ex: classe `ShopeeService`).
- `lib/`: Configurações e clientes globais (ex: cliente do `supabase`).
- `data/`: Arquivos estáticos de configuração de perfil e dados em memória.

## 🛠 Tecnologias

- **Framework:** Next.js (React)
- **Estilização:** Tailwind CSS v4 + Framer Motion
- **Ícones:** Lucide React
- **Banco de Dados:** Supabase (PostgreSQL)

## 🔑 Variáveis de Ambiente Necessárias

Para rodar localmente, o arquivo `.env.local` na raiz precisa ter:

```env
NEXT_PUBLIC_BASE_URL=seu_dominio
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_supabase
SHOPEE_APP_ID=seu_app_id
SHOPEE_APP_SECRET=seu_app_secret
```

## 📝 Regras de Desenvolvimento

1. **Separação de Preocupações:** Funções que acessam o banco ou chaves secretas (como o `ShopeeService` usando `process.env.SHOPEE_APP_SECRET`) devem estar dentro de `Server Actions` (`src/actions`) para não expor as chaves ao navegador.
2. **Acesso Seguro:** Utilize sempre a declaração `"use server";` no topo de arquivos dentro de `actions/`.
3. **Estilização Compartilhada:** Sempre priorize o uso das classes estendidas do Tailwind definidas (como `cyber-cyan`, `cyber-green`, etc.) para manter a estética Cyberpunk fluída.

---
_Este documento será atualizado conforme o projeto expandir._
