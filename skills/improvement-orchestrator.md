# improvement-orchestrator

**Especificação canônica** para melhorias em componente, feature ou módulo existente.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. `skills/change-orchestration-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários

## Objetivo

Melhorar componente, feature ou módulo existente sem desviar do padrão predefinido, sem regressão funcional ou side effects indesejados.

## Lógica de orquestração

**Agentes**:
1. `scope-mapper` — quando escopo difuso ou cruzando contratos
2. `refactor-engineer`
3. `test-engineer`
4. `quality-guardian`

Não use `style-reference-scout` por padrão.

## Regras obrigatórias

- Considere `agents.md`, `constitution.md` e arquivos citados pelo usuário sempre
- Preserve contrato, organização e padrão arquitetural da seção afetada
- Inspecione arquivos adjacentes com foco apenas no que reduz risco real
- Crie testes proporcionais à mudança
- Audite sempre ao final

## Perguntar ao usuário apenas quando

- Conflito entre melhoria desejada e comportamento atual esperado
- Risco de alterar contrato público
- Melhoria exige nova dependência
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

- Não usar melhoria como pretexto para refatoração ampla
- Não reverter padrão local sem necessidade objetiva
- Não pular testes ou gate final
