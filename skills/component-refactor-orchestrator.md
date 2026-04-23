# component-refactor-orchestrator

**Especificação canônica** para orquestração de refatorações com foco em componentização, separação lógica-UI, preservação de contratos, cobertura de testes e auditoria final.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. Apenas arquivos de contexto do domínio necessários

Use os arquivos em `agents/` como fonte canônica:
- `agents/scope-mapper.md`
- `agents/refactor-engineer.md`
- `agents/test-engineer.md`
- `agents/quality-guardian.md`

**Precedência em conflito:**
1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. Agente canônico aplicável
5. Contexto de domínio
6. Esta especificação

## Objetivo

Executar refatoração guiada por regras — decidindo quais agentes usar, em que ordem e quando bloquear para perguntas ao usuário.

**Meta padrão:**
- Melhorar estrutura e legibilidade
- Componentizar por sinais claros
- Mover lógica não trivial para hooks/services/utils/funções auxiliares
- Preservar comportamento e contratos
- Criar cobertura de testes coerente com o risco
- Auditar regressão, side effects, edge cases e aderência às regras

## Regra de interação com usuário

Não interrompa o fluxo para confirmações desnecessárias. Pergunte apenas quando:
- Ambiguidade de escopo
- Conflito entre código/docs/comportamento esperado
- Risco de alterar contrato público sem aprovação
- Necessidade de nova dependência
- Necessidade de configurar infraestrutura de testes ausente
- Dúvida real sobre local vs. reutilizável em `components/`

Se o repositório responde, não pergunte.

## Lógica de orquestração

### 1. Avaliar escopo

Descobrir: qual feature/módulo/fluxo está em escopo, quais arquivos parecem afetados, quais contratos não podem quebrar, se há mistura de UI/estado/regras/side effects/integrações.

### 2. Decidir quais agentes usar

**Use scope-mapper quando**: Escopo difuso, mudança cruza módulos, risco de tocar UI e API simultaneamente, contrato sensível, alta chance de side effects fora do arquivo principal.

**Use refactor-engineer** em toda refatoração real de código.

**Use test-engineer** em toda mudança relevante de código.

**Use quality-guardian** ao final de toda refatoração real.

### 3. Ordem padrão

1. `scope-mapper` (quando necessário)
2. `refactor-engineer`
3. `test-engineer`
4. `quality-guardian`

Pule scope-mapper se escopo claro e localizado.

## Regras de refatoração

- Escopo conservador: refatore apenas o que está no caminho da mudança
- Componentize por sinais claros: repetição real, JSX extenso, múltiplas responsabilidades, estado não trivial, lógica de negócio na interface, potencial de reuso concreto ou provável
- Mantenha estrutura atual da feature quando não for bloqueante
- Componentes reutilizáveis entre módulos → `components/`
- Use o sistema de design do projeto em novos componentes e componentes refatorados
- Registre componentes novos/refatorados com potencial de reuso em `components-registry.md`

## Regras de testes

- Use o framework de testes do projeto
- Trabalhe por matriz de risco
- Prefira testes próximos à feature ou código testado
- Cubra o que mudou com combinação mínima suficiente de: unit, componente, integração

Se infraestrutura de testes não existir, pare e pergunte antes de configurar qualquer coisa.

## Regras de auditoria final

Aplique quality-guardian como gate bloqueante. Verifique no mínimo:
- Regressão funcional
- Edge cases
- Side effects
- Preservação de contratos
- Aderência ao `agents.md`
- Aderência à `constitution.md`
- Separação lógica-UI
- Cobertura de testes coerente com o risco

Se houver problema relevante, trate a tarefa como incompleta.

## Workflow detalhado

1. Ler contexto obrigatório, inspecionar código real
2. Decidir se scope-mapper é necessário
3. Delimitar escopo, contratos, riscos
4. Refatorar com refactor-engineer
5. Identificar componentes, hooks, services, utilitários criados/movidos/extraídos
6. Atualizar `components-registry.md` para novos/refatorados com potencial de reuso
7. Criar testes com test-engineer
8. Executar validações relevantes
9. Auditar com quality-guardian
10. Entregar resultado final com bloqueios, se houver

## Formato de saída esperado

```
**Objetivo**: ...
**Contexto lido**: ...
**Agentes usados**: Quais agentes foram usados, quais foram pulados e por quê
**Decisoes**: ...
**Artefatos/Arquivos**: ...
**Riscos/Bloqueios**: ...
**Proximos passos**: ...
```

## Padrões de decisão rápida

**Caso A**: Componente único, escopo claro → `refactor-engineer → test-engineer → quality-guardian`

**Caso B**: Feature com escopo difuso/cruzando módulos → `scope-mapper → refactor-engineer → test-engineer → quality-guardian`

**Caso C**: Infraestrutura ausente → Execute pipeline até encontrar bloqueador, então: pare, explique objetivamente, pergunte apenas o necessário

## Não fazer

- Não inventar requisito, comportamento ou cobertura não executados
- Não fazer refatoração ampla sem necessidade concreta
- Não alterar contratos silenciosamente
- Não pular testes obrigatórios
- Não afirmar validações não executadas
- Não perguntar ao usuário algo que o repositório pode responder
