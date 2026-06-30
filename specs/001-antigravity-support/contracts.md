# Contracts — antigravity-support

**Status**: Implementado
**Feature**: `specs/001-antigravity-support/spec.md`

## Contrato `AGENTS`

Cada entrada de `AGENTS` em `bin/cli.js` segue o shape:

```javascript
{
  name: string,
  detect: () => boolean,
  link: () => void
}
```

Nova entrada: `antigravity`.

- `detect()` retorna true quando `agy` existe no PATH ou `~/.gemini/antigravity-cli/` existe.
- `link()` escreve `~/.gemini/antigravity-cli/AGENTS.md`.
- `link()` cria 26 symlinks em `~/.gemini/antigravity-cli/skills/`.

## Contrato `IDES`

Cada entrada de `IDES` em `bin/cli.js` segue o shape:

```javascript
{
  name: string,
  supportsGlobal: boolean,
  detectGlobal: () => boolean,
  linkGlobal: () => void,
  linkProject: (projectDir: string) => void
}
```

Nova entrada: `antigravityide`.

- `supportsGlobal` é `true`.
- `detectGlobal()` retorna true por `agy`, `/Applications/Antigravity IDE.app` ou `~/.gemini/antigravity-ide/`.
- `linkProject(projectDir)` escreve `.agent/rules/ai-dev-framework.md` e `.agent/workflows/*.md`.
- `linkGlobal()` escreve `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md` e workflows no mesmo diretório.

## Decisão de adaptação do PR

O PR original criava cópias nativas de skills para Antigravity CLI. No estado atual do repo, `~/.agents/skills/` é a fonte de verdade e Codex/Copilot recebem symlinks. Antigravity CLI segue esse contrato atual para evitar divergência de distribuição.
