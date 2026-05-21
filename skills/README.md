# Skills — Visão Geral

Capabilities compostas e reutilizáveis. Usadas por agents e sub-agents para executar procedimentos específicos. Cada skill encapsula um conjunto de passos bem definido e pode ser invocada por múltiplos agents/sub-agents.

## Skills disponíveis

| Skill | Propósito | Usada por |
|-------|-----------|-----------|
| `read-project-context` | Leitura obrigatória de constitution + agents.md + contexto de domínio | Todos agents e sub-agents |
| `classify-change` | Classifica mudança como feature, fix, improvement ou component | Agents de implementação |
| `build-scope-map` | Mapeia escopo, contratos e ambiguidades | scope-mapper |
| `collect-visual-references` | Coleta referências visuais de componentes existentes | style-reference-scout |
| `build-risk-matrix` | Constrói matriz de risco para cobertura de testes | test-engineer |
| `write-tests` | Escreve testes no framework do projeto | test-engineer |
| `run-audit-checklist` | Checklist bloqueante de auditoria final | quality-guardian |
| `document-aicontext` | Cria/atualiza `aicontext/<modulo>.md` | feature-module-agent e agents de implementação |
| `commit-changes` | Agrupa e executa commits semânticos por funcionalidade | Agents após entrega de mudanças reais |
| `open-github-issue` | Abre issue no GitHub com label correlata antes de implementar | Agents — primeiro passo após classify-change |
| `close-github-issue` | Comenta resumo e fecha a issue ao concluir implementação | Agents — último passo após commit-changes |
| `search-update` | Verifica atualizações disponíveis (uma vez por sessão) | Primeiro uso de qualquer recurso do framework |
| `update` | Atualiza framework para a versão mais recente | Após `search-update` com aprovação do usuário |

## Hierarquia

```
Agent / Sub-agent
  └── invoca Skill
        └── usa Tool (operações atômicas)
```

Skills combinam tools para realizar procedimentos de complexidade intermediária. Não tomam decisões de alto nível — isso é papel dos agents e sub-agents.
