# Plan — antigravity-ide-inject

**Data**: 2026-06-19
**Referência de spec**: `specs/001-antigravity-ide-inject/spec.md`

---

## Resumo

Adicionar a entrada `antigravityide` ao objeto `IDES` em `bin/cli.js`, reutilizando `injectBlock()` e `frameworkBlock()` já existentes. Atualizar help text, CHANGELOG e README.

---

## Contexto técnico

| Item | Valor |
|------|-------|
| Linguagem | JavaScript (Node.js) |
| Framework | CLI (sem framework web) |
| Estilização | N/A |
| Dados/Persistência | Filesystem via `fs` nativo |
| Testes | Nenhum (projeto não tem suite de testes) |
| Contexto de domínio | `bin/cli.js` — objeto `IDES`, funções `injectBlock`, `frameworkBlock` |

---

## Checklist da constituição

- [x] Maintainability First: adição mínima ao padrão já estabelecido, sem nova abstração
- [x] Integridade de contrato: nenhum contrato existente muda; apenas nova entrada no `IDES`
- [x] Lógica fora da UI: N/A (CLI sem UI)
- [x] Cobertura de testes: projeto não tem suite; verificação manual definida em SC-001~SC-005
- [x] Bloqueios abertos: nenhum

---

## Áreas afetadas

**Entry points**: `bin/cli.js` — objeto `IDES` (linha 245), help text (linha 659)
**Lógica de negócio**: nenhuma nova — reutiliza `injectBlock()` e `frameworkBlock()`
**Contratos**: nova entrada `antigravityide` no shape do objeto IDES
**Documentação**: `CHANGELOG.md` (v1.7.0), `README.md` (tabela de IDEs)

---

## Referências visuais

**Acionado**: não (CLI sem UI)

---

## Estratégia de implementação

1. Inserir entrada `antigravityide` no objeto `IDES` em `bin/cli.js` após `windsurf`
2. Atualizar help text na seção `IDEs (inject):` adicionando `antigravityide`
3. Adicionar item na entrada `v1.7.0` do `CHANGELOG.md`
4. Adicionar `antigravityide` na tabela de IDEs do `README.md`

---

## Estratégia de testes

**Unit**: N/A — projeto sem suite de testes
**Componente**: N/A
**Integração**: verificação manual conforme SC-001~SC-005 em `spec.md`
**Lacunas conhecidas**: ausência de suite de testes é pré-existente ao escopo desta feature

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| global_workflows não ser lido pelo IDE como esperado | Path descoberto via package.json do extension — fonte confiável |
| `.agent/rules/` não ser detectado pelo IDE | Mesmo glob pattern — descoberto via package.json |

---

## Gate de aprovação

**Status**: pendente aprovação do usuário
**Condição para iniciar código**: aprovação explícita do usuário
