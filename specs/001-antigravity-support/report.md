# Report — antigravity-support

**Status**: Implementado localmente
**Crédito**: baseado no PR #2 de @ildopetrijunior, com adaptação ao estado atual do repositório.

## Entregue

- `link antigravity` para Antigravity CLI.
- `inject antigravityide` para regras e workflows por projeto.
- `inject --global antigravityide` para regras e workflows globais.
- Cleanup de skills do Antigravity CLI no `uninstall`.
- `.agent/` ignorado pelo Git.
- README atualizado com Antigravity CLI e Antigravity IDE.

## Diferenças contra o PR #2

- Versão não foi reaplicada como `v1.7.0`; o repo já está em `v1.7.0`, então a publicação será minor (`v1.8.0`) por adicionar novo CLI target e nova IDE.
- Contagens foram ajustadas de 24/25 para 26 wrappers.
- Antigravity CLI usa symlinks, seguindo o padrão atual pós `v1.6.5`.
- A spec foi consolidada em `specs/001-antigravity-support/`.
