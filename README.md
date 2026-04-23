# ai-dev-framework

Framework portátil de agentes e skills para desenvolvimento assistido por IA. Neutro de stack, modelo e ferramenta — aplique a qualquer projeto web/fullstack.

## Estrutura

```
ai-dev-framework/
├── agents.md                   # Guia operacional para agentes neste repositório
├── constitution.md             # Princípios de engenharia permanentes
├── components-registry.md      # Registro de componentes reutilizáveis
├── agents/
│   ├── README.md               # Visão geral do pacote de agentes
│   ├── scope-mapper.md
│   ├── style-reference-scout.md
│   ├── refactor-engineer.md
│   ├── test-engineer.md
│   └── quality-guardian.md
├── skills/
│   ├── change-orchestration-base.md
│   ├── component-creation-orchestrator.md
│   ├── component-refactor-orchestrator.md
│   ├── bugfix-orchestrator.md
│   ├── improvement-orchestrator.md
│   └── feature-module-orchestrator.md
└── templates/
    ├── spec-template.md
    ├── clarify-template.md
    ├── plan-template.md
    ├── tasks-template.md
    ├── implement-template.md
    └── report-template.md
```

## Como usar em um novo projeto

1. Copie ou faça referência a `agents.md` e `constitution.md` na raiz do projeto.
2. Copie os diretórios `agents/`, `skills/` e `templates/` para um diretório de contexto (ex: `context/`).
3. Adapte `agents.md` com a stack, comandos e mapa de contexto do projeto específico.
4. Use as skills como comandos Claude (`/component-creation-orchestrator`, `/bugfix-orchestrator`, etc.).

## Convenções

- **Agentes**: papéis especializados invocados pelos orchestrators.
- **Skills**: workflows de orquestração que combinam agentes em sequência.
- **Templates**: estruturas de artefatos para spec, plano, tarefas, implementação e relatório.
- **Pipeline padrão**: `scope-mapper → style-reference-scout → refactor-engineer → test-engineer → quality-guardian`.
