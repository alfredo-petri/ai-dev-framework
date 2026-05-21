# Agents — Visão Geral

Pacote canônico de agents (orchestrators). Neutro de ferramenta e modelo.

Agents têm goals de alto nível e orquestram sub-agents, skills e tools para atingi-los. São o ponto de entrada para qualquer tipo de mudança no projeto.

## Ordem de verdade

1. `constitution.md`
2. `agents.md`
3. `agents/agent-base.md`
4. Arquivo canônico do agent
5. Arquivos de contexto de domínio aplicáveis

## Agents disponíveis

| Agent | Objetivo | Quando usar |
|-------|----------|-------------|
| `bugfix-agent` | Corrigir comportamento incorreto com mudança mínima segura | Bug confirmado com comportamento esperado claro |
| `component-creation-agent` | Criar novo componente preservando padrão visual e arquitetural | Novo componente feature-local ou reutilizável |
| `component-refactor-agent` | Refatorar com componentização, separação lógica-UI e preservação de contratos | Componente com múltiplas responsabilidades ou lógica mista |
| `feature-module-agent` | Criar feature/módulo com disciplina de spec, plano e relatório | Feature nova com escopo e contratos a definir |
| `improvement-agent` | Melhorar componente/feature/módulo sem regressão ou desvio de padrão | Melhoria incremental em código existente |

## Hierarquia de invocação

```
Agent (goal de alto nível)
  ├── invoca Sub-agents (sub-agents/)
  │     └── usam Skills (skills/) e Tools (tools/)
  ├── usa Skills (skills/) diretamente quando aplicável
  └── usa Tools (tools/) diretamente quando aplicável
```

## Pipeline base de sub-agents

```
scope-mapper (condicional)
  ↓
style-reference-scout (condicional)
  ↓
refactor-engineer (obrigatório em código)
  ↓
test-engineer (obrigatório em código)
  ↓
quality-guardian (gate final obrigatório)
```

## Contrato de saída comum

Todos os agents respondem com:

```
**Objetivo**: O que foi feito
**Contexto lido**: Arquivos e documentos consultados
**Sub-agents usados**: Quais sub-agents foram invocados e quais foram pulados e por quê
**Decisoes**: Escolhas técnicas e justificativas
**Artefatos/Arquivos**: Arquivos criados, alterados ou analisados
**Riscos/Bloqueios**: Ambiguidades, dependências faltantes, aprovação necessária
**Proximos passos**: O que o usuário deve fazer
```
