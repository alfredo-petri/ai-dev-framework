# Plan — antigravity-support

**Status**: Implementado
**Feature**: `specs/001-antigravity-support/spec.md`

## Estratégia

1. Adicionar helper `createIDEWorkflowWrappers()` reaproveitando `SKILL_WRAPPERS`.
2. Adicionar `IDES.antigravityide` com suporte project/global.
3. Adicionar `AGENTS.antigravity` usando symlinks de skills.
4. Atualizar `uninstall`, `help`, README e `.gitignore`.
5. Registrar release patch em `CHANGELOG.md` e `package.json`.

## Riscos e mitigação

| Risco | Mitigação |
|------|-----------|
| PR antigo usa contagem 24/25 | Adaptar para 26 wrappers atuais |
| PR antigo parte de `v1.6.4` | Publicar como patch sobre `v1.7.0` |
| Diretório `.agent/` gerar sujeira local | Adicionar `.agent/` ao `.gitignore` |
| Antigravity CLI divergir de Codex/Copilot | Usar symlinks para `~/.agents/skills/` |

## Validação

- `node --check bin/cli.js`
- `node bin/cli.js help`
- `node bin/cli.js inject antigravityide`
- `node bin/cli.js inject --global antigravityide` quando detectado ou com diretório de teste disponível
- `git diff --check`
