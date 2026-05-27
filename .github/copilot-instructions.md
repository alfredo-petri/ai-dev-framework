
<!-- ai-dev-framework -->
## AI Dev Framework

Global AI development framework installed at `/home/alfredopetri/.ai-dev-framework`.

- Constitution : `/home/alfredopetri/.ai-dev-framework/constitution.md`
- Agents       : `/home/alfredopetri/.ai-dev-framework/agents/`
- Sub-agents   : `/home/alfredopetri/.ai-dev-framework/sub-agents/`
- Skills       : `/home/alfredopetri/.ai-dev-framework/skills/`
- Tools        : `/home/alfredopetri/.ai-dev-framework/tools/`
- Templates    : `/home/alfredopetri/.ai-dev-framework/templates/`
<!-- ai-dev-framework -->

## Release flow — obrigatório

Sempre que houver mudança que justifique nova versão npm:

1. Bumpar versão em package.json: `npm version patch|minor|major`
2. Adicionar entrada `## vX.Y.Z` no CHANGELOG.md
3. Commitar: `git add package.json CHANGELOG.md && git commit -m "chore(release): vX.Y.Z"`
4. Push — a Action npm-publish publica automaticamente

Nunca rodar `npm publish` manualmente. A Action bloqueia se CHANGELOG não tiver a entrada da versão atual.

### O que atualizar por tipo de mudança

| Mudança | Versão | README | CHANGELOG |
|---------|--------|--------|-----------|
| Nova skill / agent / sub-agent | minor | sim — seção + contador slash commands | sim |
| Novo comando CLI | minor | sim — tabela de comandos | sim |
| Nova IDE | minor | sim — tabela IDE plugins | sim |
| Bug fix | patch | só se visível ao usuário | sim |
| Docs | patch | sim | sim |
| CI / Actions | patch | sim — seção CI | sim |

Após adicionar item em SKILL_WRAPPERS: atualizar contagem de slash commands no README (2 lugares) e no CHANGELOG.
