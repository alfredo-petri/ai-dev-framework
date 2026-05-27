# ai-dev-framework — Project Rules

## Release flow

Every change that warrants a new npm version MUST follow this sequence. Never skip steps.

### 1. Bump version in package.json

```bash
npm version patch   # bug fixes, docs, minor adjustments  (1.3.0 → 1.3.1)
npm version minor   # new features, new skills/agents/IDEs (1.3.0 → 1.4.0)
npm version major   # breaking changes                     (1.3.0 → 2.0.0)
```

### 2. Add CHANGELOG.md entry for the new version

The entry MUST match the version in `package.json` exactly:

```markdown
## v1.3.1

### CLI
- description of change
```

If no CHANGELOG entry exists for the current version, the `npm-publish` Action will fail and block the release.

### 3. Commit and push

```bash
git add package.json CHANGELOG.md
git commit -m "chore(release): vX.Y.Z"
git push
```

The `npm-publish` GitHub Action triggers automatically on push to `master` and publishes to npm if all checks pass.

### Rules

- Never run `npm publish` manually
- Never push to `master` with a bumped version without a CHANGELOG entry
- README.md must never be empty — Action validates this before publishing
- Commit message for release: `chore(release): vX.Y.Z`

---

## What to update on each change type

| Change | package.json | CHANGELOG | README |
|--------|-------------|-----------|--------|
| New skill / agent / sub-agent | `minor` | required | add to Skills/Agents section + slash commands list |
| New CLI command | `minor` | required | add to Comandos disponíveis table |
| New IDE support | `minor` | required | add to IDE plugins table |
| Bug fix | `patch` | required | only if behavior visible to user |
| Docs only | `patch` | required | yes |
| GitHub Actions / CI | `patch` | required | add to CI section if user-facing |

---

## Slash command count

After adding a new skill/agent/sub-agent to `SKILL_WRAPPERS` in `bin/cli.js`, update the slash command count in:
- `README.md` — "X slash commands ficam disponíveis" (two places: agents table + slash commands section)
- `CHANGELOG.md` — note the new total in the entry
