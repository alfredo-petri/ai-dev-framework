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

## Padrão Interface/Adapter (obrigatório)

Todo componente, serviço, integração ou funcionalidade nova DEVE seguir o padrão interface/adapter:

1. **Defina o contrato primeiro** — interface ou classe base abstrata antes de qualquer implementação concreta
2. **Implemente como adapter** — toda implementação concreta é um adapter que satisfaz o contrato
3. **Consuma pelo contrato** — código consumidor referencia a interface, nunca a implementação direta

Exemplos obrigatórios:
- Conexão com banco → `IDatabaseConnection` interface + `PostgresAdapter`, `MongoAdapter`
- Componente base → `BaseComponent` abstrato + implementações concretas por variante
- Serviço externo → `IPaymentGateway` interface + `StripeAdapter`, `PaypalAdapter`
- Repositório de dados → `IUserRepository` interface + `PrismaUserRepository`, `InMemoryUserRepository`

Quando adaptar código existente:
- Extraia a interface do contrato atual antes de refatorar
- Nunca quebre consumidores existentes sem aprovação explícita
- Registre novos contratos em `aicontext/<modulo>.md`

Exceção: lógica trivial local sem integração ou extensão prevista — documentar decisão em `clarify.md`.

## Skills disponíveis

Agents podem invocar qualquer skill em `skills/`:
- `skills/read-project-context.md`
- `skills/classify-change.md`
- `skills/build-scope-map.md`
- `skills/collect-visual-references.md`
- `skills/build-risk-matrix.md`
- `skills/run-audit-checklist.md`
- `skills/document-aicontext.md`
- `skills/write-tests.md`
- `skills/commit-changes.md`
- `skills/open-github-issue.md`
- `skills/close-github-issue.md`

## Tools disponíveis

Agents podem invocar qualquer tool em `tools/`:
- `tools/inspect-files.md`
- `tools/search-codebase.md`
- `tools/run-command.md`
- `tools/emit-structured-output.md`

## Pipeline base de sub-agents

```
1. read-project-context    (skill — obrigatória)
2. classify-change         (skill — obrigatória)
3. open-github-issue       (skill — obrigatória se repositório GitHub disponível)
4. scope-mapper            (sub-agent — condicional: escopo difuso ou cruzando módulos)
5. style-reference-scout   (sub-agent — condicional: nova UI ou referências visuais citadas)
6. refactor-engineer       (sub-agent — obrigatório em mudanças reais de código)
7. test-engineer           (sub-agent — obrigatório em mudanças reais de código)
8. quality-guardian        (sub-agent — gate final bloqueante)
9. commit-changes          (skill — após quality-guardian passar)
10. close-github-issue     (skill — último passo: comenta e fecha issue)
```

Regras:
- `refactor-engineer`, `test-engineer`, `quality-guardian` são obrigatórios em mudanças reais de código
- `scope-mapper` é condicional
- `style-reference-scout` é condicional, não substitui leitura de código real
- `open-github-issue` e `close-github-issue` são obrigatórias quando há repositório GitHub — pular apenas se `gh` CLI ausente ou usuário dispensar

## Regra para diferentes ferramentas

Se a ferramenta suporta sub-agents reais, delegue os estágios aos sub-agents correspondentes. Se não, execute a mesma ordem no mesmo fluxo usando cada arquivo de sub-agent canônico como checklist operacional. Não dependa de sintaxe proprietária.
