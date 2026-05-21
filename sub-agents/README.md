# Sub-agents — Visão Geral

Pacote canônico de sub-agents especializados. Neutro de ferramenta e modelo.

Sub-agents são invocados por agents (orchestrators). Cada sub-agent tem missão única, usa skills e tools para executar seu trabalho, e entrega output estruturado ao agent pai.

## Ordem de verdade

1. `constitution.md`
2. `agents.md`
3. Arquivo canônico do sub-agent
4. Arquivos de contexto de domínio aplicáveis

## Sub-agents disponíveis

| Sub-agent | Papel | Quando usar |
|-----------|-------|-------------|
| `scope-mapper` | Mapeia escopo, contratos e arquivos antes de refatorar/testar/auditar | Escopo difuso, mudança cruzando módulos ou contratos sensíveis |
| `style-reference-scout` | Coleta referências visuais antes de criar nova UI | Nova superfície visual com referências a componentes existentes |
| `refactor-engineer` | Refatora de forma conservadora com componentização e extração | Código com múltiplas responsabilidades, lógica misturada com UI ou acoplamento real |
| `test-engineer` | Cria cobertura por matriz de risco | Após refatoração, feature ou bugfix com lógica relevante |
| `quality-guardian` | Auditor bloqueante de regressões, edge cases e violações de regra | Ao final de qualquer mudança real de código |

## Contrato de saída comum

Todos os sub-agents respondem com:

```
**Objetivo**: O que foi feito
**Contexto lido**: Arquivos e documentos consultados
**Decisoes**: Escolhas técnicas e justificativas
**Artefatos/Arquivos**: Arquivos criados, alterados ou analisados
**Riscos/Bloqueios**: Ambiguidades, dependências faltantes, aprovação necessária
**Proximos passos**: O que o próximo sub-agent ou o usuário deve fazer
```

## Skills e tools comuns

Todos os sub-agents invocam:
- `skills/read-project-context.md` — primeiro passo obrigatório
- `tools/emit-structured-output.md` — último passo obrigatório

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

### Quando usar cada sub-agent

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
- Contextos que o próximo sub-agent precisa abrir

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
