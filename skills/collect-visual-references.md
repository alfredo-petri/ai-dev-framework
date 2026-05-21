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
