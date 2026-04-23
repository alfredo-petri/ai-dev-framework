# change-orchestration-base

Base compartilhada canônica para skills de criação, feature, melhoria e correção. Lida por todos os orchestrators antes do arquivo específico de cada skill.

## Ordem de precedência

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. Agente canônico aplicável
5. Arquivos de contexto do domínio afetado
6. Skill específica
7. Esta base

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. Skill específica
5. Apenas arquivos de contexto do domínio necessários
6. Arquivos citados pelo usuário

## Regra principal de interação

Não faça confirmações desnecessárias. Pergunte apenas quando:

- Ambiguidade real em escopo/contrato/arquitetura
- Conflito entre código/docs/comportamento esperado
- Risco de alterar contrato público sem aprovação
- Necessidade de nova dependência
- Infraestrutura de testes ausente que ampliaria o escopo
- Múltiplos padrões visuais plausíveis sem critério local

Se o repositório pode responder, não pergunte.

## Regras transversais

- Trabalhe com escopo conservador
- Preserve comportamento, contratos e padrões locais
- Não reverta decisões existentes sem necessidade objetiva
- Não invente edge case, requisito ou validação não executada
- Toda lógica não trivial fora da interface
- Toda mudança relevante termina com testes e auditoria final
- Toda mudança de componente/feature evita regressão, side effect ou alteração silenciosa de contrato

## Regras de testes

- Use o framework de testes configurado no projeto
- Cubra o que mudou com combinação mínima suficiente de testes
- Valide comportamento, não trivialidade de implementação
- Pare e pergunte antes de criar ou trocar infraestrutura de testes

## Regras de auditoria final

Aplique quality-guardian como gate bloqueante. Verifique no mínimo:
- Regressão funcional
- Edge cases relevantes
- Side effects
- Preservação de contratos
- Aderência ao `agents.md`
- Aderência à `constitution.md`
- Aderência ao padrão do módulo local

## Uso de agentes

Pipeline base:

1. `scope-mapper` — quando escopo difuso, cruzando módulos ou contratos
2. `style-reference-scout` — quando nova UI ou referências visuais citadas
3. `refactor-engineer` — para implementar/estruturar a mudança
4. `test-engineer` — para cobertura proporcional ao risco
5. `quality-guardian` — como gate final

Regras:
- `refactor-engineer`, `test-engineer`, `quality-guardian` são obrigatórios em mudanças reais de código
- `scope-mapper` é condicional
- `style-reference-scout` é condicional, não substitui leitura de código real

## Regra para diferentes ferramentas

Se a ferramenta suporta subagentes reais, delegue os estágios aos agentes correspondentes. Se não, execute a mesma ordem no mesmo fluxo usando cada arquivo de agente canônico como checklist operacional. Não dependa de sintaxe proprietária.
