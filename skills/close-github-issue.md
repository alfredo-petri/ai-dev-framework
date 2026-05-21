# close-github-issue

**Skill**: Comentar e fechar a issue do GitHub ao concluir implementação.

## Quando usar

Último passo após `quality-guardian` passar e `commit-changes` concluir. Só executar se `open-github-issue` foi invocada nesta sessão e o número da issue está disponível.

## Pré-requisitos

- Número da issue da sessão atual (gerado por `open-github-issue`)
- `gh` CLI instalado e autenticado
- Commits já realizados (após `commit-changes`)

## Procedimento

### 1. Coletar contexto da implementação

Reunir:
- O que foi implementado/corrigido
- Arquivos modificados: `git diff --name-only HEAD~<n>` ou `git log --oneline -<n>`
- Commits feitos nesta sessão: `git log --oneline -10`

### 2. Escrever comentário de conclusão

Formato do comentário:

```markdown
## ✅ Implementação concluída

### O que foi feito

<resumo objetivo do que foi implementado, corrigido ou melhorado>

### Commits

<lista dos commits feitos — copiar do git log>

### Arquivos alterados

<lista dos arquivos principais modificados>

### Notas

<qualquer decisão de escopo, edge case encontrado, ou ponto de atenção para revisão>
```

Ser objetivo. Não repetir o que já está nos commits. Focar no *porquê* e em decisões não óbvias.

### 3. Adicionar comentário e fechar issue

```bash
gh issue comment <número> --body "<comentário>" --repo owner/repo
gh issue close <número> --repo owner/repo
```

Ou em uma operação combinada se disponível:
```bash
gh issue close <número> --comment "<comentário>" --repo owner/repo
```

### 4. Confirmar

```bash
gh issue view <número> --repo owner/repo
```

Verificar que status é `closed`.

## Saída esperada

```
Issue #42 comentada e fechada.
URL: https://github.com/owner/repo/issues/42
```

## Regras

- Nunca fechar sem comentar — o comentário é o registro de entrega
- Se `quality-guardian` não passou, não fechar — corrigir antes
- Se commits não foram feitos ainda, executar `commit-changes` antes
- Se a issue não existe mais ou foi fechada externamente, apenas registrar e seguir
