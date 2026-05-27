# Agents Guide

Este arquivo define como agents de IA devem atuar neste repositório. Ele deve ser mantido curto, explícito e atualizado.

## Hierarquia do framework

```
Agent (orchestrator — goal de alto nível)
  ├── invoca Sub-agents (sub-agents/)
  │     └── usam Skills (skills/) e Tools (tools/)
  ├── usa Skills (skills/) diretamente quando aplicável
  └── usa Tools (tools/) diretamente quando aplicável
```

- **Agents**: orchestrators com goal de alto nível. Decidem quais sub-agents, skills e tools invocar.
- **Sub-agents**: especialistas com missão única. Usam skills e tools para executar seu trabalho.
- **Skills**: capabilities compostas e reutilizáveis. Encapsulam procedimentos específicos.
- **Tools**: operações atômicas. Interagem com sistema de arquivos, terminal e saída.

## Ordem de precedência

1. [constitution.md](./constitution.md)
2. Este `agents.md`
3. Arquivos de contexto de domínio aplicáveis à área alterada
4. `README.md` e arquivos de configuração do projeto para comandos e setup reais

Se houver conflito relevante entre documentação, código e requisitos, pare e questione. Não preencha lacunas com suposições silenciosas.

## Regras operacionais

- Leia a [constituição](./constitution.md) antes de trabalho relevante — use a skill `read-project-context`
- Identifique o domínio afetado e abra apenas os contextos necessários
- Inspecione código, contratos e fluxos existentes antes de propor mudanças — use `inspect-files` e `search-codebase`
- Para features grandes, APIs e integrações, siga o fluxo `constitution → specification → planning → tasks → implementation`
- Não faça mudanças silenciosas de contrato, payload, validação, erro ou comportamento documentado
- Se houver qualquer dúvida ou ambiguidade de regra, arquitetura, contrato ou dados, questione o usuário antes de implementar
- Mantenha documentação e contexto alinhados com o que foi realmente entregue

## Stack e direção

Consulte o `README.md` e os arquivos de configuração do projeto para identificar a stack real em uso. Antes de introduzir qualquer tecnologia ou padrão, verifique o que já existe no repositório.

Direção obrigatória para novas mudanças:

- Use o sistema de design já adotado pelo projeto
- Todo novo componente e toda refatoração de componente existente deve seguir o padrão de UI do projeto
- Sempre separe lógica de interface
- Lógica de negócio, transformações, regras e estado não trivial devem ficar em hooks, services ou funções auxiliares
- Componentes devem focar em renderização e orquestração simples
- Use tipagem explícita. `any` e equivalentes só com justificativa documentada
- Novas dependências só com justificativa técnica clara

## Testes

- Sempre crie testes com o framework de testes do projeto para novo código relevante — use a skill `write-tests`
- Regras de negócio pedem teste automatizado
- Comportamento visível de UI pede teste de componente
- APIs e fluxos com persistência pedem teste de integração quando aplicável
- Não omita testes só porque a base atual ainda não está pronta. Ajuste a infraestrutura necessária ou questione o usuário se isso ampliar materialmente o escopo
- Não afirme validações ou execuções que não aconteceram de fato

## Componentes

- Siga a arquitetura orientada a componentes da [constituição](./constitution.md)
- Evite lógica de negócio dentro de componentes de UI
- Prefira organização por feature com `components/`, `hooks/`, `types/` e `services/`
- Componentes reutilizáveis entre features devem viver em `components/`
- Todo novo componente criado deve ser registrado em [components-registry.md](./components-registry.md) no mesmo change set

## Mapa de contexto

Abra apenas os arquivos de contexto necessários ao domínio alterado. Prefira contextos específicos do domínio ao contexto geral quando ambos existirem.

Identifique no projeto os arquivos de contexto disponíveis para:
- Visão geral e workflow de desenvolvimento
- Domínios funcionais específicos (ex: autenticação, notificações, integrações)
- Padrões de IA e agents
- Integrações externas

## Entrega e manutenção

- Atualize documentação e contexto afetados quando comportamento, fluxo ou contrato mudarem
- Atualize este `agents.md` imediatamente se comandos de build, workflow ou regras operacionais mudarem
- Prefira linkar documentação já existente em vez de duplicar texto longo
- Se a mudança introduzir novo padrão reutilizável, reflita isso na documentação apropriada do repositório

## Release flow — obrigatório

Sempre que houver mudança que justifique nova versão npm:

1. Bumpar versão em `package.json`: `npm version patch|minor|major`
2. Adicionar entrada `## vX.Y.Z` no `CHANGELOG.md`
3. Commitar: `git add package.json CHANGELOG.md && git commit -m "chore(release): vX.Y.Z"`
4. Push — a Action `npm-publish` publica automaticamente

Nunca rodar `npm publish` manualmente. A Action bloqueia se `CHANGELOG.md` não tiver entrada para a versão atual.

| Mudança | Versão | README | CHANGELOG |
|---------|--------|--------|-----------|
| Nova skill / agent / sub-agent | `minor` | sim — seção + contador slash commands | sim |
| Novo comando CLI | `minor` | sim — tabela de comandos | sim |
| Nova IDE | `minor` | sim — tabela IDE plugins | sim |
| Bug fix | `patch` | só se visível ao usuário | sim |
| Docs | `patch` | sim | sim |
| CI / Actions | `patch` | sim — seção CI | sim |

Após adicionar item em `SKILL_WRAPPERS` (`bin/cli.js`): atualizar contagem de slash commands no README (2 lugares) e no CHANGELOG.
