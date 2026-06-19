# Spec — antigravity-ide-inject

**Criado em**: 2026-06-19
**Status**: Draft
**Input**: Adicionar suporte ao Antigravity IDE no comando `inject`, assim como já existe para Cursor e Windsurf.

---

## Objetivo

Permitir que o usuário execute `ai-dev-framework inject antigravityide` (ou `inject --global antigravityide`) para injetar o bloco do framework nas regras do Antigravity IDE — tanto por projeto quanto globalmente.

---

## Escopo

**Em escopo:**
- Adicionar entrada `antigravityide` no objeto `IDES` em `bin/cli.js`
- Suporte a `linkProject`: escreve em `.agent/rules/ai-dev-framework.md` na raiz do projeto
- Suporte a `linkGlobal`: escreve em `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md`
- Detecção automática via `/Applications/Antigravity IDE.app` ou `~/.gemini/antigravity-ide/`
- Atualizar help text em `bin/cli.js`
- Atualizar `CHANGELOG.md` (entrada v1.7.0 já existente)
- Atualizar `README.md` (tabela de IDEs)

**Fora do escopo:**
- Modificar o comportamento de outros IDEs já suportados
- Suporte a workflow files do Antigravity IDE (apenas rule files)
- Modificar o comando `uninstall` para IDEs (não há lógica de uninstall de arquivos de IDE no CLI atual)

---

## Referências

- `bin/cli.js` — objeto `IDES` (linha 245), funções `injectBlock` (linha 51), `frameworkBlock` (linha 62)
- `constitution.md`
- `/Applications/Antigravity IDE.app/Contents/Resources/app/extensions/antigravity/package.json` — fonte dos glob patterns de rule files

---

## Cenários de usuário

### Cenário 1 — Inject por projeto (P1)

**Jornada**: Usuário abre o terminal na raiz de um projeto e executa `ai-dev-framework inject antigravityide`
**Teste independente**: `cat .agent/rules/ai-dev-framework.md` deve conter o bloco do framework entre markers `<!-- ai-dev-framework -->`
**Critérios de aceite**:
- [ ] Arquivo `.agent/rules/ai-dev-framework.md` criado na raiz do projeto
- [ ] Conteúdo contém o bloco do framework com paths corretos
- [ ] Execução idempotente: rodar novamente não duplica o conteúdo

### Cenário 2 — Inject global (P1)

**Jornada**: Usuário executa `ai-dev-framework inject --global antigravityide`
**Teste independente**: `cat ~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md`
**Critérios de aceite**:
- [ ] Arquivo criado em `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md`
- [ ] Conteúdo correto com markers

### Cenário 3 — Detecção automática com `--all` (P2)

**Jornada**: Usuário executa `ai-dev-framework inject --global` (sem especificar IDE)
**Critérios de aceite**:
- [ ] `antigravityide` aparece na saída quando IDE está instalado
- [ ] Não aparece (ou é marcado como "not detected") em máquina sem Antigravity IDE

---

## Requisitos funcionais

| ID | Requisito |
|----|-----------|
| FR-001 | `IDES.antigravityide.supportsGlobal` deve ser `true` |
| FR-002 | `detectGlobal()` verifica `/Applications/Antigravity IDE.app` OU `~/.gemini/antigravity-ide/` |
| FR-003 | `linkProject(projectDir)` injeta em `.agent/rules/ai-dev-framework.md` via `injectBlock()` |
| FR-004 | `linkGlobal()` injeta em `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md` via `injectBlock()` |
| FR-005 | Help text atualizado com `antigravityide` na seção `IDEs (inject):` |

---

## Contratos e restrições

**Contratos que não podem mudar:**
- Assinatura do objeto `IDES`: cada entrada deve ter `name`, `supportsGlobal`, `detectGlobal`, `linkGlobal`, `linkProject`
- `injectBlock()` e `frameworkBlock()` não são modificados

**Restrições:**
- Usar apenas `injectBlock()` (não `writeCursorRule()`) — Antigravity IDE usa Markdown puro, sem frontmatter YAML
- Não alterar comportamento de outros IDEs

---

## Edge cases

- Diretório `.agent/rules/` não existe no projeto → `injectBlock` cria automaticamente via `mkdirSync(..., { recursive: true })`
- `~/.gemini/antigravity-ide/global_workflows/` não existe → mesma lógica
- Antigravity IDE não instalado mas `--global` solicitado → `detectGlobal()` retorna false, CLI exibe "not detected" (comportamento padrão do loop de inject)
- Arquivo já existe com conteúdo anterior → `injectBlock` substitui bloco idempotentemente

---

## Critérios de sucesso

| ID | Critério (verificável) |
|----|------------------------|
| SC-001 | `node bin/cli.js inject antigravityide` cria `.agent/rules/ai-dev-framework.md` com conteúdo correto |
| SC-002 | `node bin/cli.js inject --global antigravityide` cria arquivo em `~/.gemini/antigravity-ide/global_workflows/` |
| SC-003 | Segunda execução não duplica conteúdo (idempotência) |
| SC-004 | `node bin/cli.js inject` sem argumentos inclui `antigravityide` no loop |
| SC-005 | Help text (`node bin/cli.js help`) lista `antigravityide` |

---

## Premissas

- Antigravity IDE lê rule files de `.agent/rules/**/*.md` (descoberto via package.json do extension)
- O global_workflows path (`~/.gemini/antigravity*/global_workflows/*.md`) é lido pelo IDE como contexto global
- Não é necessário frontmatter especial (ao contrário do Cursor)

---

## Perguntas abertas

Nenhuma — todas resolvidas com a exploração do binário do Antigravity IDE.
