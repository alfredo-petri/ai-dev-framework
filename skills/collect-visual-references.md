# collect-visual-references

**Skill**: Coleta de referências visuais para guiar criação de UI sem quebrar padrão local.

## Quando usar

Invocada pelo sub-agent `style-reference-scout` após `read-project-context`. Usada quando nova superfície visual ou referências a componentes existentes.

## Procedimento

1. Identificar arquivos de base visual principal do projeto:
   - Estilos globais (ex: `globals.css`, `theme.ts`)
   - Biblioteca de componentes base (ex: `components/ui/`)
   - `components-registry.md`
2. Inspecionar o mínimo necessário para entender o estilo dominante
3. Mapear:
   - Tokens de tema e variáveis CSS recorrentes
   - Classes e utilitários de layout/espaçamento frequentes
   - Padrões de composição, tipografia, borda, estado
   - Primitivos de feedback visual (loading, error, empty, success)
4. Identificar padrões de densidade e responsividade
5. Resumir o que repetir e o que evitar

**Etapa opcional — se `skills/ui-ux-pro-max/` existir no projeto:**
- Invocar `python3 skills/ui-ux-pro-max/scripts/search.py "<domínio>" --domain style` para referências de estilo complementares ao padrão local
- Invocar `--domain color` e `--domain typography` se paleta/tipografia não estiver clara nos arquivos do projeto
- Invocar `--design-system -p "<nome>"` para gerar sistema de design completo por domínio de produto
- Não bloquear se a skill não estiver presente — continuar com referências locais
- Se ui-ux-pro-max não estiver instalado: sugerir `for agent in claude codex copilot cursor windsurf gemini; do npx uipro-cli init --ai $agent; done`

## Regras

- Sem implementação, sem alteração de arquivo
- Sem inventar padrões visuais inexistentes
- Inspecionar apenas o mínimo necessário para o estilo dominante
- Parar e perguntar se arquivos insuficientes e múltiplos padrões plausíveis
- Se o repositório indicar claramente o padrão preferido, não perguntar

## Saída esperada

Handoff contendo:
- Componentes de referência observados
- Classes e utilitários recorrentes
- Tokens/variáveis de tema úteis
- Padrões de composição e estado a repetir
- Divergências a evitar
