# Spec — antigravity-support

**Criado em**: 2026-06-30
**Status**: Implementado
**Origem**: PR #2 (`link-antigravity`) de @ildopetrijunior, adaptado ao estado atual do repositório em `v1.7.0`.

## Objetivo

Adicionar suporte nativo ao Antigravity CLI (`agy`) e ao Antigravity IDE no `ai-dev-framework`, preservando o padrão atual de distribuição de 26 wrappers e a fonte de verdade em `~/.agents/skills/`.

## Escopo

Em escopo:

- `link antigravity`: injetar `AGENTS.md` em `~/.gemini/antigravity-cli/AGENTS.md`.
- `link antigravity`: criar 26 symlinks de skills em `~/.gemini/antigravity-cli/skills/`, seguindo o padrão atual de `codex` e `copilot`.
- `inject antigravityide`: injetar regras por projeto em `.agent/rules/ai-dev-framework.md`.
- `inject antigravityide`: criar 26 workflow wrappers em `.agent/workflows/`.
- `inject --global antigravityide`: injetar regras e workflows em `~/.gemini/antigravity-ide/global_workflows/`.
- Detectar Antigravity via `agy`, `/Applications/Antigravity IDE.app`, `~/.gemini/antigravity-cli/` ou `~/.gemini/antigravity-ide/`.
- Atualizar README, CHANGELOG, help e uninstall.

Fora de escopo:

- Alterar o formato dos wrappers existentes.
- Mudar a fonte de verdade `~/.agents/skills/`.
- Fazer merge direto do PR antigo, pois ele parte de `1.6.4` e contagens obsoletas.

## Contratos

### `AGENTS.antigravity`

Shape esperado:

```javascript
{
  name: 'Antigravity CLI',
  detect: () => boolean,
  link: () => void
}
```

`link()` deve:

- Escrever o bloco completo do framework em `~/.gemini/antigravity-cli/AGENTS.md`.
- Criar wrappers nativos por symlink em `~/.gemini/antigravity-cli/skills/`.

### `IDES.antigravityide`

Shape esperado:

```javascript
{
  name: 'Antigravity IDE',
  supportsGlobal: true,
  detectGlobal: () => boolean,
  linkGlobal: () => void,
  linkProject: (projectDir) => void
}
```

`linkProject()` deve:

- Escrever `.agent/rules/ai-dev-framework.md`.
- Criar `.agent/workflows/<wrapper>.md` para cada item em `SKILL_WRAPPERS`.

`linkGlobal()` deve:

- Escrever `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md`.
- Criar workflows no mesmo diretório.

## Critérios de aceite

- `node bin/cli.js help` lista `antigravity` e `antigravityide`.
- `node bin/cli.js inject antigravityide` cria regra e 26 workflows no projeto.
- `node bin/cli.js inject --global antigravityide` cria regra e 26 workflows globais quando Antigravity é detectado.
- `node bin/cli.js link antigravity` cria `AGENTS.md` e 26 symlinks de skills.
- `node --check bin/cli.js` passa.
