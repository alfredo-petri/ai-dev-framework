# project-init

**Skill**: Inicializa a infraestrutura de contexto AI no projeto atual.

## Quando usar

Primeira vez configurando o projeto para uso com agentes AI. Cria `AGENTS.md`, `constitution.md`, `components-registry.md` e a pasta `aicontext/` com conteúdo real e adequado ao projeto.

---

## Procedimento

### Etapa 0 — Scan do projeto

Antes de perguntar, coletar automaticamente:

1. Ler `package.json`: extrair `name`, `description`, dependências principais
2. Verificar outros manifestos: `pyproject.toml`, `go.mod`, `Cargo.toml`, `pubspec.yaml`, `pom.xml`
3. Verificar arquivos existentes: `AGENTS.md`, `constitution.md`, `components-registry.md`, `aicontext/`
4. Detectar AI tools: `.claude/`, `.codex`, `.github/copilot-instructions.md`, `.cursor/`, `.windsurf/`
5. Detectar framework a partir de dependências (next, react, vue, svelte, express, fastapi, django, etc.)

Para cada arquivo/pasta já existente: informar ao usuário e perguntar se deve sobrescrever ou pular.

Apresentar ao iniciar: *"Vou criar a infraestrutura de contexto AI para este projeto. Farei perguntas em grupos — para cada uma, escolha uma sugestão, combine várias, ou descreva livremente. Pule o que não souber ainda (ficará como `[a definir]`)."*

---

### Etapa 1 — Grupo: Identidade e propósito

**Q1 — Nome e finalidade**
*(Se detectado em package.json/README, confirmar em vez de perguntar)*

> Qual é o nome do projeto e sua finalidade em 1-2 frases?

Exemplos:
- "Portal B2B de gestão de contratos para equipes jurídicas"
- "API de pagamentos para marketplace de cursos online"
- "App mobile de rastreamento de treinos físicos"

*Descrever livremente.*

---

**Q2 — Tipo do projeto**

> Qual é o tipo do projeto?

```
a) Web app fullstack (frontend + backend no mesmo repositório)
b) Web app frontend (SPA ou SSR, consome API externa)
c) API / backend puro (REST, GraphQL, gRPC)
d) Mobile app (React Native, Flutter, Swift, Kotlin)
e) CLI tool
f) Library / SDK / package
g) Desktop app (Electron, Tauri)
h) Descrever livremente
```

**Q2b** *(contextual — perguntar após Q2)*:
- Se web/fullstack: "Público-alvo: a) B2B SaaS / b) B2C produto / c) Internal tool / d) Descrever"
- Se API: "Protocolo: a) REST / b) GraphQL / c) gRPC / d) Misto / e) Descrever"
- Se mobile: "Plataforma: a) iOS nativo / b) Android nativo / c) React Native / d) Flutter / e) Descrever"
- Se library: "Distribuição: a) Público (npm/pypi/crates) / b) Interno (monorepo/privado)"

---

**Q3 — Módulos e áreas funcionais**

> Quais são as principais áreas funcionais ou módulos do projeto?
> *(Cada item vira um arquivo `aicontext/<modulo>.md`. Liste o que existir ou estiver previsto.)*

Exemplos por tipo de projeto:
- Web SaaS: `auth`, `billing`, `dashboard`, `users`, `notifications`, `settings`
- E-commerce: `products`, `cart`, `checkout`, `orders`, `payments`, `reviews`
- API: `auth`, `users`, `resources`, `webhooks`, `admin`
- Mobile: `auth`, `home`, `profile`, `feed`, `notifications`

*Listar livremente — um por linha ou separado por vírgula.*

---

### Etapa 2 — Grupo: Stack técnica

*(Pular perguntas já detectadas automaticamente — confirmar em vez de perguntar)*

**Q4 — Linguagem e versão**
*(Pular se detectado)*

> Qual a linguagem principal e versão?

```
a) TypeScript (versão ____)
b) JavaScript (ES2022+)
c) Python (versão ____)
d) Go (versão ____)
e) Rust
f) Java / Kotlin
g) Descrever livremente
```

