# Components Registry

Registro de todos os componentes reutilizáveis do projeto. Atualizar no mesmo changeset que cria ou refatora o componente.

## Componentes

| Componente | Localização | Tipo | Propósito | Props principais |
|---|---|---|---|---|
| — | — | — | — | — |

## Tipos de componente

| Tipo | Descrição |
|---|---|
| `ui` | Elementos visuais puros — botão, badge, avatar, input |
| `layout` | Estrutura de página — sidebar, navbar, container, grid |
| `form` | Entrada de dados — field, select, upload, datepicker |
| `data` | Exibição de dados — table, card, list, chart |
| `feedback` | Estados de sistema — loading, error, empty, toast |
| `composite` | Composição de vários primitivos — modal com form, drawer com lista |

## Convenções

- Componentes reutilizáveis entre features vivem em `components/` na raiz do projeto
- Componentes feature-local vivem em `src/features/<feature>/components/`
- Props tipadas com interface nomeada (`interface <Component>Props`)
- Sem lógica de negócio inline — extrair para hooks ou services
