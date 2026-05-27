# open-framework-issue

**Skill**: Abertura de issue no repositório `alfredo-petri/ai-dev-framework` via perguntas guiadas.

## Quando usar

Quando o usuário quiser reportar um bug, solicitar uma feature, ou sugerir melhoria no próprio framework. Invocável diretamente pelo usuário.

## Pré-requisito

Verificar autenticação antes de qualquer pergunta:

```bash
gh auth status
```

Se falhar, informar o usuário e abortar:
```
gh CLI não autenticado. Execute "gh auth login" e tente novamente.
```

## Procedimento

### 1. Coletar campos em sequência

Fazer uma pergunta por vez. Se a resposta for vaga, curta demais ou incompleta, fazer perguntas de follow-up antes de avançar ao próximo campo.

---

**Campo 1 — Categoria**

Apresentar a lista e aguardar escolha:

```
Qual a categoria da issue?

  feat     nova funcionalidade para o usuário
  fix      correção de bug para o usuário
  docs     mudanças na documentação
  style    formatação, sem mudança de código de produção
  refactor reestruturação de código de produção
  test     adição ou refatoração de testes
  chore    manutenção, deps, configuração
```

---

**Campo 2 — Título**

```
Descreva em uma frase o que deve ser feito ou corrigido.
(imperativo, máximo 72 caracteres — sem o prefixo da categoria)
```

Exemplos válidos:
- `detect copilot CLI via binary name instead of github-copilot-cli`
- `add inject command for IDE project and global config`

Se o título for vago, perguntar: *"O que exatamente está errado / deve ser adicionado?"*

---

**Campo 3 — Descrição**

```
Descreva o problema ou a funcionalidade com mais detalhes.
Por que isso é necessário?
```

Follow-up se superficial: *"Qual o impacto atual? O que acontece hoje que não deveria, ou o que falta?"*

---

**Campo 4 — Contexto**

```
Quais arquivos, skills, agents, comandos CLI ou comportamentos do framework
estão envolvidos?
```

Aceitar "não sei" — nesse caso omitir a seção do body.

---

**Campo 5 — Evidências** *(obrigatório para `fix`, opcional para demais)*

```
Mensagens de erro, passos para reproduzir, comportamento esperado vs. atual.
```

Para `fix`, se ausente, perguntar: *"Como reproduzir o problema? O que aparece de errado?"*

Para demais categorias, se o usuário não fornecer, omitir a seção.

---

**Campo 6 — Critérios de aceite**

```
Liste os itens que definem "pronto" para esta issue.
```

Se o usuário der apenas um item genérico ("funcionar"), sugerir refinamento:
*"O que especificamente deve estar funcionando? Como verificar?"*

---

### 2. Garantir labels no repositório

Antes de criar a issue, garantir que a label existe:

```bash
gh label list --repo alfredo-petri/ai-dev-framework --json name --jq '.[].name'
```

Se a categoria escolhida não estiver na lista, criar:

```bash
gh label create "<categoria>" \
  --repo alfredo-petri/ai-dev-framework \
  --color "#ededed" \
  --description "<categoria> changes"
```

### 3. Construir body da issue

```markdown
## Descrição

<campo 3>

## Contexto

<campo 4 — omitir seção se não fornecido>

## Evidências

<campo 5 — omitir seção se não fornecido>

## Critérios de aceite

- [ ] <item 1>
- [ ] <item 2>
```

### 4. Criar a issue

```bash
gh issue create \
  --title "<categoria>: <título>" \
  --label "<categoria>" \
  --body "<body>" \
  --repo alfredo-petri/ai-dev-framework
```

## Saída esperada

```
Issue criada: #XX — feat: título da issue
URL: https://github.com/alfredo-petri/ai-dev-framework/issues/XX
Label: feat
```
