# project-init

**Skill**: Inicializa a infraestrutura de contexto AI no projeto atual.

## Quando usar

Primeira vez configurando o projeto para uso com agentes AI. Cria `AGENTS.md`, `constitution.md`, `components-registry.md` e a pasta `aicontext/` com estrutura base adequada ao projeto.

---

## Procedimento

### Etapa 0 — Scan do projeto

Antes de perguntar, coletar o máximo possível automaticamente:

1. Ler `package.json` (se existir): extrair `name`, `description`, dependências principais
2. Verificar outros manifestos: `pyproject.toml`, `go.mod`, `Cargo.toml`, `pubspec.yaml`, `pom.xml`
3. Verificar arquivos existentes na raiz: `AGENTS.md`, `constitution.md`, `components-registry.md`, `aicontext/`
4. Detectar AI tools presentes: `.claude/`, `.codex`, `.github/copilot-instructions.md`, `.cursor/`, `.windsurf/`

Para cada arquivo/pasta já existente: informar ao usuário e perguntar se deve sobrescrever ou pular.

---

### Etapa 1 — Grupo: Identidade do projeto

Apresentar: *"Vou criar a estrutura de contexto AI para este projeto. Algumas perguntas para gerar arquivos relevantes — responda com o que souber, pule o que não se aplicar."*

**Q1**: Qual é o nome do projeto e sua finalidade em 1-2 frases?
*(Se detectado em package.json/README, confirmar em vez de perguntar.)*

**Q2**: Qual é o tipo do projeto?
- Web app (frontend ou fullstack)
- Mobile app
- API / backend
- CLI tool
- Library / SDK
- Desktop app
- Outro

**Q2b** *(contextual por tipo)*:
- Se web: "Qual o público-alvo? B2B SaaS / B2C produto / internal tool / outro"
- Se API: "Qual protocolo? REST / GraphQL / gRPC / misto"
- Se mobile: "Qual plataforma? iOS nativo / Android nativo / React Native / Flutter / outro"
- Se library: "Para uso público (npm/pypi) ou interno?"

**Q3**: Quais são os principais módulos ou áreas funcionais do projeto?
*(Lista livre — cada item vira um arquivo `aicontext/<modulo>.md`. Ex: auth, payments, dashboard, users, notifications)*

---

### Etapa 2 — Grupo: Stack e arquitetura

Apresentar: *"Agora sobre a stack técnica."* Pular perguntas já respondidas pela detecção automática — confirmar em vez de perguntar quando detectado.

**Q4**: Qual a linguagem principal e versão? *(se não detectada)*

**Q5**: Qual o framework principal? *(se não detectado)*

**Q6**: Sistema de design / biblioteca de componentes?
- shadcn/ui, Radix UI
- Material UI / MUI
- Ant Design
- Tailwind CSS puro
- Outra (especificar)
- Nenhuma

**Q7**: Camada de dados — banco de dados e ORM/ODM? *(ex: PostgreSQL + Prisma, MongoDB + Mongoose, MySQL + TypeORM, SQLite, nenhum)*

**Q8**: Gerenciamento de estado de servidor? *(React Query/TanStack, SWR, Redux Toolkit Query, Zustand, nenhum)*

**Q9**: Autenticação? *(Clerk, NextAuth, Auth.js, JWT próprio, OAuth direto, sem auth)*

---

### Etapa 3 — Grupo: Regras de domínio imutáveis

Apresentar: *"Agora as regras que nunca devem ser violadas neste projeto."*

**Q10**: Há diretórios ou módulos protegidos que nunca devem ser modificados diretamente?
*(ex: `core/`, `shared/`, `infra/`, `vendor/` — responder "não" se não houver)*

**Q11**: Quais são as regras de negócio imutáveis?
*(Exemplos: "dados de usuário nunca deletados fisicamente", "toda transação tem audit log", "preços sempre em centavos". Listar o que se aplicar ou "nenhuma por enquanto".)*

**Q12**: Restrições de segurança críticas?
*(Exemplos: "nenhum segredo commitado", "toda rota autenticada exceto /public", "inputs sempre validados no servidor". Listar ou "padrão geral".)*

**Q13**: Contratos que não podem quebrar?
*(Exemplos: "API v1 nunca quebra backwards compatibility", "schema de DB versionado com migrations". Listar ou "nenhum definido ainda".)*

---

### Etapa 4 — Grupo: Qualidade e fluxo de trabalho

Apresentar: *"Sobre qualidade e processo de desenvolvimento."*

**Q14**: Framework de testes? *(Jest, Vitest, Pytest, Go test, RSpec, nenhum por enquanto)*

