# ai-dev-framework

Framework portátil de agents, sub-agents, skills e tools para desenvolvimento assistido por IA. Neutro de stack, modelo e ferramenta — aplique a qualquer projeto web/fullstack com qualquer AI agent CLI.

## Instalação global

```bash
npm install -g @alfredo-petri/ai-dev-framework
ai-dev-framework install
ai-dev-framework link --all
```

Instala o framework em `~/.ai-dev-framework/` e injeta referência automática nos AI agents CLI detectados.

### AI agents CLI suportados

| Comando | Agent | Config injetada |
|---------|-------|-----------------|
| `link claude` | Claude Code | `~/.claude/CLAUDE.md` + 23 slash commands em `~/.claude/commands/` |
| `link codex` | OpenAI Codex CLI | `~/.codex/instructions.md` |
| `link copilot` | GitHub Copilot CLI (`copilot` binary) | 23 skills em `~/.copilot/skills/` |
| `link gemini` | Gemini CLI | `~/.gemini/GEMINI.md` |
| `link --all` | Todos os CLI agents detectados + IDEs globais detectadas | — |

`link --all` também injeta automaticamente a config global nas IDEs detectadas (Cursor e Windsurf), sem necessidade de rodar `inject --global` separado.

### IDE plugins

Para injetar em IDEs, use `inject` no diretório raiz do projeto:

```bash
# todas as IDEs no projeto atual
ai-dev-framework inject

# IDE específica
ai-dev-framework inject cursor
ai-dev-framework inject copilot
ai-dev-framework inject windsurf

# config global (onde suportado)
ai-dev-framework inject --global
ai-dev-framework inject --global windsurf
```

| IDE | Escopo | Arquivo gerado |
|-----|--------|----------------|
| VS Code + GitHub Copilot | project | `.github/copilot-instructions.md` |
| Cursor | project + global | `.cursor/rules/ai-dev-framework.mdc` |
| Windsurf | project + global | `.windsurfrules` / `~/.codeium/windsurf/memories/global_rules.md` |

### Comandos disponíveis

```bash
ai-dev-framework install              # instala framework em ~/.ai-dev-framework/
ai-dev-framework link --all           # linka a todos os CLI agents detectados
ai-dev-framework link claude          # linka apenas ao Claude Code
ai-dev-framework inject               # injeta em todas as IDEs no projeto atual
ai-dev-framework inject --global      # injeta na config global das IDEs detectadas
ai-dev-framework inject cursor        # injeta apenas no Cursor (projeto atual)
ai-dev-framework check-update         # verifica atualizações no GitHub
ai-dev-framework update               # atualiza para a versão mais recente
ai-dev-framework status               # mostra estado da instalação, CLI agents e IDEs
ai-dev-framework uninstall            # remove ~/.ai-dev-framework/ e configs injetadas
```

---

## Hierarquia

```
Agent (orchestrator — goal de alto nível)
  ├── invoca Sub-agents  →  especialistas com missão única
  │     └── usam Skills  →  capabilities compostas e reutilizáveis
  │           └── usam Tools  →  operações atômicas
  ├── usa Skills diretamente quando aplicável
  └── usa Tools diretamente quando aplicável
```

## Pipeline padrão

```
read-project-context      (skill — obrigatória)
classify-change           (skill — obrigatória)
open-github-issue         (skill — obrigatória se GitHub disponível)
  ↓
scope-mapper              (sub-agent — condicional)
style-reference-scout     (sub-agent — condicional)
refactor-engineer         (sub-agent — obrigatório em código)
test-engineer             (sub-agent — obrigatório em código)
quality-guardian          (sub-agent — gate final)
  ↓
commit-changes            (skill)
close-github-issue        (skill)
```

---

## Agents

Orchestrators de alto nível. Ponto de entrada para qualquer tarefa. No Claude Code: `/ai-df-agent-*`

### bugfix-agent

Corrige comportamento incorreto com mudança mínima e segura.

```
/ai-df-agent-bugfix
corrigir o bug de timeout no módulo de pagamentos — o retry não respeita o intervalo configurado
```

```
use o bugfix-agent para corrigir o comportamento incorreto no cálculo de datas no relatório mensal
```

Fluxo: confirma comportamento atual vs. esperado → scope-mapper se origem difusa → refactor-engineer → test-engineer → quality-guardian → commit-changes → close-github-issue.

---

### feature-module-agent