---

**Q5 — Framework principal**
*(Pular se detectado nas dependências)*

> Qual o framework principal?

```
a) Next.js (versão ____)
b) React (SPA + Vite/CRA)
c) Vue.js / Nuxt
d) Svelte / SvelteKit
e) Express / Fastify (Node.js backend)
f) FastAPI / Django / Flask (Python)
g) Spring Boot (Java/Kotlin)
h) Gin / Echo (Go)
i) Nenhum (vanilla / scripts)
j) Descrever livremente
```

---

**Q6 — UI e sistema de design**
*(Pular se não aplicável — CLI, API, library)*

> Sistema de design / biblioteca de componentes?

```
a) shadcn/ui + Radix UI + Tailwind CSS
b) Material UI (MUI)
c) Ant Design
d) Tailwind CSS puro (sem biblioteca de componentes)
e) Chakra UI
f) Bootstrap / React Bootstrap
g) Sistema de design próprio
h) Nenhum (sem camada visual)
i) Descrever livremente
```

---

**Q7 — Dados e persistência**

> Banco de dados e acesso a dados?

```
a) PostgreSQL + Prisma
b) PostgreSQL + TypeORM / Drizzle
c) MongoDB + Mongoose
d) MySQL + Prisma / TypeORM
e) SQLite (local / testes)
f) Supabase (PostgreSQL gerenciado)
g) Firebase / Firestore
h) Redis (cache / session store)
i) Sem banco (API externa / sem estado)
j) Descrever livremente (pode combinar: ex. PostgreSQL + Redis)
```

---

**Q8 — Estado e data fetching**
*(Pular se API puro ou sem frontend)*

> Gerenciamento de estado e data fetching?

```
a) TanStack Query (React Query) — estado de servidor
b) SWR — data fetching
c) Redux Toolkit (+ RTK Query)
d) Zustand — estado global local
e) Jotai / Recoil — estado atômico
f) Context API + hooks próprios
g) Sem gerenciamento explícito (SSR / Server Components)
h) Descrever livremente (pode combinar: ex. TanStack Query + Zustand)
```

---

**Q9 — Autenticação**

> Autenticação?

```
a) Clerk (gerenciado)
b) NextAuth / Auth.js
c) Supabase Auth
d) Firebase Authentication
e) JWT próprio + refresh tokens
f) OAuth 2.0 direto (Google, GitHub, etc.)
g) Session-based (cookies + servidor)
h) Sem autenticação
i) Descrever livremente
```

---

**Q10 — Testes**

> Framework de testes?

```
a) Vitest (+ React Testing Library para componentes)
b) Jest (+ React Testing Library para componentes)
c) Pytest (Python)
d) Go test (nativo)
e) RSpec (Ruby)
f) Playwright / Cypress (E2E)
g) Combinação: ex. "Vitest para unit + Playwright para E2E"
h) Nenhum configurado ainda
i) Descrever livremente
```

---

### Etapa 3 — Grupo: Arquitetura e organização de código

**Q11 — Estrutura de pastas**

> Como o código é organizado?

```
a) Por feature — cada feature tem sua pasta com components/, hooks/, types/, services/ co-localizados
   Ex: src/features/auth/, src/features/payments/
b) Por tipo — pastas globais separadas por responsabilidade
   Ex: src/components/, src/hooks/, src/services/, src/types/
c) Camadas (layered architecture) — presentation, business, data
   Ex: src/controllers/, src/services/, src/repositories/, src/models/
d) Domain-driven (DDD) — domain, application, infrastructure
e) Estrutura do framework (Next.js app/, pages/ — seguir convenção)
f) Descrever livremente
```

---

**Q12 — Separação de responsabilidades**

> Onde fica a lógica de negócio?

```
a) Hooks customizados (use*) — cada feature tem seus hooks de lógica
b) Services layer — funções puras em services/ ou lib/
c) Domain objects / entities com métodos de negócio
d) Direto nos componentes quando simples, extraído quando complexo
e) Descrever livremente
```

**Regra sobre componentes** (confirmar):

