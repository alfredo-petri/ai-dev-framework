# feature-module-orchestrator

**Especificação canônica** para criação de nova feature ou módulo.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. `skills/change-orchestration-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários
8. Templates em `templates/`

## Objetivo

Criar nova feature ou módulo com disciplina de especificação, planejamento, implementação controlada e relatório final, evitando regressão, edge case ou side effect.

## Artefatos obrigatórios

Sempre criar pasta `specs/[###-slug]/` com:
- `spec.md`
- `clarify.md`
- `plan.md`
- `implement.md`
- `tasks.md`
- `report.md`

## Lógica de orquestração

### Preparação documental

1. Determinar próximo prefixo numérico em `specs/`
2. Criar pasta `specs/[###-slug]/`
3. Preencher 6 arquivos obrigatórios usando `templates/`
4. Resolver lacunas com o repositório primeiro
5. Perguntar ao usuário apenas ambiguidades realmente bloqueantes
6. Parar para aprovação explícita antes de implementar código

### Implementação após aprovação

**Agentes**:
1. `scope-mapper` — quando escopo cruza módulos/contratos/integrações
2. `style-reference-scout` — quando nova superfície visual ou referências citadas
3. `refactor-engineer`
4. `test-engineer`
5. `quality-guardian`

## Regras obrigatórias

- `clarify.md` é log de perguntas resolvidas e decisões
- `implement.md` é guia de execução
- `report.md` é o que foi realmente entregue
- `tasks.md` nasce do plano aprovado com caminhos reais
- Toda implementação fica alinhada ao `spec.md` e `plan.md`
- Novos componentes ou refatorados com potencial de reuso registrados em `components-registry.md`

## Perguntar ao usuário apenas quando

- Ambiguidade em requisito/contrato/permissão/UX que mude o escopo
- Conflito entre código/contexto/requisição
- Nova dependência realmente necessária
- Infraestrutura de testes ausente ampliando escopo
- Repositório não indica claramente padrão visual a seguir

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

- Não iniciar código antes de aprovação explícita do usuário
- Não deixar `report.md` desatualizado em relação ao que foi entregue
- Não tratar contrato ambíguo como decisão implícita
