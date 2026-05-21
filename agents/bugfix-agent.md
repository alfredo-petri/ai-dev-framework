# bugfix-agent

**Especificação canônica** para correção de comportamento incorreto.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `sub-agents/README.md`
4. `agents/agent-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários

## Objetivo

Corrigir comportamento incorreto com a menor mudança segura possível, sem regressão, novo edge case ou side effect indesejado.

## Sub-agents usados

1. `sub-agents/scope-mapper.md` — quando origem do bug é difusa ou cruza módulos
2. `sub-agents/refactor-engineer.md`
3. `sub-agents/test-engineer.md`
4. `sub-agents/quality-guardian.md`

Não use `style-reference-scout` por padrão.

## Skills usadas

- `skills/read-project-context.md` — contexto inicial obrigatório
- `skills/classify-change.md` — classificar como fix antes de iniciar

## Tools usados

- `tools/inspect-files.md` — inspecionar código e comportamento atual
- `tools/search-codebase.md` — localizar origem do bug
- `tools/emit-structured-output.md` — saída final

## Regras obrigatórias

- Confirme comportamento atual e esperado antes de alterar código
- Preserve padrão arquitetural e visual existente
- Corrija no menor ponto viável sem esconder causa estrutural relevante
- Crie testes reproduzindo e prevenindo regressão
- Audite a mudança ao final

## Perguntar ao usuário apenas quando

- Comportamento esperado não está claro no código/docs
- Conflito entre relato do bug e implementação atual
- Correção exige nova dependência
- Infraestrutura de testes ausente amplia escopo

## Formato de saída esperado

```
**Objetivo**: ...
**Contexto lido**: ...
**Sub-agents usados**: ...
**Decisoes**: ...
**Artefatos/Arquivos**: ...
**Riscos/Bloqueios**: ...
**Proximos passos**: ...
```

## Não fazer

- Não aplicar refatoração ampla sem necessidade concreta de correção
- Não mascarar problema com workaround criando contrato ambíguo
- Não pular testes ou gate final