> Componentes de UI devem focar em renderização e orquestração — sem lógica de negócio inline?

```
a) Sim, obrigatório — extrair qualquer lógica não trivial para hooks/services
b) Sim, recomendado — mas permitido em casos simples e claros
c) Não aplicável (projeto não tem componentes de UI)
d) Descrever regra própria
```

---

**Q13 — Diretórios protegidos**

> Há diretórios ou módulos que nunca devem ser modificados diretamente?
> *(Ex: core/ imutável que vem de template, vendor/, shared/ cross-team)*

```
a) Não há — todo código deste repo é modificável
b) Sim: src/core/ — vem de template/base, atualizado via merge, nunca editado direto
c) Sim: shared/ ou libs/ — compartilhado entre times, mudanças precisam de aprovação
d) Sim — descrever quais e por quê
e) Descrever livremente
```

---

**Q14 — Nomenclatura**
*(Pular se óbvio pela stack — ex: Next.js implica PascalCase para componentes)*

> Padrão de nomenclatura?

```
a) Convenção TypeScript/JS padrão:
   - Componentes: PascalCase (UserCard.tsx)
   - Arquivos: kebab-case (user-card.tsx)
   - Hooks: camelCase prefixado (useUserData.ts)
   - Tipos/Interfaces: PascalCase (UserProfile, IUserService)
   - Funções/variáveis: camelCase
   - Constantes: UPPER_SNAKE_CASE
b) Arquivos em camelCase (UserCard.tsx, userCard.ts)
c) Descrever convenção própria
```

---

**Q15 — Tipagem estrita**
*(Pular se linguagem não tipada)*

> Restrições sobre uso de `any`, `@ts-ignore` e equivalentes?

```
a) Proibido — qualquer uso deve ser aprovado em code review com justificativa documentada no PR
b) Permitido apenas com comentário explicando o porquê (// ts-ignore: razão específica)
c) Sem restrição formal
d) Descrever política própria
```

---

### Etapa 4 — Grupo: Regras de domínio imutáveis

**Q16 — Regras de negócio permanentes**

> Quais são as regras de negócio que nunca podem ser violadas?
> *(Escolha as que se aplicam e/ou adicione as suas)*

```
Sugestões comuns:
[ ] Dados de usuário nunca deletados fisicamente — apenas soft delete com flag deleted_at
[ ] Toda transação financeira tem audit log imutável
[ ] Preços/valores monetários sempre armazenados em centavos (menor unidade)
[ ] Emails de usuário únicos e case-insensitive no banco
[ ] Dados históricos nunca alterados retroativamente
[ ] Ações destrutivas ou irreversíveis exigem confirmação explícita do usuário
[ ] Eventos de negócio críticos têm rastreabilidade completa (quem, quando, o quê)
[ ] Nenhum dado pessoal (PII) em logs
[ ] Descrever outras regras específicas do domínio
```

---

**Q17 — Segurança obrigatória**

> Restrições de segurança não negociáveis?
> *(Escolha as que se aplicam e/ou adicione as suas)*

```
Sugestões comuns:
[ ] Nenhum segredo, chave de API ou credencial commitada — tudo via variáveis de ambiente
[ ] Toda rota/endpoint autenticado por padrão — rotas públicas são exceção explícita
[ ] Inputs sempre validados no servidor, independente de validação no cliente
[ ] Dados renderizados sempre sanitizados (prevenção de XSS)
[ ] Autorização verificada por recurso, não apenas por papel genérico
[ ] Tokens de sessão com expiração e rotação em operações sensíveis
[ ] Dependências auditadas regularmente (npm audit / safety / dependabot)
[ ] Descrever outras restrições de segurança
```

---

**Q18 — Contratos e integridade de dados**

> Contratos que não podem ser quebrados?
> *(Escolha as que se aplicam e/ou adicione as suas)*

