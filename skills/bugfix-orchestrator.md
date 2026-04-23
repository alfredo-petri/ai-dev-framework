# bugfix-orchestrator

**Especificação canônica** para correção de comportamento incorreto.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. `skills/change-orchestration-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários

## Objetivo

Corrigir comportamento incorreto com a menor mudança segura possível, sem regressão, novo edge case ou side effect indesejado.

## Lógica de orquestração

**Agentes**:
1. `scope-mapper` — quando origem do bug é difusa ou cruza módulos
2. `refactor-engineer`
3. `test-engineer`
4. `quality-guardian`

Não use `style-reference-scout` por padrão.

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
**Agentes usados**: ...
**Decisoes**: ...
**Artefatos/Arquivos**: ...
**Riscos/Bloqueios**: ...
**Proximos passos**: ...
```

## Não fazer

- Não aplicar refatoração ampla sem necessidade concreta de correção
- Não mascarar problema com workaround criando contrato ambíguo
- Não pular testes ou gate final
