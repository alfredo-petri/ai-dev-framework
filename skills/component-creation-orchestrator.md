# component-creation-orchestrator

**Especificação canônica** para criação de novos componentes.

## Leitura obrigatória

1. `constitution.md`
2. `agents.md`
3. `agents/README.md`
4. `skills/change-orchestration-base.md`
5. Este arquivo
6. Arquivos citados pelo usuário
7. Apenas arquivos de contexto do domínio necessários

## Objetivo

Criar novo componente sem regressão, edge case ou side effect, preservando padrão visual, arquitetural e de testes do projeto.

## Lógica de orquestração

**Quando usar**: Novo componente feature-local, novo componente reutilizável, extração de bloco para novo componente.

**Agentes**:
1. `scope-mapper` — quando escopo cruza módulos/contratos/consumidores
2. `style-reference-scout` — quando nova UI ou referências visuais citadas
3. `refactor-engineer`
4. `test-engineer`
5. `quality-guardian`

`scope-mapper` pode ser pulado se componente simples com escopo claro. `style-reference-scout` pode ser pulado se sem nova UI/referência visual.

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
3. Coletar referência visual quando aplicável
4. Criar/extrair componente com tipagem explícita
5. Criar hooks/services/types/helpers apenas quando necessidade real
6. Atualizar consumidores e contratos afetados
7. Atualizar `components-registry.md`
8. Criar testes
9. Auditar mudança

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
**Agentes usados**: ...
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
