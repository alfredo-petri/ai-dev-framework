# run-audit-checklist

**Skill**: Checklist bloqueante de auditoria final para toda mudança real de código.

## Quando usar

Invocada pelo sub-agent `quality-guardian` após receber handoff do `test-engineer`. Gate final obrigatório.

## Procedimento

1. Ler diff/branch e handoffs anteriores (refactor-engineer + test-engineer)
2. Validar o que realmente mudou vs. o que deveria mudar
3. Verificar cada item do checklist:

### Checklist de auditoria

**Regressão funcional**
- O comportamento anterior foi preservado?
- Algum fluxo crítico pode estar quebrado?

**Edge cases e side effects**
- Edge cases relevantes foram tratados?
- Há side effects não intencionais introduzidos?

**Contratos**
- Contratos públicos foram preservados?
- Alterações de contrato foram aprovadas explicitamente?

**Separação lógica-UI**
- Lógica não trivial ficou fora dos componentes de UI?
- Componentes focam em renderização e orquestração simples?

**Sistema de design**
- Novos componentes/refatorações usam o sistema de design do projeto?

**Cobertura de testes**
- Cobertura é coerente com o risco da mudança?
- Testes obrigatórios para mudanças relevantes foram criados?

**Aderência às regras**
- Mudança adere ao `agents.md`?
- Mudança adere à `constitution.md`?
- Padrão local do módulo foi preservado?

4. Para cada achado relevante, documentar: severidade, regra violada, evidência, impacto
5. Emitir veredicto: `aprovado` ou `bloqueado`

## Critérios de bloqueio

Bloquear quando:
- Regressão real ou altamente provável
- Edge case não tratado em fluxo crítico
- Violação de `agents.md` ou `constitution.md`
- Teste obrigatório ausente para mudança relevante
- Componentização sem justificativa ou lógica não trivial na interface
- Contrato alterado sem aprovação

## Regras

- Este checklist é bloqueante por padrão
- Achados vêm antes de sumários
- Cada achado deve ser concreto, verificável e priorizado
- Não aplicar correções a menos que o usuário peça explicitamente

## Saída esperada

Veredicto (`aprovado` | `bloqueado`) com achados priorizados no formato:

```
[severidade] arquivo ou fluxo
Problema: ...
Impacto: ...
Regra/contrato afetado: ...
Evidência: ...
```
