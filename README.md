# ai-dev-framework

Framework portátil de agents, sub-agents, skills e tools para desenvolvimento assistido por IA. Neutro de stack, modelo e ferramenta — aplique a qualquer projeto web/fullstack com qualquer AI agent CLI.

## Instalação global

```bash
npm install -g @alfredo-petri/ai-dev-framework
ai-dev-framework install
ai-dev-framework link --all
```

Instala o framework em `~/.ai-dev-framework/` e injeta referência automática nos AI agents CLI detectados.

### AI agents suportados

| Comando | Agent | Config injetada |
|---------|-------|-----------------|
| `link claude` | Claude Code | `~/.claude/CLAUDE.md` |
| `link codex` | OpenAI Codex CLI | `~/.codex/instructions.md` |
| `link copilot` | GitHub Copilot CLI | `~/.config/gh-copilot/instructions.md` |
| `link gemini` | Gemini CLI | `~/.gemini/GEMINI.md` |
| `link --all` | Todos os detectados | — |

### Comandos disponíveis

```bash
ai-dev-framework install       # instala framework em ~/.ai-dev-framework/
ai-dev-framework link --all    # linka a todos os agents detectados
ai-dev-framework link claude   # linka apenas ao Claude Code
ai-dev-framework status        # mostra estado da instalação e agents detectados
ai-dev-framework uninstall     # remove ~/.ai-dev-framework/
```

---

## Uso com AI agents CLI

Após `install` + `link`, o agent lê automaticamente o framework no contexto global. Referencie os artefatos diretamente nas suas instruções:

### Claude Code

```bash
# O framework já está no contexto via ~/.claude/CLAUDE.md
# Use os agents diretamente:
claude "use o bugfix-agent para corrigir o bug de timeout no módulo de pagamentos"
claude "use o feature-module-agent para criar o módulo de notificações"
```

### OpenAI Codex CLI

```bash
codex "use refactor-engineer em src/auth/login.ts — separar lógica de validação do componente"
```

### Referência direta a arquivos do framework

```bash
# Passar o agent como contexto explícito
claude --context ~/.ai-dev-framework/agents/bugfix-agent.md "corrigir o bug X"

# Usar constitution como instrução de sistema
claude --system ~/.ai-dev-framework/constitution.md "implementar feature Y"
```

---

## Exemplos de uso

### Corrigir um bug

```
use o bugfix-agent para corrigir o comportamento incorreto no cálculo de datas
```

O agent irá:
1. Confirmar comportamento atual vs. esperado
2. Invocar `scope-mapper` se a origem for difusa
3. Corrigir no menor ponto viável via `refactor-engineer`
4. Criar teste de regressão via `test-engineer`
5. Auditar via `quality-guardian` antes de entregar

### Criar nova feature

```
use o feature-module-agent para criar o módulo de autenticação via OAuth
```

O agent irá:
1. Criar `specs/001-oauth-auth/` com spec, clarify, plan, tasks, implement, report
2. Aguardar aprovação explícita antes de escrever código
3. Executar pipeline completo: scope-mapper → style-reference-scout → refactor-engineer → test-engineer → quality-guardian

### Refatorar componente

```
use o component-refactor-agent em src/components/UserDashboard.tsx
```

### Criar novo componente

```
use o component-creation-agent para criar um componente de DataTable reutilizável
```

### Melhorar código existente

```
use o improvement-agent para melhorar a performance do módulo de relatórios
```

---

## Hierarquia

```
Agent (orchestrator — goal de alto nível)
  ├── invoca Sub-agents  →  especialistas com missão única
  │     └── usam Skills  →  capabilities compostas e reutilizáveis
  │           └── usam Tools  →  operações atômicas
  ├── usa Skills diretamente quando aplicável
  └── usa Tools diretamente quando aplicável
```

## Estrutura

```
ai-dev-framework/
├── agents.md                        # Guia operacional e regras
├── constitution.md                  # Princípios de engenharia permanentes
├── components-registry.md           # Registro de componentes reutilizáveis
├── agents/                          # Orchestrators (goal de alto nível)
│   ├── agent-base.md
│   ├── bugfix-agent.md
│   ├── component-creation-agent.md
│   ├── component-refactor-agent.md
│   ├── feature-module-agent.md
│   └── improvement-agent.md
├── sub-agents/                      # Especialistas (missão única)
│   ├── scope-mapper.md
│   ├── style-reference-scout.md
│   ├── refactor-engineer.md
│   ├── test-engineer.md
│   └── quality-guardian.md
├── skills/                          # Capabilities compostas e reutilizáveis
│   ├── read-project-context.md
│   ├── classify-change.md
│   ├── build-scope-map.md
│   ├── collect-visual-references.md
│   ├── build-risk-matrix.md
│   ├── write-tests.md
│   ├── run-audit-checklist.md
│   ├── document-aicontext.md
│   └── commit-changes.md
└── tools/                           # Operações atômicas
    ├── inspect-files.md
    ├── search-codebase.md
    ├── run-command.md
    └── emit-structured-output.md
```

## Convenções

- **Agents**: orchestrators — decidem quais sub-agents, skills e tools invocar
- **Sub-agents**: especialistas — executam escopo restrito com input/output definido
- **Skills**: capabilities compostas — encapsulam procedimentos reutilizáveis
- **Tools**: operações atômicas — leitura, busca, execução, output
- **Templates**: artefatos de spec, plano, tarefas, implementação e relatório

## Pipeline padrão

```
Agent
  └── scope-mapper (condicional)
  └── style-reference-scout (condicional)
  └── refactor-engineer
  └── test-engineer
  └── quality-guardian  ← gate final bloqueante
```

## Como usar em um projeto específico (sem instalação global)

```bash
npm install github:alfredo-petri/ai-dev-framework
```

Ou copie manualmente `agents/`, `sub-agents/`, `skills/`, `tools/`, `templates/`, `constitution.md` e `agents.md` para um diretório `context/` no projeto e adapte `agents.md` com a stack local.
