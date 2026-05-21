# Tools — Visão Geral

Operações atômicas do framework. Base de toda execução — skills e agents constroem sobre tools.

Tools não tomam decisões. Executam operações específicas e retornam resultado.

## Tools disponíveis

| Tool | Propósito | Usada por |
|------|-----------|-----------|
| `inspect-files` | Leitura sistemática de arquivos e estrutura de diretórios | Todos agents, sub-agents e skills |
| `search-codebase` | Busca de símbolos, padrões e referências no codebase | scope-mapper, refactor-engineer, agents |
| `run-command` | Execução de comandos de terminal e interpretação de saída | test-engineer, agents de validação |
| `emit-structured-output` | Formatação do output canônico do framework | Todos agents e sub-agents |

## Hierarquia

```
Agent / Sub-agent
  └── invoca Skill
        └── usa Tool     ← nível mais atômico

Agent / Sub-agent
  └── usa Tool diretamente (quando não precisa de skill)
```

Tools são os únicos componentes que interagem diretamente com o sistema de arquivos, terminal e saída. Tudo acima deles é raciocínio e orquestração.
