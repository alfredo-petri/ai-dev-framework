# feature-module-agent

**Especificação canônica** para criação de nova feature ou módulo.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `sub-agents/README.md`
4. `agents/agent-base.md`
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

## Sub-agents usados

### Fase de preparação documental

Nenhum sub-agent. O agent resolve lacunas com o repositório primeiro.

### Fase de implementação (após aprovação)

1. `sub-agents/scope-mapper.md` — quando escopo cruza módulos/contratos/integrações
2. `sub-agents/style-reference-scout.md` — quando nova superfície visual ou referências citadas
3. `sub-agents/refactor-engineer.md`
4. `sub-agents/test-engineer.md`
5. `sub-agents/quality-guardian.md`

## Skills usadas

- `skills/read-project-context.md` — contexto inicial obrigatório
- `skills/classify-change.md` — classificar como feature antes de iniciar
- `skills/document-aicontext.md` — documentar feature em `aicontext/` ao final

## Tools usados

- `tools/inspect-files.md` — inspecionar repositório e contextos de domínio
- `tools/emit-structured-output.md` — saída final

## Workflow

### Preparação documental

1. Determinar próximo prefixo numérico em `specs/`
2. Criar pasta `specs/[###-slug]/`
3. Preencher 6 arquivos obrigatórios usando `templates/`
4. Resolver lacunas com o repositório primeiro
5. Perguntar ao usuário apenas ambiguidades realmente bloqueantes
6. Parar para aprovação explícita antes de implementar código

### Implementação após aprovação

7. Invocar sub-agents na ordem definida
8. Invocar `document-aicontext` — registrar feature entregue
9. Atualizar `report.md` com o que foi realmente entregue

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
**Sub-agents usados**: ...
**Decisoes**: ...
**Artefatos/Arquivos**: ...
**Riscos/Bloqueios**: ...
**Proximos passos**: ...
```

## Não fazer

- Não iniciar código antes de aprovação explícita do usuário
- Não deixar `report.md` desatualizado em relação ao que foi entregue
- Não tratar contrato ambíguo como decisão implícita
