# Changelog

## v1.6.1

### Constitution / Core

- `constitution.md`: novo Princípio VIII — Interface/Adapter; fluxo de documentação atualizado para incluir `contracts` antes de `planning`; estrutura de pastas expandida com `adapters/`
- `agents.md`: direção obrigatória atualizada com Princípio VIII; fluxo `constitution → specification → contracts → planning → tasks → implementation`

### Sub-agents / Skills

- `quality-guardian`: bloqueio agora inclui nova integração sem interface (violação Princípio VIII)
- `scope-mapper`: mapeia interfaces existentes e sinaliza integrações sem interface como débito; saída expandida
- `test-engineer`: nova seção "Padrão Interface/Adapter em testes" — injeção via interface, adapters in-memory preferíveis a mocks
- `run-audit-checklist`: novo bloco "Padrão Interface/Adapter" no checklist bloqueante; critério de bloqueio expandido
- `build-scope-map`: identifica interfaces existentes e integrações sem interface no mapeamento
- `document-aicontext`: formato de módulo expandido com seção `## Interfaces / Contratos`; tabela de regras atualizada

## v1.6.0

### Agents / Sub-agents / Skills

- **Padrão Interface/Adapter obrigatório** em todos os agents, sub-agents e skills
- `agent-base`: nova seção "Padrão Interface/Adapter" — regra transversal aplicada a todos os agents; define que toda funcionalidade nova define contrato/interface antes da implementação concreta
- `feature-module-agent`: novo artefato obrigatório `contracts.md` na pasta `specs/[###-slug]/`; workflow atualizado para aprovar `contracts.md` junto com `plan.md`
- `component-creation-agent`: workflow atualizado — step de definição de interface/contrato antes do código; "Não fazer" expandido
- `component-refactor-agent`: nova seção "Padrão Interface/Adapter na refatoração" — regras para extrair interfaces ao componentizar e refatorar integrações
- `improvement-agent`: regras obrigatórias expandidas — toda nova integração exige interface correspondente
- `bugfix-agent`: regras obrigatórias expandidas — fixes não bypassam contratos existentes
- `refactor-engineer`: nova seção "Padrão Interface/Adapter" + workflow atualizado para definir interfaces antes de extrações
- `write-tests`: nova regra — testar via interface/contrato, não via implementação concreta; sinalizar ausência de interface como débito

### Templates

- Novo template `contracts-template.md` — estrutura para definição de interfaces, adapters e componentes base em specs de feature

## v1.5.3

### Skills

- `project-init` e `collect-visual-references`: instalação do `ui-ux-pro-max` agora mencionada com comando para todos os agents (`claude codex copilot cursor windsurf gemini`)

## v1.5.2

### Skills / Agents

- `collect-visual-references`: integração opt-in com `ui-ux-pro-max` — se `skills/ui-ux-pro-max/` estiver presente no projeto, skill invoca o motor de busca para referências de estilo, cor e tipografia complementares
- `component-creation-agent`: menciona invocação opcional de `ui-ux-pro-max --design-system` antes do style-reference-scout
- `project-init`: saída final sugere instalação independente de `ui-ux-pro-max` para design intelligence completo

## v1.5.1

### Skills

- `project-init`: perguntas expandidas para 24 questões em 5 grupos, cada uma com sugestões guiadas (checkboxes/letras) + opção de descrever livremente; mapeamento explícito pergunta → seção da `constitution.md`; racional gerado automaticamente quando conteúdo for específico

## v1.5.0

### Skills

- `project-init` — nova skill que inicializa infraestrutura de contexto AI em qualquer projeto: cria `AGENTS.md`, `constitution.md`, `components-registry.md` e pasta `aicontext/` via entrevista guiada em 5 grupos de perguntas (identidade, stack, domínio, qualidade, convenções); detecta stack automaticamente e cria bridges para cada AI tool presente (Claude Code, Codex, Copilot, Cursor, Windsurf)
- Slash command registrado: `/ai-df-skill-project-init` (total: 25 slash commands)