**Q15**: Padrão de commits? *(conventional commits em PT, conventional commits em EN, livre, outro)*

**Q16**: Há checklists obrigatórios de PR/code review ou cobertura mínima de testes?
*(Listar ou "não definido ainda")*

**Q17**: Padrões de observabilidade? *(Sentry, Datadog, Prometheus, logs estruturados, nenhum)*

---

### Etapa 5 — Grupo: Convenções de código

*(Pular perguntas se a stack já implica a resposta — ex: Next.js implica PascalCase para componentes)*

**Q18**: Padrão de nomenclatura de arquivos e símbolos?
*(ex: componentes PascalCase, arquivos kebab-case, hooks use*, tipos PascalCase)*

**Q19**: Onde fica a lógica de negócio?
*(hooks, services layer, domain objects, diretamente nos componentes)*

**Q20**: Restrições de uso de `any`, `@ts-ignore` ou equivalentes?
*(proibido, só com justificativa documentada, livre)*

---

### Etapa 6 — Confirmação e geração

Apresentar resumo do que será criado:

```
Vou criar/atualizar:
  ✓ AGENTS.md
  ✓ constitution.md
  ✓ components-registry.md
  ✓ aicontext/README.md
  ✓ aicontext/<modulo1>.md
  ✓ aicontext/<modulo2>.md
  [...]
  
Bridges para AI tools detectados:
  ✓ Claude Code — CLAUDE.md com referência a AGENTS.md
  ✓ [outros detectados]

Confirma? (s/n)
```

---

### Etapa 7 — Geração dos arquivos

Usar as respostas coletadas para preencher os templates de `templates/`:

**`AGENTS.md`** — usar `templates/agents-template.md`:
- Preencher stack, domínio, módulos do aicontext, tipo de projeto
- Listar AI tools detectados na seção de hierarquia

**`constitution.md`** — usar `templates/constitution-template.md`:
- Preencher TODAS as seções com as respostas das etapas 1-5
- Seções sem resposta ficam com placeholder `[a definir]`
- Versão: 1.0.0

**`components-registry.md`** — usar `templates/components-registry-template.md`:
- Tabela vazia com estrutura base
- Seção de tipos de componente do template

**`aicontext/README.md`** — usar `templates/aicontext-index-template.md`:
- Tabela "quando consultar" com cada módulo listado em Q3
- Links para cada `aicontext/<modulo>.md`

**`aicontext/<modulo>.md`** — para cada módulo de Q3:
```markdown
# <Nome do Módulo>

## Features

*(nenhuma documentada ainda — atualizar após cada feature entregue via skill `document-aicontext`)*

## Contratos

*(nenhum documentado ainda)*
```

---

### Etapa 8 — Bridges para AI tools

Para cada AI tool detectado (sem sobrescrever conteúdo existente):

**Claude Code** (`.claude/` presente):
- Se não existe `CLAUDE.md` na raiz do projeto: criar com `@AGENTS.md`
- Se existe: verificar se já tem referência a `AGENTS.md` — se não, informar ao usuário que pode adicionar `@AGENTS.md`

**Codex CLI** (binário `codex` ou `.codex` presente):
- Nenhuma ação — Codex lê `AGENTS.md` na raiz nativamente

**Copilot** (`.github/` presente):
- Verificar `.github/copilot-instructions.md`
- Se não existe: criar com referência a `AGENTS.md`
- Se existe: informar ao usuário que pode adicionar referência manual

**Cursor** (`.cursor/rules/` presente):
- Criar/atualizar `.cursor/rules/agents.mdc` com referência a `AGENTS.md`

**Windsurf** (`.windsurf/rules/` presente):
- Criar/atualizar `.windsurf/rules/agents.md` com referência a `AGENTS.md`

---

## Saída esperada

```
✓ AGENTS.md criado
✓ constitution.md criado
✓ components-registry.md criado
✓ aicontext/README.md criado
✓ aicontext/<modulo>.md criado (N módulos)

Bridges criados:
  ✓ CLAUDE.md → @AGENTS.md
  ✓ [outros]

Próximos passos:
  - Revisar constitution.md e completar seções marcadas [a definir]
  - Adicionar componentes existentes em components-registry.md
  - Alimentar aicontext/ após cada feature entregue (skill document-aicontext)
```

## Regras

- Nunca sobrescrever arquivo existente sem confirmação explícita
- Criar arquivos de módulo em `aicontext/` apenas para módulos citados — sem arquivos genéricos vazios
- Se Q3 não for respondida: criar apenas `aicontext/README.md` sem módulos
- Confirmar resumo antes de gerar qualquer arquivo
