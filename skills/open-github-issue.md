# open-github-issue

**Skill**: Abertura de issue no GitHub antes de iniciar qualquer implementação.

## Quando usar

Primeiro passo de qualquer agent antes de começar trabalho real de código. Executar após `read-project-context` e `classify-change`, antes de invocar sub-agents de implementação.

Pular apenas se: repositório não tem remote GitHub, `gh` CLI não está disponível, ou usuário explicitamente dispensar.

## Pré-requisitos

- `gh` CLI instalado e autenticado (`gh auth status`)
- Repositório com remote GitHub (`git remote get-url origin`)

Se algum pré-requisito falhar, informar o usuário e prosseguir sem criar issue.

## Procedimento

### 1. Detectar repositório

```bash
git remote get-url origin
```

Extrair `owner/repo` da URL (suporta HTTPS e SSH).

### 2. Determinar label a partir da classificação

Usar output de `classify-change` ou reclassificar se não disponível:

| Classificação | Label GitHub |
|--------------|-------------|
| `fix` | `bug` |
| `feature` | `enhancement` |
| `improvement` | `enhancement` |
| `component` (criação) | `enhancement` |
| `component` (refactor) | `refactor` |
| `docs` / `documentation` | `documentation` |
| `chore` / config / deps | `chore` |

Se a label não existir no repositório, criar antes:
```bash
gh label create "refactor" --color "#e4e669" --description "Code restructuring without behavior change" --repo owner/repo
gh label create "chore" --color "#ededed" --description "Maintenance, config, deps" --repo owner/repo
```

### 3. Construir título e body da issue

**Título**: imperativo, conciso, máximo 72 caracteres. Descrever o que será feito.

Exemplos:
- `fix: handle expired token refresh without redirect loop`
- `feat: add PIX payment method`
- `refactor: extract validation logic from UserForm component`

**Body**:
```markdown
## Objetivo

<o que será implementado/corrigido e por quê>

## Escopo

<arquivos/módulos afetados — se já mapeados>

## Critérios de conclusão

- [ ] Implementação completa
- [ ] Testes adicionados/atualizados
- [ ] Auditoria de qualidade passou
```

### 4. Criar a issue

```bash
gh issue create \
  --title "<título>" \
  --body "<body>" \
  --label "<label>" \
  --repo owner/repo
```

### 5. Registrar número da issue

Capturar e registrar o número retornado pelo `gh issue create` (ex: `#42`).

**Registrar de forma visível na sessão** — o agent e sub-agents precisam deste número para a skill `close-github-issue` ao final.

## Saída esperada

```
Issue criada: #42 — fix: handle expired token refresh without redirect loop
URL: https://github.com/owner/repo/issues/42
Label: bug
```

Manter o número `#42` acessível durante toda a sessão de implementação.
