# commit-changes

**Skill**: Agrupamento e execução de commits semânticos por funcionalidade.

## Quando usar

Após implementação completa, quando há mudanças para commitar. Invocada por agents após entrega de mudanças reais de código.

## Procedimento

### 0. Confirmar modo de execução

**Antes de qualquer ação**, perguntar ao usuário:

> "Posso executar os commits automaticamente nesta sessão, ou prefere aprovar cada um antes de commitar?"

- **Modo automático** (usuário confirma): executar todos os commits na ordem definida sem interrupção
- **Modo manual** (padrão se não confirmado): antes de cada commit, apresentar o grupo e a mensagem planejada e aguardar aprovação explícita

No modo manual, formato de apresentação antes de cada commit:
```
Próximo commit:
  Arquivos: src/auth/token.ts, __tests__/auth/token.test.ts
  Mensagem: fix(auth): handle expired token refresh without redirect loop

Confirma? (s/n)
```

Não executar nenhum `git add` ou `git commit` antes da confirmação no modo manual.

### 1. Inspecionar mudanças pendentes

```bash
git diff --staged --name-only   # arquivos staged
git diff --name-only            # arquivos modificados não staged
git status                      # visão geral
```

Ler o diff real de cada arquivo para entender o que mudou.

### 2. Agrupar por funcionalidade

Analisar os arquivos modificados e agrupá-los por funcionalidade ou área de responsabilidade.

**Regra de agrupamento:**
- Arquivos que servem à mesma feature/domínio → mesmo commit
- Mudanças em áreas distintas → commits separados
- Testes de uma feature → mesmo commit que a feature (não separar)
- Documentação de uma feature → mesmo commit que a feature
- Mudanças puramente estruturais (config, deps, build) → commit separado

**Exemplos de grupos:**
```
Grupo A: auth → src/auth/login.ts, src/auth/token.ts, __tests__/auth/login.test.ts
Grupo B: ui → src/components/Button.tsx, src/components/Button.test.tsx
Grupo C: config → package.json, tsconfig.json
```

### 3. Classificar cada grupo

Para cada grupo, determinar:

**Tipo** (Conventional Commits):
| Tipo | Quando usar |
|------|------------|
| `feat` | Nova funcionalidade ou comportamento visível |
| `fix` | Correção de comportamento incorreto |
| `refactor` | Reestruturação sem mudança de comportamento |
| `perf` | Melhoria de performance |
| `docs` | Apenas documentação |
| `test` | Apenas testes, sem mudança de código fonte |
| `chore` | Manutenção, deps, config, scripts |
| `build` | Mudanças no sistema de build ou dependências |
| `style` | Formatação sem mudança de lógica |
| `revert` | Revertendo commit anterior |

**Escopo**: nome da feature, módulo ou domínio afetado (ex: `auth`, `checkout`, `api`, `ui`)

**Breaking change**: adicionar `!` após tipo+escopo se houver quebra de contrato

### 4. Escrever mensagem de cada commit

**Subject line:**
- Formato: `<tipo>(<escopo>): <resumo imperativo>`
- Mood imperativo: "add", "fix", "remove", "extract", "move" — não "added", "adds"
- Máximo **75 caracteres**
- Sem ponto final
- Escopo é obrigatório quando há múltiplos grupos

**Body (apenas quando necessário):**
- Omitir quando o subject é autoexplicativo — o diff já diz o quê
- Incluir apenas quando o *porquê* não é óbvio pelo subject
- Bullets com `-`, wrap a 72 caracteres por linha
- Incluir **sempre** para: breaking changes, migrações de dados, fixes com causa não óbvia, reverts, correções de segurança

**O que NUNCA incluir:**
- "This commit does X" — o diff já diz
- Nomes de arquivo quando o escopo já cobre
- Atribuição a IA ou ferramenta
- Emoji (salvo convenção do projeto)

### 5. Executar commits na ordem correta

Ordem recomendada:
1. Mudanças estruturais/config (chore, build)
2. Features e fixes (feat, fix, refactor)
3. Documentação (docs)

Para cada grupo — respeitando o modo de execução definido no passo 0:
```bash
git add <arquivos do grupo>
git commit -m "<mensagem do grupo>"
```

Verificar resultado após cada commit.

## Exemplos

### Exemplo: feature com testes e docs

Arquivos: `src/payments/pix.ts`, `src/payments/pix.test.ts`, `docs/payments.md`

```
feat(payments): add PIX payment method

- supports CPF and CNPJ as receiver key
- validates key format before processing
```

### Exemplo: múltiplos grupos

Arquivos: `src/auth/token.ts` (fix), `src/ui/Button.tsx` (refactor), `package.json` (dep bump)

```bash
# Grupo 1 — chore
git add package.json
git commit -m "chore(deps): bump jwt-decode to 4.0.0"

# Grupo 2 — fix
git add src/auth/token.ts
git commit -m "fix(auth): handle expired token refresh without redirect loop"

# Grupo 3 — refactor
git add src/ui/Button.tsx
git commit -m "refactor(ui): extract loading state to ButtonSpinner sub-component"
```

### Exemplo: breaking change

```
feat(api)!: replace /v1/users with /v2/members

BREAKING CHANGE: /v1/users removed. Clients must migrate to /v2/members.
Old route returns 410 after 2026-07-01.
```

## Regras

- Nunca fazer um commit gigante com tudo misturado
- Testes e docs da mesma feature vão no mesmo commit da feature
- Se grupo tiver arquivos demais e responsabilidades distintas, dividir mais
- Sempre verificar `git status` após todos os commits para confirmar que nada ficou de fora
- Não commitar arquivos sensíveis (`.env`, credentials) — alertar o usuário se encontrar

## Saída esperada

Lista dos commits realizados:
```
✓ chore(deps): bump jwt-decode to 4.0.0
✓ fix(auth): handle expired token refresh without redirect loop
✓ refactor(ui): extract loading state to ButtonSpinner sub-component
```
