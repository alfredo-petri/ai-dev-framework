# build-risk-matrix

**Skill**: Construção de matriz de risco para decisão de cobertura de testes.

## Quando usar

Invocada pelo sub-agent `test-engineer` após `read-project-context`. Usada para decidir quais tipos de teste criar para cada arquivo/fluxo alterado.

## Procedimento

1. Listar todos os arquivos e fluxos alterados
2. Para cada item, avaliar:
   - Complexidade da lógica introduzida ou modificada
   - Criticidade do fluxo (crítico ao negócio, frequência de uso, visibilidade)
   - Risco de regressão (quanto do comportamento existente pode quebrar)
   - Presença de side effects, estado compartilhado ou integrações externas
3. Classificar por tipo de teste necessário:

| Tipo | Quando aplicar |
|------|---------------|
| **Unit** | Utilitários puros, transformações, validações, lógica de hook isolada |
| **Componente** | Estados visíveis, interações do usuário, loading/empty/error/success, renderização condicional |
| **Integração** | Rotas, fluxos com persistência, contratos API/UI, side effects relevantes |

4. Identificar cenários negativos obrigatórios
5. Identificar gaps de infraestrutura de testes — se ausente, parar e perguntar antes de configurar

## Regras

- Cobertura mínima suficiente — não exagere, não omita o que importa
- Valide comportamento, não trivialidade de implementação
- Feature nova: caminho feliz + pelo menos um caso de borda relevante
- Fix: ao menos um teste de regressão que valide o comportamento corrigido
- Use o framework de testes configurado no projeto

## Saída esperada

Matriz contendo:
- Arquivo/fluxo → tipo de teste → cenários a cobrir
- Mocks necessários
- Cenários não cobertos e justificativa
- Gaps de infraestrutura identificados
