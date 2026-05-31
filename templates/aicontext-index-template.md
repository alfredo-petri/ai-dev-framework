# AI Context — [Nome do Projeto]

Arquivos de contexto para orientar implementações, refatorações e correções.

Ler este índice + o arquivo do módulo afetado antes de qualquer trabalho relevante.

## Quando consultar

| Arquivo | Consultar quando... |
|---|---|
| `aicontext/<modulo>.md` | Implementar ou alterar funcionalidades do módulo |

## Estrutura de cada arquivo

```markdown
# <Nome do Módulo>

## Features

### <Nome da Feature>
<Comportamento esperado, inputs, outputs, regras de negócio relevantes.>

## Fixes

### <Título do Fix>
<Comportamento CORRETO após o fix. Não descrever o bug — descrever o funcionamento esperado atual.>

## Contratos

<Interfaces TypeScript, schemas, formatos de payload relevantes para o módulo.>
```

## Módulos

[lista de links — gerada pela skill project-init com base nos módulos informados]

## Manutenção

- Atualizar após cada feature entregue (`document-aicontext` skill)
- Atualizar após cada fix que muda comportamento visível
- Não atualizar para fixes internos sem mudança observável
