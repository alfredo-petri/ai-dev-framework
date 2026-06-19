# Implement — antigravity-ide-inject

**Feature**: `specs/001-antigravity-ide-inject/spec.md`
**Plano**: `specs/001-antigravity-ide-inject/plan.md`
**Contratos**: `specs/001-antigravity-ide-inject/contracts.md`

---

## Guia de execução

### Passo 1 — `bin/cli.js`: adicionar entrada no objeto `IDES`

**Localização**: após o fechamento da entrada `windsurf` (linha ~286), antes do fechamento de `IDES` (linha ~287)

Inserir:

```javascript
  antigravityide: {
    name: 'Antigravity IDE',
    supportsGlobal: true,
    detectGlobal: () =>
      fs.existsSync('/Applications/Antigravity IDE.app') ||
      fs.existsSync(path.join(os.homedir(), '.gemini', 'antigravity-ide')),
    linkGlobal() {
      const target = path.join(
        os.homedir(), '.gemini', 'antigravity-ide', 'global_workflows', 'ai-dev-framework.md'
      );
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
    },
    linkProject(projectDir) {
      const target = path.join(projectDir, '.agent', 'rules', 'ai-dev-framework.md');
      injectBlock(target, frameworkBlock());
      console.log(`  ${c.green('✓')} ${target}`);
    },
  },
```

### Passo 2 — `bin/cli.js`: atualizar help text

**Localização**: seção `IDEs (inject):` no help text (~linha 662), após a linha do `windsurf`

Adicionar:

```
  antigravityide   Antigravity IDE  (.agent/rules/ai-dev-framework.md)
```

### Passo 3 — `CHANGELOG.md`: atualizar entrada v1.7.0

Na seção `### CLI` da entrada `## v1.7.0`, adicionar:

```markdown
- Novo IDE `antigravityide` — `inject antigravityide` injeta o framework em `.agent/rules/ai-dev-framework.md` (projeto) e `~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md` (global)
```

### Passo 4 — `README.md`: adicionar na tabela de IDEs

Localizar a tabela de IDEs suportados e adicionar linha para `antigravityide`.

---

## Verificação pós-implementação

```bash
# SC-001: inject por projeto
node bin/cli.js inject antigravityide
cat .agent/rules/ai-dev-framework.md

# SC-002: inject global
node bin/cli.js inject --global antigravityide
cat ~/.gemini/antigravity-ide/global_workflows/ai-dev-framework.md

# SC-003: idempotência
node bin/cli.js inject antigravityide
node bin/cli.js inject antigravityide
grep -c 'ai-dev-framework' .agent/rules/ai-dev-framework.md  # deve retornar 2 (os 2 markers)

# SC-004: inject sem argumento inclui antigravityide
node bin/cli.js inject 2>&1 | grep antigravity

# SC-005: help
node bin/cli.js help | grep antigravityide
```
