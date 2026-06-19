# Contracts — antigravity-ide-inject

**Criado em**: 2026-06-19
**Status**: Draft
**Feature**: `specs/001-antigravity-ide-inject/spec.md`

---

## Visão geral

Esta feature adiciona uma nova entrada ao objeto `IDES` em `bin/cli.js`. Não introduz novas interfaces, classes ou módulos — estende um objeto de configuração existente seguindo o shape já estabelecido pelos outros IDEs.

---

## Contrato existente: shape do objeto IDES

O objeto `IDES` é o contrato central desta feature. Cada entrada deve satisfazer o seguinte shape (contrato implícito, JavaScript puro):

```javascript
{
  name: string,                        // Nome legível do IDE
  supportsGlobal: boolean,             // Suporta config global?
  detectGlobal: () => boolean,         // Detecta se o IDE está instalado
  linkGlobal: () => void | null,       // Injeta na config global
  linkProject: (projectDir: string) => void  // Injeta na config do projeto
}
```

**Funções reutilizadas (sem modificação):**

| Função | Localização | Responsabilidade |
|--------|-------------|-----------------|
| `injectBlock(filePath, content)` | `bin/cli.js:51` | Injeta/atualiza bloco Markdown com markers HTML |
| `frameworkBlock()` | `bin/cli.js:62` | Retorna o conteúdo padrão do framework |
| `commandExists(cmd)` | `bin/cli.js` | Verifica se um comando existe no PATH |

---

## Nova entrada: `IDES.antigravityide`

**Arquivo**: `bin/cli.js` — dentro do objeto `IDES` (após entrada `windsurf`)

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

---

## Contratos que NÃO mudam

- `injectBlock()` — não modificado
- `frameworkBlock()` — não modificado
- Nenhuma entrada existente no objeto `IDES` é alterada
- Comportamento dos comandos `link`, `uninstall`, `status` não é afetado

---

## Decisões de design

| Decisão | Racional |
|---------|---------|
| Usar `injectBlock` em vez de `writeCursorRule` | Antigravity IDE usa Markdown puro sem frontmatter YAML |
| `supportsGlobal: true` | IDE lê `~/.gemini/antigravity*/global_workflows/*.md` |
| Detecção via app path + data dir | Cobre instalação via App Store/DMG e usuários que já usaram o IDE sem necessariamente ter no PATH |
| Não atualizar `uninstall` | Comportamento atual não remove arquivos de IDE; manter consistência |

---

## Perguntas abertas

Nenhuma.
