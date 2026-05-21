# classify-change

**Skill**: Classificação do tipo de mudança antes de iniciar implementação.

## Quando usar

Primeiro passo de agents que iniciam implementação (`bugfix-agent`, `component-creation-agent`, `feature-module-agent`, `improvement-agent`). Executar após `read-project-context`.

## Procedimento

1. Analisar o prompt/objetivo recebido
2. Identificar palavras-chave e intenção:

| Indicadores | Classificação |
|------------|---------------|
| "corrigir", "fix", "bug", "erro", "falha", "quebrado", "incorreto" | **fix** |
| "adicionar", "implementar", "criar", "novo", "feature", "módulo" | **feature** |
| "melhorar", "refatorar", "otimizar", "reorganizar", "extrair" | **improvement** |
| "componente", "criar componente", "extrair componente" | **component** |

3. Quando ambíguo, preferir classificação mais conservadora (fix > improvement > feature)
4. Registrar classificação e razão

## Saída esperada

Classificação: `fix` | `feature` | `improvement` | `component`
Razão: palavras-chave ou contexto que levou à classificação.