Cria feature ou módulo novo com disciplina de spec, plano e relatório.

```
/ai-df-agent-feature-module
implementar o módulo de autenticação via OAuth 2.0 com suporte a Google e GitHub
```

```
use o feature-module-agent para criar o módulo de notificações push
```

Cria `specs/<slug>/` com clarify, spec, plan, tasks, implement e report. Aguarda aprovação explícita antes de escrever código.

---

### component-creation-agent

Cria novo componente preservando padrão visual e arquitetural do projeto.

```
/ai-df-agent-component-creation
criar um componente DataTable reutilizável com suporte a ordenação, paginação e seleção de linhas
```

```
use o component-creation-agent para criar um componente de upload de arquivos com drag-and-drop
```

Invoca style-reference-scout antes de criar qualquer UI para garantir aderência ao padrão local.

---

### component-refactor-agent

Refatora componente existente com componentização e separação lógica-UI.

```
/ai-df-agent-component-refactor
refatorar src/components/UserDashboard.tsx — componente com 600 linhas misturando lógica e apresentação
```

```
use o component-refactor-agent em src/features/checkout/CheckoutForm.tsx
```

Mapeia escopo → extrai lógica → componentiza → testa → audita.

---

### improvement-agent

Melhora código existente sem regressão ou desvio de padrão.

```
/ai-df-agent-improvement
melhorar a performance do módulo de relatórios — queries N+1 detectadas no log de produção
```

```
use o improvement-agent para melhorar a legibilidade e manutenibilidade de src/lib/date-utils.ts
```

Escopo conservador. Não inventa edge cases. Não refatora além do pedido.

---

## Sub-agents

Especialistas invocados pelos agents. Missão única, input/output definido. No Claude Code: `/ai-df-subagent-*`

### scope-mapper

Mapeia escopo, contratos e arquivos candidatos antes de qualquer mudança.

```
/ai-df-subagent-scope-mapper
mapear o escopo do módulo de autenticação — quais arquivos são afetados se trocarmos a biblioteca de JWT
```

```
use o scope-mapper para identificar tudo que depende de src/lib/api-client.ts antes de refatorar
```

Saída: arquivos em escopo, fora do escopo, contratos críticos, ambiguidades.

---

### style-reference-scout

Coleta referências visuais antes de criar nova UI.

```
/ai-df-subagent-style-reference-scout
coletar referências visuais para criar um novo componente de modal de confirmação
```

```
use o style-reference-scout para mapear os padrões de formulário do projeto antes de criar o FormWizard
```

Inspeciona `components/ui/`, estilos globais e `components-registry.md`. Não implementa.

---

### refactor-engineer

Refatora código de forma conservadora.

```
/ai-df-subagent-refactor-engineer
extrair a lógica de validação de src/components/LoginForm.tsx para um hook reutilizável
```

```
use o refactor-engineer para separar a camada de acesso a dados do módulo de produtos
```

Preserva comportamento, contratos e padrões locais. Não inventa requisitos.

---

### test-engineer

Cria cobertura de testes por matriz de risco.

```
/ai-df-subagent-test-engineer
criar testes para o módulo de cálculo de frete recém implementado
```

```
use o test-engineer para cobrir os edge cases de src/lib/discount-calculator.ts
```

Detecta framework existente, segue padrão local. Cobre unit, component e integração conforme risco.

---

### quality-guardian

Gate final bloqueante de auditoria.

```
/ai-df-subagent-quality-guardian
auditar as mudanças do PR de refatoração do módulo de auth antes do merge
```

```
use o quality-guardian para revisar a implementação do módulo de pagamentos PIX
```

Verifica regressão, edge cases, contratos, separação lógica-UI e conformidade com constitution. Bloqueia se não passar.

---

## Skills

Capabilities compostas reutilizáveis. Invocadas diretamente quando não há necessidade de orquestração de sub-agents. No Claude Code: `/ai-df-skill-*`

### read-project-context

Leitura obrigatória de contexto antes de qualquer trabalho.

```
/ai-df-skill-read-project-context
```

Lê `constitution.md`, `agents.md` e contexto de domínio aplicável. Primeiro passo de todo agent e sub-agent.

---

### classify-change

Classifica o tipo de mudança: `fix`, `feature`, `improvement` ou `component`.

```
/ai-df-skill-classify-change
classificar: adicionar suporte a pagamento via PIX no checkout
```

Saída: classificação + razão. Alimenta `open-github-issue` para determinar a label correta.

