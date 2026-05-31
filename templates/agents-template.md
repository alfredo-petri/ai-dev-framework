# AGENTS.md — [Nome do Projeto]

## Hierarquia

```
Agent (orchestrator)
  ├── Sub-agents (especialistas)
  │     └── Skills + Tools
  └── Skills (diretamente quando aplicável)
```

- **Agents**: orchestrators com goal de alto nível
- **Sub-agents**: especialistas com missão única
- **Skills**: procedures reutilizáveis
- **Tools**: operações atômicas

## Ordem de precedência

1. `constitution.md` — prevalece sobre tudo
2. Este `AGENTS.md`
3. Arquivos de contexto de domínio (`aicontext/<modulo>.md`)
4. `README.md` e configurações do projeto

## Regras operacionais

- Ler `constitution.md` antes de qualquer trabalho relevante
- Identificar domínio afetado e ler `aicontext/<modulo>.md` correspondente
- Inspecionar código existente antes de propor mudanças
- Não fazer mudanças silenciosas de contrato, payload ou comportamento documentado
- Questionar antes de preencher lacunas com suposições

## Stack e domínio

**Tipo de projeto**: [tipo]
**Finalidade**: [finalidade em 1-2 frases]
**Público-alvo**: [público]

**Stack**:
- Linguagem: [linguagem + versão]
- Framework: [framework]
- UI/Design: [sistema de design]
- Dados: [banco + ORM/ODM]
- Auth: [método]
- Testes: [framework]

## Contexto de domínio

Arquivos de contexto em `aicontext/`:

| Módulo | Arquivo | Consultar quando... |
|---|---|---|
| [módulo] | `aicontext/[modulo].md` | [situação] |

## Componentes reutilizáveis

Registrados em `components-registry.md`. Consultar antes de criar novos componentes.

## Testes

- Toda nova funcionalidade tem testes
- Fixes visíveis ao usuário têm teste de regressão
- Framework: [framework]

## Commits

[padrão de commits do projeto]

## Se houver conflito

Parar e questionar. Não preencher lacunas com suposições silenciosas.
