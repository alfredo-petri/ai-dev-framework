# ai-dev-framework

Framework portátil de agents, sub-agents, skills e tools para desenvolvimento assistido por IA. Neutro de stack, modelo e ferramenta — aplique a qualquer projeto web/fullstack.

## Estrutura

```
ai-dev-framework/
├── agents.md                        # Guia operacional para agents neste repositório
├── constitution.md                  # Princípios de engenharia permanentes
├── components-registry.md           # Registro de componentes reutilizáveis
├── agents/
│   ├── README.md                    # Visão geral dos agents (orchestrators)
│   ├── agent-base.md                # Base compartilhada para todos os agents
│   ├── bugfix-agent.md
│   ├── component-creation-agent.md
│   ├── component-refactor-agent.md
│   ├── feature-module-agent.md
│   └── improvement-agent.md
├── sub-agents/
│   ├── README.md                    # Visão geral dos sub-agents (especialistas)
│   ├── scope-mapper.md
│   ├── style-reference-scout.md
│   ├── refactor-engineer.md
│   ├── test-engineer.md
│   └── quality-guardian.md
├── skills/
│   ├── README.md                    # Visão geral das skills (capabilities compostas)
│   ├── read-project-context.md
│   ├── classify-change.md
│   ├── build-scope-map.md
│   ├── collect-visual-references.md
│   ├── build-risk-matrix.md
│   ├── write-tests.md
│   ├── run-audit-checklist.md
│   └── document-aicontext.md
├── tools/
│   ├── README.md                    # Visão geral das tools (operações atômicas)
│   ├── inspect-files.md
│   ├── search-codebase.md
│   ├── run-command.md
│   └── emit-structured-output.md
└── templates/
    ├── spec-template.md
    ├── clarify-template.md
    ├── plan-template.md
    ├── tasks-template.md
    ├── implement-template.md
    └── report-template.md
```

## Hierarquia

```
Agent (goal de alto nível)
  ├── invoca Sub-agents   → especialistas com missão única
  │     └── usam Skills  → capabilities compostas
  │           └── usam Tools → operações atômicas
  ├── usa Skills diretamente quando aplicável
  └── usa Tools diretamente quando aplicável
```

## Instalação global (recomendado)

Instala o framework em `~/.ai-dev-framework/` e injeta referência nos AI agents CLI instalados.

```bash
npm install -g ai-dev-framework
ai-dev-framework install
ai-dev-framework link --all
```

### Agents suportados

| Comando | Agent |
|---------|-------|
| `link claude` | Claude Code (`~/.claude/CLAUDE.md`) |
| `link codex` | OpenAI Codex CLI (`~/.codex/instructions.md`) |
| `link copilot` | GitHub Copilot CLI |
| `link gemini` | Gemini CLI (`~/.gemini/GEMINI.md`) |
| `link --all` | Todos os detectados automaticamente |

### Outros comandos

```bash
ai-dev-framework status       # estado da instalação e agents detectados
ai-dev-framework uninstall    # remover ~/.ai-dev-framework/
```

## Como usar em um projeto específico

1. Copie ou faça referência a `agents.md` e `constitution.md` na raiz do projeto.
2. Copie os diretórios `agents/`, `sub-agents/`, `skills/`, `tools/` e `templates/` para um diretório de contexto (ex: `context/`).
3. Adapte `agents.md` com a stack, comandos e mapa de contexto do projeto específico.
4. Use os agents como ponto de entrada (`bugfix-agent`, `feature-module-agent`, etc.).

## Convenções

- **Agents**: orchestrators com goal de alto nível. Invocam sub-agents, skills e tools.
- **Sub-agents**: especialistas com missão única, invocados pelos agents.
- **Skills**: capabilities compostas e reutilizáveis, usadas por agents e sub-agents.
- **Tools**: operações atômicas — leitura, busca, execução e output.
- **Templates**: estruturas de artefatos para spec, plano, tarefas, implementação e relatório.

## Pipeline padrão

```
Agent (ex: bugfix-agent)
  └── scope-mapper (condicional)
        └── skills: read-project-context, build-scope-map
        └── tools: inspect-files, search-codebase, emit-structured-output
  └── style-reference-scout (condicional)
        └── skills: read-project-context, collect-visual-references
        └── tools: inspect-files, emit-structured-output
  └── refactor-engineer
        └── skills: read-project-context
        └── tools: inspect-files, search-codebase, emit-structured-output
  └── test-engineer
        └── skills: read-project-context, build-risk-matrix, write-tests
        └── tools: run-command, emit-structured-output
  └── quality-guardian (gate final)
        └── skills: read-project-context, run-audit-checklist
        └── tools: inspect-files, emit-structured-output
```