---

### open-github-issue

Abre issue no GitHub com label correlata antes de implementar.

```
/ai-df-skill-open-github-issue
abrir issue para: corrigir o bug de timeout no módulo de pagamentos
```

Detecta `owner/repo` do remote, determina label (`bug`/`enhancement`/`refactor`/`documentation`/`chore`), cria issue com título, body e critérios de conclusão. Registra número da issue para `close-github-issue`.

---

### close-github-issue

Comenta resumo da implementação e fecha a issue.

```
/ai-df-skill-close-github-issue
fechar a issue #42 com resumo do que foi implementado
```

Coleta commits e arquivos da sessão, escreve comentário de entrega, fecha issue. Só executar após `commit-changes`.

---

### build-scope-map

Mapeia escopo, contratos e ambiguidades de uma área do código.

```
/ai-df-skill-build-scope-map
mapear escopo de src/modules/payments/ antes de trocar o gateway
```

Saída estruturada: arquivos em escopo, fora do escopo, contratos sensíveis, perguntas sem resposta no código.

---

### collect-visual-references

Inspeciona componentes existentes para extrair padrões visuais e tokens.

```
/ai-df-skill-collect-visual-references
coletar referências visuais do projeto para criar um novo componente de tabela
```

Mapeia tokens de tema, classes recorrentes, padrões de composição e primitivos de feedback. Não implementa.

---

### build-risk-matrix

Constrói matriz de cobertura de testes por risco.

```
/ai-df-skill-build-risk-matrix
construir matriz de risco para src/lib/pricing.ts e src/hooks/useCart.ts
```

Classifica cada arquivo/fluxo como unit, component ou integração com base em complexidade e criticidade.

---

### write-tests

Escreve testes seguindo o framework e padrão do projeto.

```
/ai-df-skill-write-tests
escrever testes para src/lib/discount-calculator.ts seguindo a matriz de risco definida
```

Detecta framework (vitest/jest/playwright), segue padrão existente de nomes e estrutura. Não configura infraestrutura sem aprovação.

---

### run-audit-checklist

Checklist bloqueante de auditoria final.

```
/ai-df-skill-run-audit-checklist
auditar mudanças em src/auth/ — verificar regressão, contratos e edge cases
```

Valida regressão funcional, edge cases, contratos públicos, separação lógica-UI e conformidade com constitution. Bloqueia se qualquer item falhar.

---

### document-aicontext

Cria ou atualiza `aicontext/<modulo>.md` após implementação.

```
/ai-df-skill-document-aicontext
documentar o módulo de pagamentos após implementação do PIX
```

Infere módulo pelos arquivos modificados. Cria `aicontext/payments.md` com stack, decisões de arquitetura, integrações e convenções do módulo.

---

### commit-changes

Agrupa e executa commits semânticos por funcionalidade.

```
/ai-df-skill-commit-changes
commitar as mudanças do módulo de autenticação
```

Pergunta se modo automático ou manual. Agrupa arquivos por domínio, classifica tipo (feat/fix/refactor/chore/docs), escreve mensagens Conventional Commits, executa na ordem correta.

---

### open-framework-issue

Abre issue no repositório do próprio framework via perguntas guiadas.

```
/ai-df-skill-open-framework-issue
encontrei um bug no comando inject — ele sobrescreve o .windsurfrules existente sem preservar conteúdo anterior
```

```
/ai-df-skill-open-framework-issue
quero sugerir suporte ao Zed como nova IDE no comando inject
```

Coleta em sequência: categoria (`feat`/`fix`/`docs`/`style`/`refactor`/`test`/`chore`), título, descrição, contexto, evidências (obrigatório para `fix`) e critérios de aceite. Faz follow-up quando resposta incompleta. Cria a label no repo se não existir e submete via `gh issue create` em `alfredo-petri/ai-dev-framework`. Requer `gh` autenticado.

---

### search-update

Verifica atualizações disponíveis do framework (uma vez por sessão).

```
/ai-df-skill-search-update
```

Executa `ai-dev-framework check-update-if-needed`. Se houver nova versão, exibe release notes e pergunta se deseja atualizar.

---

### update

Atualiza o framework para a versão mais recente após aprovação.

```
/ai-df-skill-update
```

Requer confirmação explícita. Executa `ai-dev-framework update`, reinstala arquivos e recria slash commands.

---

## Tools

