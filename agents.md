# Agents Guide

Este arquivo define como agentes de IA devem atuar neste repositório. Ele deve ser mantido curto, explícito e atualizado.

## Ordem de precedência

1. [constitution.md](./constitution.md)
2. Este `agents.md`
3. Arquivos de contexto de domínio aplicáveis à área alterada
4. `README.md` e arquivos de configuração do projeto para comandos e setup reais

Se houver conflito relevante entre documentação, código e requisitos, pare e questione. Não preencha lacunas com suposições silenciosas.

## Regras operacionais

- Leia a [constituição](./constitution.md) antes de trabalho relevante.
- Identifique o domínio afetado e abra apenas os contextos necessários.
- Inspecione código, contratos e fluxos existentes antes de propor mudanças.
- Para features grandes, APIs e integrações, siga o fluxo `constitution → specification → planning → tasks → implementation`.
- Não faça mudanças silenciosas de contrato, payload, validação, erro ou comportamento documentado.
- Se houver qualquer dúvida ou ambiguidade de regra, arquitetura, contrato ou dados, questione o usuário antes de implementar.
- Mantenha documentação e contexto alinhados com o que foi realmente entregue.

## Stack e direção

Consulte o `README.md` e os arquivos de configuração do projeto para identificar a stack real em uso. Antes de introduzir qualquer tecnologia ou padrão, verifique o que já existe no repositório.

Direção obrigatória para novas mudanças:

- Use o sistema de design já adotado pelo projeto.
- Todo novo componente e toda refatoração de componente existente deve seguir o padrão de UI do projeto.
- Sempre separe lógica de interface.
- Lógica de negócio, transformações, regras e estado não trivial devem ficar em hooks, services ou funções auxiliares.
- Componentes devem focar em renderização e orquestração simples.
- Use tipagem explícita. `any` e equivalentes só com justificativa documentada.
- Novas dependências só com justificativa técnica clara.

## Testes

- Sempre crie testes com o framework de testes do projeto para novo código relevante.
- Regras de negócio pedem teste automatizado.
- Comportamento visível de UI pede teste de componente.
- APIs e fluxos com persistência pedem teste de integração quando aplicável.
- Não omita testes só porque a base atual ainda não está pronta. Ajuste a infraestrutura necessária ou questione o usuário se isso ampliar materialmente o escopo.
- Não afirme validações ou execuções que não aconteceram de fato.

## Componentes

- Siga a arquitetura orientada a componentes da [constituição](./constitution.md).
- Evite lógica de negócio dentro de componentes de UI.
- Prefira organização por feature com `components/`, `hooks/`, `types/` e `services/`.
- Componentes reutilizáveis entre features devem viver em `components/`.
- Todo novo componente criado deve ser registrado em [components-registry.md](./components-registry.md) no mesmo change set.

## Mapa de contexto

Abra apenas os arquivos de contexto necessários ao domínio alterado. Prefira contextos específicos do domínio ao contexto geral quando ambos existirem.

Identifique no projeto os arquivos de contexto disponíveis para:
- Visão geral e workflow de desenvolvimento
- Domínios funcionais específicos (ex: autenticação, notificações, integrações)
- Padrões de IA e agentes
- Integrações externas

## Entrega e manutenção

- Atualize documentação e contexto afetados quando comportamento, fluxo ou contrato mudarem.
- Atualize este `agents.md` imediatamente se comandos de build, workflow ou regras operacionais mudarem.
- Prefira linkar documentação já existente em vez de duplicar texto longo.
- Se a mudança introduzir novo padrão reutilizável, reflita isso na documentação apropriada do repositório.