### Templates

- `agents-template.md` — template base para `AGENTS.md` de projeto
- `constitution-template.md` — template base para `constitution.md` com 9 seções cobrindo tipagem, arquitetura, stack, domínio, segurança, qualidade e governança
- `components-registry-template.md` — template base para `components-registry.md` com tabela estruturada e tipos de componente
- `aicontext-index-template.md` — template base para `aicontext/README.md` com índice e convenções de manutenção

### Agents

- `bugfix-agent`: invoca `document-aicontext` quando fix altera comportamento observável
- `improvement-agent`: invoca `document-aicontext` quando melhoria altera comportamento público
- `component-creation-agent`: invoca `document-aicontext` após registro em `components-registry.md`
- `component-refactor-agent`: invoca `document-aicontext` quando mudança altera interface pública do módulo

### Skills (updates)

- `build-scope-map`: handoff agora inclui lista de candidatos para `components-registry.md` identificados durante mapeamento
- `run-audit-checklist`: checklist agora verifica se novo componente reutilizável foi registrado em `components-registry.md`

## v1.4.0

### CLI

- Novo canal de distribuição: `.claude-plugin/` manifest adicionado — framework agora installável via `claude plugin marketplace add alfredo-petri/ai-dev-framework && claude plugin install ai-dev-framework@ai-dev-framework` sem precisar de `npm install -g` + `link`
- `.claude-plugin/skills/` com 24 wrappers usando `${CLAUDE_PLUGIN_ROOT}` — slash commands disponíveis automaticamente após instalação como plugin
- `skill.json` adicionado na raiz — compatibilidade com ferramentas que usam formato universal de skill (uipro-cli, skills.sh, etc.)
- `update --offline` e `check-update --offline` — re-aplica arquivos locais e re-linka agentes sem acesso à rede
- Output colorido via ANSI codes (zero dependências adicionais): ✓ verde, ✗ vermelho, avisos amarelos, itens não detectados em dim
- Spinner animado durante `update` (npm install)
- CI `npm-publish.yml`: cria e faz push de tag `vX.Y.Z` no GitHub após publicação no npm

## v1.3.4

### CLI

- `link codex` e `link gemini` agora embute o conteúdo de `constitution.md` e `agents.md` diretamente no arquivo de instruções global (`AGENTS.md` / `GEMINI.md`), garantindo que o agente tenha as regras em contexto sem depender de leituras adicionais de arquivo
- `link codex` remove automaticamente `~/.codex/instructions.md` caso exista (arquivo obsoleto criado por versões < 1.3.2)
- `uninstall` também remove `~/.codex/instructions.md` obsoleto se presente
- `update` agora instala via npm registry (`@alfredo-petri/ai-dev-framework@latest`) em vez do GitHub diretamente, evitando divergência entre `npm install -g` e `update`
- Skill wrappers nativos (Codex, Copilot) incluem instrução de fallback indicando `ai-dev-framework install && link` caso o arquivo referenciado não exista

## v1.3.3

### CLI

- `link codex` agora também cria 24 skills nativas em `~/.codex/skills/<name>/SKILL.md`, além de injetar `~/.codex/AGENTS.md`
- `uninstall` remove os wrappers de skills criados para Codex e Copilot

## v1.3.2

### CLI

- Corrigido `link codex`: agora injeta o AI Dev Framework em `~/.codex/AGENTS.md`, arquivo carregado pelo Codex CLI atual, em vez de `~/.codex/instructions.md`

## v1.3.1

### Docs

- `CLAUDE.md` criado na raiz do repo com regras de release flow para Claude Code
- Regras de release adicionadas em `agents.md`, `.github/copilot-instructions.md`, `.cursor/rules/ai-dev-framework.mdc` e `.windsurfrules` — cobre Claude Code, Codex, Copilot IDE, Cursor e Windsurf neste repositório

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