```
Sugestões comuns:
[ ] API pública versionada — v1 nunca quebra backwards compatibility sem deprecation notice
[ ] Schema de banco versionado com migrations — nunca alterar schema diretamente em produção
[ ] Contratos de integração com sistemas externos documentados e testados
[ ] Payloads de eventos/webhooks estáveis — campos não removidos sem versionamento
[ ] Interfaces TypeScript/types de API gerados ou validados por schema (zod, yup, etc.)
[ ] Descrever outros contratos específicos
```

---

### Etapa 5 — Grupo: Qualidade e UX

**Q19 — Padrão de commits**

> Padrão de mensagens de commit?

```
a) Conventional Commits em Português
   Ex: feat(auth): adiciona login com Google
       fix(payments): corrige cálculo de desconto progressivo
b) Conventional Commits em Inglês
   Ex: feat(auth): add Google login
       fix(payments): fix progressive discount calculation
c) Prefixo livre com tipo
   Ex: [FEAT] Login com Google
       [FIX] Cálculo de desconto
d) Livre (sem padrão formal)
e) Descrever padrão próprio
```

---

**Q20 — Fluxo de desenvolvimento**

> Como features são desenvolvidas?

```
a) Spec-driven: spec → plan → tasks → implementation (nunca implementar sem spec aprovada)
b) Issue-driven: toda feature começa com issue no GitHub/Jira/Linear
c) Branch-driven: feature branch por item, PR com review obrigatório
d) Combinação: descrever qual combinação
e) Livre — sem processo formal ainda
```

---

**Q21 — Estados de interface obrigatórios**
*(Pular se API puro ou CLI)*

> Quais estados a UI deve sempre tratar?

```
Sugestões:
[ ] Loading — toda operação assíncrona > 200ms tem indicador de progresso
[ ] Error — toda falha tem mensagem acionável para o usuário (não "algo deu errado")
[ ] Empty — toda listagem tem estado de vazio (ex: "Nenhum item encontrado")
[ ] Success — confirmação visual após ação completada
[ ] Skeleton screens para carregamento de conteúdo
[ ] Estados offline / sem conexão tratados graciosamente
[ ] Descrever outros estados obrigatórios
```

---

**Q22 — Cobertura de testes obrigatória**

> Quando testes são obrigatórios?

```
a) Toda funcionalidade nova tem testes — sem exceção
b) Regras de negócio têm teste unitário obrigatório; UI tem teste quando crítica
c) Apenas código de alto risco (pagamentos, auth, dados) tem cobertura obrigatória
d) Sem cobertura mínima formal por enquanto
e) Descrever política de testes
```

---

**Q23 — Observabilidade**

> Padrões de logging e monitoramento?

```
a) Sentry — captura de erros e performance
b) Datadog — logs estruturados + APM + alertas
c) Prometheus + Grafana — métricas de infra
d) Logs estruturados em JSON (stdout/stderr) — sem ferramenta específica ainda
e) console.log/print (desenvolvimento apenas, produção usa serviço externo)
f) OpenTelemetry — traces distribuídos
g) Sem padrão formal ainda
h) Descrever livremente
```

---

**Q24 — Frontend: padrões de código**
*(Pular se não aplicável)*

> Restrições de padrões de código frontend?

```
Sugestões:
[ ] Sem `var` — usar const e let
[ ] Sem `==` / `!=` — usar `===` / `!==`
[ ] Preferir arrow functions
[ ] Sem funções inline em JSX que causam re-render desnecessário
[ ] Sem manipulação direta do DOM quando framework gerencia o ciclo
[ ] Imports organizados (externos → internos → relativos)
[ ] Descrever outras restrições
```

---

### Etapa 6 — Confirmação e geração

Apresentar resumo completo do que será gerado:

```
━━ Arquivos a criar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✓ AGENTS.md              regras operacionais para AI agents
  ✓ constitution.md        princípios imutáveis do projeto
  ✓ components-registry.md registro de componentes reutilizáveis
  ✓ aicontext/README.md    índice dos contextos de domínio
  ✓ aicontext/<mod>.md     N arquivos de módulo

Bridges para AI tools detectados:
  ✓ [lista de tools detectados com ação correspondente]

━━ Preview da constitution.md ━━━━━━━━━━━━━━━━━━━━━

[listar seções que serão preenchidas vs. marcadas [a definir]]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirma? (s/n — ou "editar" para ajustar alguma resposta)
```

