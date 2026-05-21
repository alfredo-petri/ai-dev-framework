# emit-structured-output

**Tool**: Formatação e emissão do output canônico de agents e sub-agents.

## Uso

Último passo de todo agent e sub-agent. Garante que o output segue o contrato de saída comum do framework.

## Formato canônico

```
**Objetivo**: O que foi feito — uma linha descrevendo o resultado alcançado

**Contexto lido**: Arquivos e documentos consultados (constitution, agents.md, contextos de domínio, arquivos de código)

**Decisoes**: Escolhas técnicas e justificativas
- O que foi feito e por quê
- O que foi pulado e por quê
- Alternativas consideradas e descartadas

**Artefatos/Arquivos**: Arquivos criados, alterados ou analisados
- Criados: ...
- Alterados: ...
- Analisados: ...

**Riscos/Bloqueios**: Ambiguidades, dependências faltantes, aprovação necessária
- Se nenhum: "Nenhum bloqueio identificado"

**Proximos passos**: O que o próximo sub-agent ou o usuário deve fazer
```

## Campos obrigatórios por tipo de sub-agent

**scope-mapper**: Incluir arquivos em/fora de escopo e contratos sensíveis em `**Artefatos/Arquivos**`

**style-reference-scout**: Incluir padrões a repetir e divergências a evitar em `**Decisoes**`

**refactor-engineer**: Incluir handoff para test-engineer em `**Proximos passos**`

**test-engineer**: Incluir cenários cobertos/não cobertos e comandos executados em `**Artefatos/Arquivos**`

**quality-guardian**: Incluir veredicto (`aprovado` | `bloqueado`) no início de `**Decisoes**`

## Regras

- Não omitir nenhum campo — preencher com "Nenhum" quando não aplicável
- Não inventar resultados — reportar apenas o que foi realmente observado
- Achados de quality-guardian vêm antes de sumários
- Handoffs para o próximo sub-agent devem ser acionáveis e completos
