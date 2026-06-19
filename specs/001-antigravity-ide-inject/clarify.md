# Clarify — antigravity-ide-inject

**Feature**: `specs/001-antigravity-ide-inject/spec.md`

---

## Decisões resolvidas

| # | Pergunta | Decisão | Fonte |
|---|----------|---------|-------|
| 1 | Qual arquivo o Antigravity IDE lê para regras por projeto? | `.agent/rules/**/*.md` | `/Applications/Antigravity IDE.app/Contents/Resources/app/extensions/antigravity/package.json` |
| 2 | Existe suporte a config global? | Sim — `~/.gemini/antigravity*/global_workflows/*.md` | Mesmo package.json |
| 3 | Usar `injectBlock` ou `writeCursorRule`? | `injectBlock` — Antigravity usa Markdown puro, sem frontmatter YAML | Análise do formato de rules |
| 4 | O projeto suporta TypeScript/interfaces formais? | Não — projeto é Node.js/JS puro; contrato é o shape do objeto IDES | `package.json` do repositório |
| 5 | O comando `uninstall` precisa ser atualizado para IDEs? | Não — o uninstall atual não remove arquivos de IDE, apenas de CLI agents | Análise de `bin/cli.js:568` |
| 6 | Criar nova branch ou continuar em `link-antigravity-cli`? | Continuar na mesma branch — mesma release v1.7.0, features relacionadas | Decisão do usuário |

---

## Exceção de contrato registrada

**Princípio**: Padrão Interface/Adapter obrigatório (constitution.md § VIII)

**Exceção aplicada**: O projeto é JavaScript puro sem TypeScript. O "contrato" da integração de IDE é o shape do objeto `IDES` (duck-typed). Não há interface formal a criar — a estrutura `{ name, supportsGlobal, detectGlobal, linkGlobal, linkProject }` já funciona como contrato implícito seguido por todos os IDEs existentes.

**Racional**: Constitution § I — "Use a stack real do projeto". Introduzir TypeScript ou classes abstratas para um objeto de configuração simples violaria o princípio de manutenibilidade sem ganho real.