---

### Etapa 7 — Geração dos arquivos

Usando as respostas coletadas, preencher todos os templates com conteúdo real:

**`constitution.md`** — preencher TODAS as seções com as respostas reais:
- I. Finalidade: Q1 + Q2 + Q2b
- II. Tipagem e Qualidade de Código: Q14 + Q15 + Q24
- III. Arquitetura e Separação: Q11 + Q12 + Q13
- IV. Stack Oficial: Q4-Q10
- V. Regras de Domínio: Q16
- VI. Segurança e Contratos: Q17 + Q18
- VII. Qualidade, Testes e Fluxo: Q19 + Q20 + Q22 + Q23
- VIII. UX e Interface: Q21 *(omitir seção se não aplicável)*
- IX. Governança: texto padrão do template

Para cada seção: se pergunta foi pulada ou respondida com "não definido", usar placeholder `[a definir — completar após primeiras decisões do projeto]`.

Adicionar racional (`**Racional**: ...`) em cada seção quando o conteúdo for específico o suficiente para justificar. Seguir o padrão do exemplo `constitution.md` da dndicas: explicar o *porquê* de cada regra.

**`AGENTS.md`** — preencher stack, domínio, módulos, AI tools detectados.

**`components-registry.md`** — tabela vazia com estrutura.

**`aicontext/README.md`** — índice com todos os módulos de Q3.

**`aicontext/<modulo>.md`** — para cada módulo:
```markdown
# <Nome do Módulo>

## Features

*(nenhuma documentada ainda — atualizar após cada feature entregue via skill `document-aicontext`)*

## Contratos

*(nenhum documentado ainda)*
```

---

### Etapa 8 — Bridges para AI tools

*(sem sobrescrever conteúdo existente)*

**Claude Code** (`.claude/` presente):
- Se não existe `CLAUDE.md` na raiz: criar com `@AGENTS.md`
- Se existe: verificar se já tem referência — se não, informar ao usuário

**Codex CLI** (binário `codex` ou `.codex` presente):
- Nenhuma ação — Codex lê `AGENTS.md` na raiz nativamente

**Copilot** (`.github/` presente):
- Criar/atualizar `.github/copilot-instructions.md` com referência ao `AGENTS.md`

**Cursor** (`.cursor/rules/` presente):
- Criar/atualizar `.cursor/rules/agents.mdc` com referência ao `AGENTS.md`

**Windsurf** (`.windsurf/rules/` presente):
- Criar/atualizar `.windsurf/rules/agents.md` com referência ao `AGENTS.md`

---

## Saída esperada

```
✓ AGENTS.md criado
✓ constitution.md criado (9 seções — N preenchidas, M marcadas [a definir])
✓ components-registry.md criado
✓ aicontext/README.md criado
✓ aicontext/<modulo>.md criado (N módulos)

Bridges:
  ✓ CLAUDE.md → @AGENTS.md
  [outros detectados]

Próximos passos:
  - Revisar constitution.md e completar seções [a definir]
  - Adicionar componentes existentes em components-registry.md
  - Alimentar aicontext/ após cada feature (skill document-aicontext)
  - Design intelligence (161 palettes, 67 estilos, guidelines por stack) — instalar para todos os agents detectados:
    ```bash
    for agent in claude codex copilot cursor windsurf gemini; do npx uipro-cli init --ai $agent; done
    ```
```

---

## Regras

- Nunca sobrescrever arquivo existente sem confirmação explícita
- Perguntas com sugestões: usuário pode escolher uma, combinar várias, ou descrever livremente
- Criar arquivos em `aicontext/` apenas para módulos citados — sem arquivos genéricos vazios
- Confirmar resumo antes de gerar qualquer arquivo
- Se resposta não suficiente para preencher seção: marcar `[a definir]`, nunca inventar conteúdo
- Adicionar racional às regras quando suficientemente específico — explica o *porquê*, não apenas o *quê*
