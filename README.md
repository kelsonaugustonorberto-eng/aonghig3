# aonghig3

## Ango Higiene — Higienização profissional em Luanda

Landing site + agendamento online construídos com Next.js 16 (App Router) e Tailwind. O foco é mobile-first, visual limpo inspirado no site da Apple e um fluxo de pedido que notifica a equipa assim que um cliente agenda.

### Stack
- Next.js 16 + React 19
- Tailwind CSS v4
- TypeScript
- API Routes para `/api/agendamentos`
- PostgreSQL (via `@vercel/postgres`) + fallback em memória para desenvolvimento
- Telegram Bot API para alertas operacionais

### Como executar
```bash
npm install
npm run dev
# abre http://localhost:3000
```

### Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:

| Variável | Uso |
| --- | --- |
| `POSTGRES_URL` | URL do PostgreSQL (Vercel Postgres, Supabase, RDS, etc.). Opcionalmente defina também `POSTGRES_URL_NON_POOLING`. |
| `TELEGRAM_BOT_TOKEN` | Token fornecido pelo BotFather. |
| `TELEGRAM_CHAT_ID` | ID do grupo/canal que receberá as notificações. |
| `ADMIN_ACCESS_KEY` | Chave simples usada para proteger `/admin`. |
| `UPLOAD_DIR` | Caminho onde as fotos “antes/depois” são gravadas (default `public/uploads`). |
| `UPLOAD_PUBLIC_BASE` | URL base pública para servir as fotos (default `/uploads`). |

> Sem `POSTGRES_URL`, o endpoint persiste os pedidos numa store em memória (útil só em desenvolvimento). Sem o token/chat do Telegram, nenhuma mensagem é enviada, mas o pedido continua a ser guardado.

### Estrutura de dados
Tabela `agendamentos`:
```sql
CREATE TABLE IF NOT EXISTS agendamentos (
  id TEXT PRIMARY KEY,
  service_type TEXT NOT NULL,
  detail TEXT,
  municipio TEXT NOT NULL,
  bairro TEXT NOT NULL,
  endereco TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  period TEXT NOT NULL,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'PENDENTE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Tabela `gallery_items`:
```sql
CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  category TEXT NOT NULL,
  service_type TEXT,
  location TEXT,
  before_url TEXT NOT NULL,
  after_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Fluxo técnico de agendamento
1. O formulário em `/agendar` envia `POST /api/agendamentos`.
2. O endpoint valida os campos com `zod`.
3. Um ID no formato `AG-AAAA-####` é gerado e o registo é gravado no PostgreSQL (ou na store in-memory enquanto o DB não estiver configurado).
4. `lib/telegram.ts` monta a mensagem no formato solicitado e chama `https://api.telegram.org/bot{TOKEN}/sendMessage`.
5. O utilizador é redirecionado para `/agendar/sucesso?id=AG-2025-0001`.

### Painel /admin
- Área protegida por chave simples (`ADMIN_ACCESS_KEY`).
- `/admin`: lista todos os agendamentos com botão para alterar estado (`PENDENTE`, `CONFIRMADO`, `CONCLUIDO`, `CANCELADO`). Após cada alteração as páginas públicas são revalidadas.
- `/admin/galeria`: formulário para fazer upload das fotos antes/depois + listagem dos últimos envios.
- Upload local grava ficheiros no diretório definido por `UPLOAD_DIR` (default `public/uploads`). Em produção recomenda-se apontar essa variável para um bucket (S3, Supabase Storage, etc.) e garantir que `UPLOAD_PUBLIC_BASE` aponta para o domínio público dessas imagens.

### API `/api/agendamentos`
- **Método:** `POST`
- **Body:** JSON com `serviceType`, `detail`, `municipio`, `bairro`, `endereco`, `preferredDate (YYYY-MM-DD)`, `period` (`"Manhã"` ou `"Tarde"`), `nome`, `telefone`, `email?`, `observacoes?`.
- **Resposta 200:** `{ "data": AgendamentoRecord }`
- **Erros 400/500:** `{ "message": string }`

### Próximos passos recomendados
1. **Persistência real das mensagens de contacto** — atualmente o formulário apenas mostra um aviso local.
2. **Integração com storage externo** — apontar `UPLOAD_DIR`/`UPLOAD_PUBLIC_BASE` para S3, Cloudinary, Supabase Storage ou similar para ambiente de produção.
3. **CMS/Blog** — habilitar `/blog` para conteúdo educativo (SEO “higienização de sofás Luanda”).
4. **Testes automatizados** — adicionar testes de componentes e de API (`vitest` + `@testing-library/react`).

### Scripts úteis
- `npm run dev` — ambiente local
- `npm run build` — build de produção
- `npm run start` — serve build
- `npm run lint` — ESLint
