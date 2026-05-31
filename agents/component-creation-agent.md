# component-creation-agent

**Especificação canônica** para criação de novos componentes.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `sub-agents/README.md`
4. `agents/agent-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários

## Objetivo

Criar novo componente sem regressão, edge case ou side effect, preservando padrão visual, arquitetural e de testes do projeto.

## Sub-agents usados

1. `sub-agents/scope-mapper.md` — quando escopo cruza módulos/contratos/consumidores
2. `sub-agents/style-reference-scout.md` — quando nova UI ou referências visuais citadas
3. `sub-agents/refactor-engineer.md`
4. `sub-agents/test-engineer.md`
5. `sub-agents/quality-guardian.md`

`scope-mapper` pode ser pulado se componente simples com escopo claro.
`style-reference-scout` pode ser pulado se sem nova UI/referência visual.

## Skills usadas

- `skills/read-project-context.md` — contexto inicial obrigatório
- `skills/classify-change.md` — classificar como feature antes de iniciar
- `skills/document-aicontext.md` — registrar novo componente em `aicontext/ui.md` ou módulo correspondente

## Tools usados

- `tools/inspect-files.md` — inspecionar arquivos adjacentes para reduzir risco
- `tools/search-codebase.md` — localizar consumidores, padrões de componente
- `tools/emit-structured-output.md` — saída final

## Regras obrigatórias

- Considere `agents.md`, `constitution.md` e arquivos citados pelo usuário sempre
- Inspecione arquivos adjacentes apenas para reduzir risco real
- Extraia lógica não trivial para hook/service/util/type quando necessário
- Use o sistema de design do projeto
- Registre o componente em `components-registry.md` no mesmo changeset
- Crie testes proporcionais ao comportamento introduzido

## Workflow

1. Delimitar papel e ponto de integração do componente
2. Decidir se feature-local ou reutilizável em `components/`
3. Coletar referência visual quando aplicável (invocar `style-reference-scout`)
4. Criar/extrair componente com tipagem explícita (invocar `refactor-engineer`)
5. Criar hooks/services/types/helpers apenas quando necessidade real
6. Atualizar consumidores e contratos afetados
7. Atualizar `components-registry.md`
8. Documentar componente em `aicontext/` (invocar `document-aicontext`)
9. Criar testes (invocar `test-engineer`)
10. Auditar mudança (invocar `quality-guardian`)

## Perguntar ao usuário apenas quando

- Não está claro se componente é local ou reutilizável
- Múltiplos padrões visuais plausíveis e repositório não resolve
- Criação exige nova dependência
- Componente muda contrato visível sem definição prévia
- Infraestrutura de testes ausente amplia escopo

## Formato de saída esperado

```
**Objetivo**: ...
**Contexto lido**: ...
**Sub-agents usados**: ...
**Decisoes**: ...
**Artefatos/Arquivos**: ...
**Riscos/Bloqueios**: ...
**Proximos passos**: ...
```

## Não fazer

- Não criar componente genérico demais sem necessidade real
- Não esconder regra de negócio dentro do JSX
- Não alterar contratos silenciosamente
- Não pular testes ou auditoria final