Operações atômicas. Base da hierarquia — usadas por skills e sub-agents. No Claude Code, invocadas implicitamente; referencie diretamente quando necessário.

### inspect-files

Leitura sistemática de arquivos e estrutura de diretórios.

```
use a tool inspect-files para mapear a estrutura de src/modules/auth/
```

```
inspecionar o arquivo src/lib/api-client.ts e seus arquivos vizinhos
```

Lê arquivos, pastas, arquivos de configuração adjacentes. Base para qualquer análise.

---

### search-codebase

Busca de símbolos, padrões e usos no codebase.

```
use a tool search-codebase para encontrar todos os usos de useAuthContext no projeto
```

```
buscar todos os arquivos que importam src/lib/pricing.ts
```

Grep por símbolo, padrão, import ou uso de função/componente. Mapeia dependências antes de refatorar.

---

### run-command

Executa comandos de teste, build, lint e interpreta saída.

```
use a tool run-command para executar os testes do módulo de pagamentos e analisar o resultado
```

```
rodar npm run build e identificar os erros de TypeScript
```

Executa, captura stdout/stderr, interpreta resultado. Não executa comandos destrutivos sem aprovação.

---

### emit-structured-output

Formata output canônico de qualquer agent ou sub-agent.

```
use a tool emit-structured-output para estruturar o resultado da análise do scope-mapper
```

Formato padrão:
```
**Objetivo**: O que foi feito
**Contexto lido**: Arquivos e documentos consultados
**Decisões**: Escolhas feitas e razão
**Artefatos**: Arquivos criados/modificados
**Riscos**: O que pode quebrar
**Próximos passos**: O que fazer a seguir
```

---

## Estrutura

```
ai-dev-framework/
├── agents.md                        # Guia operacional e regras
├── constitution.md                  # Princípios de engenharia permanentes
├── components-registry.md           # Registro de componentes reutilizáveis
├── agents/                          # Orchestrators
│   ├── agent-base.md
│   ├── bugfix-agent.md
│   ├── component-creation-agent.md
│   ├── component-refactor-agent.md
│   ├── feature-module-agent.md
│   └── improvement-agent.md
├── sub-agents/                      # Especialistas
│   ├── scope-mapper.md
│   ├── style-reference-scout.md
│   ├── refactor-engineer.md
│   ├── test-engineer.md
│   └── quality-guardian.md
├── skills/                          # Capabilities compostas
│   ├── read-project-context.md
│   ├── classify-change.md
│   ├── build-scope-map.md
│   ├── collect-visual-references.md
│   ├── build-risk-matrix.md
│   ├── write-tests.md
│   ├── run-audit-checklist.md
│   ├── document-aicontext.md
│   ├── commit-changes.md
│   ├── open-github-issue.md
│   ├── close-github-issue.md
│   ├── open-framework-issue.md
│   ├── search-update.md
│   └── update.md
└── tools/                           # Operações atômicas
    ├── inspect-files.md
    ├── search-codebase.md
    ├── run-command.md
    └── emit-structured-output.md
```

## Slash commands no Claude Code

Após `ai-dev-framework link claude`, 24 slash commands ficam disponíveis:

```
/ai-df-agent-bugfix
/ai-df-agent-feature-module
/ai-df-agent-component-creation
/ai-df-agent-component-refactor
/ai-df-agent-improvement

/ai-df-subagent-scope-mapper
/ai-df-subagent-style-reference-scout
/ai-df-subagent-refactor-engineer
/ai-df-subagent-test-engineer
/ai-df-subagent-quality-guardian

/ai-df-skill-read-project-context
/ai-df-skill-classify-change
/ai-df-skill-build-scope-map
/ai-df-skill-collect-visual-references
/ai-df-skill-build-risk-matrix
/ai-df-skill-write-tests
/ai-df-skill-run-audit-checklist
/ai-df-skill-document-aicontext
/ai-df-skill-commit-changes
/ai-df-skill-open-github-issue
/ai-df-skill-close-github-issue
/ai-df-skill-open-framework-issue
/ai-df-skill-search-update
/ai-df-skill-update
```

## Como usar em um projeto específico (sem instalação global)

```bash
npm install github:alfredo-petri/ai-dev-framework
```

Ou copie manualmente `agents/`, `sub-agents/`, `skills/`, `tools/`, `templates/`, `constitution.md` e `agents.md` para um diretório `context/` no projeto e adapte `agents.md` com a stack local.
