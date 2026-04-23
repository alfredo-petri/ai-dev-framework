# Agent Package — Overview

Pacote canônico de agentes. Neutro de ferramenta e modelo — funciona com qualquer LLM que suporte instruções estruturadas.

## Ordem de verdade

1. `constitution.md`
2. `agents.md`
3. Arquivo canônico do agente
4. Arquivos de contexto de domínio aplicáveis

## Agentes disponíveis

| Agente | Papel | Quando usar |
|--------|-------|-------------|
| `scope-mapper` | Mapeia escopo, contratos e arquivos antes de refatorar/testar/auditar | Quando a mudança cruza módulos, features ou tem escopo difuso |
| `style-reference-scout` | Coleta referências visuais antes de criar nova UI | Quando nova superfície visual com referências a componentes existentes |
| `refactor-engineer` | Refatora de forma conservadora com componentização e extração | Quando código tem múltiplas responsabilidades, lógica misturada com UI ou acoplamento real |
| `test-engineer` | Cria cobertura por matriz de risco | Após refatoração, feature ou bugfix com lógica relevante |
| `quality-guardian` | Auditor bloqueante de regressões, edge cases e violações de regra | Ao final de qualquer mudança real de código |

## Contrato de saída comum

Todos os agentes respondem com:

```
**Objetivo**: O que foi feito
**Contexto lido**: Arquivos e documentos consultados
**Decisoes**: Escolhas técnicas e justificativas
**Artefatos/Arquivos**: Arquivos criados, alterados ou analisados
**Riscos/Bloqueios**: Ambiguidades, dependências faltantes, aprovação necessária
**Proximos passos**: O que o próximo agente ou o usuário deve fazer
```

## Pipeline recomendado

```
scope-mapper (condicional)
  ↓
style-reference-scout (condicional)
  ↓
refactor-engineer
  ↓
test-engineer
  ↓
quality-guardian (gate final bloqueante)
```

### Quando usar cada agente

**scope-mapper**: Escopo difuso, mudança cruzando módulos/contratos, risco de tocar UI e API simultaneamente, contratos sensíveis.

**style-reference-scout**: Nova superfície visual, referências citadas pelo usuário, risco de divergência do padrão visual local.

**refactor-engineer**: Toda mudança real de código que envolva estruturação, extração ou componentização.

**test-engineer**: Toda mudança relevante de código — sem exceção.

**quality-guardian**: Gate final obrigatório em toda mudança real de código.

## Handoffs recomendados

### scope-mapper → refactor-engineer
- Escopo técnico sugerido
- Limites claros
- Contratos que não podem mudar
- Contextos que o próximo agente precisa abrir

### scope-mapper → style-reference-scout
- Arquivos de referência visual identificados
- Padrões suspeitos de divergência

### style-reference-scout → refactor-engineer
- Componentes de referência observados
- Classes e utilitários recorrentes
- Tokens e variáveis de tema
- Padrões de composição e espaçamento
- Divergências a evitar

### refactor-engineer → test-engineer
- Arquivos alterados
- Fluxos e estados que devem permanecer idênticos
- Novos componentes/hooks/services que precisam de cobertura
- Cenários de maior risco

### test-engineer → quality-guardian
- Testes criados
- Cenários cobertos
- Cenários não cobertos
- Dependências e mocks usados
- Comandos executados e resultados observados

## Cenários reais

### Componente grande com lógica mista
Pipeline: `refactor-engineer → test-engineer → quality-guardian`

### Nova UI com referências existentes
Pipeline: `style-reference-scout → refactor-engineer → test-engineer → quality-guardian`

### Route handler com transformações e validação
Pipeline: `scope-mapper → refactor-engineer → test-engineer → quality-guardian`

### Refatoração localizada e clara
Pipeline: `refactor-engineer → test-engineer → quality-guardian`
