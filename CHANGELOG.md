# Changelog

## v1.3.0

### CLI

- Novo comando `inject` — injeta o framework em projetos e configurações globais de IDEs
  - `inject` (sem flags): cria arquivos de instrução no diretório atual para todas as IDEs
  - `inject --global`: injeta na config global das IDEs detectadas
  - `inject [ide...]`: filtra IDEs específicas (`copilot`, `cursor`, `windsurf`)
  - IDEs suportadas: VS Code + Copilot, Cursor, Windsurf
- `link --all` agora injeta config global nas IDEs detectadas (Cursor, Windsurf) além dos CLI agents
- `update` também re-linka IDEs globais após atualização
- `status` exibe seção **IDEs (global)** com detecção por IDE

### Skills

- `open-framework-issue` — guia o usuário por perguntas estruturadas (categoria, título, descrição, contexto, evidências, critérios de aceite) e abre issue no repositório `alfredo-petri/ai-dev-framework` via `gh issue create`
- Slash command registrado: `/ai-df-skill-open-framework-issue` (total: 24 slash commands)

### GitHub Actions

- `auto-label-issues` — aplica label automaticamente em issues recém-abertas com base no prefixo do título (`feat:`, `fix:`, etc.) ou no corpo da issue; cria a label no repositório se não existir
- `npm-publish` — publica automaticamente no npm a cada push na `master`; verifica versão, entrada no CHANGELOG e README antes de publicar; requer secret `NPM_TOKEN`

## v1.2.4

### Docs

- README atualizado com seção de IDE plugins e tabela de comandos `inject`

## v1.2.3

### CLI

- Detecção e link do GitHub Copilot CLI corrigidos para binário `copilot` e formato nativo de skills (`~/.copilot/skills/`)
- Adicionado `createCopilotSkillWrappers` — cria `SKILL.md` + `README.md` por skill em `~/.copilot/skills/<name>/`
- `uninstall` remove skills do Copilot via `removeCopilotSkillWrappers`

## v1.2.2

### CLI

- Corrigido: detecção do GitHub Copilot CLI agora checa binário `copilot` ou diretório `~/.copilot/` — antes exigia `github-copilot-cli` (binário npm descontinuado)
- `link copilot` cria skills em `~/.copilot/skills/<name>/{SKILL.md,README.md}` no formato nativo do Copilot CLI — antes escrevia em `~/.config/gh-copilot/instructions.md` (inexistente)
- `uninstall` agora remove skills do Copilot CLI em `~/.copilot/skills/`

## v1.2.1

### Docs

- README reescrito com exemplos de uso para cada agent, sub-agent, skill e tool
- Seção de slash commands com lista completa dos 23 comandos disponíveis

## v1.2.0

### Skills

- `open-github-issue` — abre issue GitHub com label correlata antes de implementar (bug/enhancement/refactor/documentation/chore)
- `close-github-issue` — comenta resumo da implementação e fecha issue após commit-changes

### Agents

- `agent-base`: pipeline atualizado — open-github-issue antes de implementar, close-github-issue como último passo

### CLI

- 2 novos slash commands: `ai-df-skill-open-github-issue`, `ai-df-skill-close-github-issue`

## v1.1.1

### CLI

- Corrigido: slash commands agora criados em `~/.claude/commands/<name>.md` (formato correto do Claude Code)
- Era: `~/.claude/skills/<name>/SKILL.md` (não existe no Claude Code)

## v1.1.0

### CLI

- `link claude` agora cria 21 skill wrappers em `~/.claude/skills/` — agents, sub-agents e skills disponíveis como slash commands no Claude Code
- Nomenclatura: `ai-df-agent-*`, `ai-df-subagent-*`, `ai-df-skill-*`
- `uninstall` remove wrappers de `~/.claude/skills/` automaticamente
- `update` recria wrappers após atualização de arquivos

## v1.0.0

### Arquitetura

- Conversão completa para Convenção 1 da indústria (agents usam sub-agents, skills e tools)
- `agents/` — orchestrators com goal de alto nível (eram skills/orchestrators)
- `sub-agents/` — especialistas com missão única (eram agents/)
- `skills/` — capabilities compostas e reutilizáveis (nova camada)
- `tools/` — operações atômicas (nova camada)

### Agents

- `bugfix-agent` — corrigir comportamento incorreto com mudança mínima segura
- `component-creation-agent` — criar novo componente preservando padrão do projeto
- `component-refactor-agent` — refatorar com componentização e separação lógica-UI
- `feature-module-agent` — criar feature/módulo com disciplina de spec e relatório
- `improvement-agent` — melhorar código existente sem regressão

### Sub-agents

- `scope-mapper` — mapear escopo e contratos antes de refatorar
- `style-reference-scout` — coletar referências visuais antes de criar UI
- `refactor-engineer` — refatorar de forma conservadora
- `test-engineer` — criar cobertura por matriz de risco
- `quality-guardian` — gate final bloqueante de auditoria

### Skills

- `read-project-context` — leitura obrigatória de constitution + agents.md
- `classify-change` — classificar mudança como feature, fix, improvement ou component
- `build-scope-map` — mapeamento de escopo e contratos
- `collect-visual-references` — coleta de referências visuais
- `build-risk-matrix` — matriz de risco para decisão de testes
- `write-tests` — escrita de testes no framework do projeto
- `run-audit-checklist` — checklist bloqueante de auditoria final
- `document-aicontext` — documentar mudanças em aicontext/
- `commit-changes` — agrupar e executar commits semânticos por funcionalidade
- `search-update` — verificar atualizações disponíveis (uma vez por sessão)
- `update` — atualizar framework para a versão mais recente

### Tools

- `inspect-files` — leitura sistemática de arquivos e estrutura
- `search-codebase` — busca de símbolos e padrões
- `run-command` — execução de comandos e interpretação de saída
- `emit-structured-output` — formato canônico de output

### CLI

- `ai-dev-framework install` — instala framework em `~/.ai-dev-framework/`
- `ai-dev-framework link [agent|--all]` — injeta referência em agents CLI
- `ai-dev-framework check-update` — verifica atualizações no GitHub
- `ai-dev-framework update` — atualiza para a versão mais recente
- `ai-dev-framework status` — estado da instalação e agents detectados
- `ai-dev-framework uninstall` — remove `~/.ai-dev-framework/`

Agents CLI suportados: Claude Code, OpenAI Codex CLI, GitHub Copilot CLI, Gemini CLI
