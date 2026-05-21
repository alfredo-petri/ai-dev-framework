# agent-base

Base compartilhada canônica para todos os agents deste framework. Lida por todos os agents antes do arquivo específico de cada um.

## Ordem de precedência

1. `constitution.md`
2. `agents.md`
3. `sub-agents/README.md`
4. Sub-agent canônico aplicável
5. Arquivos de contexto do domínio afetado
6. Agent específico
7. Esta base

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `sub-agents/README.md`
4. Agent específico
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

## Skills disponíveis

Agents podem invocar qualquer skill em `skills/`:
- `skills/read-project-context.md`
- `skills/build-scope-map.md`
- `skills/collect-visual-references.md`
- `skills/build-risk-matrix.md`
- `skills/run-audit-checklist.md`
- `skills/classify-change.md`
- `skills/document-aicontext.md`
- `skills/write-tests.md`

## Tools disponíveis

Agents podem invocar qualquer tool em `tools/`:
- `tools/inspect-files.md`
- `tools/search-codebase.md`
- `tools/run-command.md`
- `tools/emit-structured-output.md`

## Pipeline base de sub-agents

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

Se a ferramenta suporta sub-agents reais, delegue os estágios aos sub-agents correspondentes. Se não, execute a mesma ordem no mesmo fluxo usando cada arquivo de sub-agent canônico como checklist operacional. Não dependa de sintaxe proprietária.
