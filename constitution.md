# Constitution — Engineering Principles

**Version**: 1.0.0  
**Status**: Active

Este documento define princípios de engenharia estáveis e permanentes. Ele prevalece sobre qualquer convenção local, preferência situacional ou pressão de prazo.

---

## I. Maintainability First

Manutenibilidade é o critério primário de decisão técnica. Clareza antes de velocidade. Aderência arquitetural antes de conveniência. Toda mudança deve deixar o código mais fácil de entender e modificar — ou, no mínimo, não mais difícil.

## II. Tipagem Explícita

Todo código novo deve ser escrito na linguagem tipada adotada pelo projeto, com modo estrito habilitado. `any` e equivalentes (`@ts-ignore`, type assertions desnecessárias) só com justificativa documentada. Tipos devem descrever o que o código faz — não o que seria conveniente aceitar.

## III. Arquitetura Orientada a Componentes

Componentes de UI focam em renderização e orquestração simples. Lógica de negócio, transformações, regras e estado não trivial ficam em hooks, services ou funções auxiliares. Cada feature organiza seus artefatos em pastas coesas com `components/`, `hooks/`, `types/` e `services/`. Componentes reutilizáveis entre features vivem em `components/` na raiz.

## IV. Excelência de Experiência de Usuário

Design responsivo é obrigatório. Estados de loading, erro e vazio são parte do contrato — não são opcionais. Mensagens de erro devem ser acionáveis. Ações destrutivas ou irreversíveis exigem confirmação explícita.

## V. Performance como Requisito de Produto

Otimize onde performance afeta materialmente a UX, escala ou custo de renderização. Estados de loading são obrigatórios para operações assíncronas perceptíveis (> 200ms). Não otimize prematuramente — meça primeiro.

## VI. Auditabilidade e Observabilidade

Siga os padrões de observabilidade já estabelecidos no projeto. Não introduza logging ou rastreamento ad hoc fora do padrão. Garanta que falhas e estados inesperados sejam registrados de forma rastreável.

## VII. Integridade de Contrato

Contratos são a fonte da verdade. Alterações silenciosas de contrato, payload, validação ou comportamento documentado são proibidas. Ambiguidade de contrato bloqueia implementação — questione antes de assumir.

## VIII. Padrão Interface/Adapter

Toda integração, serviço, repositório ou abstração nova segue o padrão interface/adapter:

1. **Contrato primeiro** — interface ou classe base abstrata define o comportamento antes de qualquer implementação concreta
2. **Implementação como adapter** — toda classe concreta é um adapter que satisfaz o contrato
3. **Consumo pelo contrato** — código consumidor referencia a interface, nunca a implementação direta

Este princípio se aplica a: conexões com banco de dados, clientes HTTP, serviços externos, gateways de pagamento, repositórios de dados, componentes com variantes, qualquer ponto de extensão previsto.

Exceção documentada: lógica trivial local sem integração ou extensão prevista — decisão deve ser registrada em `clarify.md` da spec correspondente.

---

## Padrões Técnicos

### Stack e ferramentas

Use a stack real do projeto conforme definida em seu `README.md`, `package.json` ou equivalente. Antes de qualquer mudança, verifique:
- Framework web e versão em uso
- Sistema de design e biblioteca de componentes adotados
- Framework de testes configurado
- Camada de dados e ORM em uso

Não traga dependências novas sem justificativa técnica clara e comparação com alternativas.

### Código Frontend

- Sem `var` — use `const` e `let`
- Sem `==` / `!=` — use `===` / `!==`
- Prefira arrow functions
- Sem definições de função inline dentro de JSX quando causam re-render desnecessário
- Sem manipulação direta do DOM quando o framework gerencia o ciclo de vida

### Estrutura

- Pastas orientadas a feature, com artefatos colocados juntos
- Componentes reutilizáveis entre features → `components/` na raiz
- Lógica de negócio → hooks, services, utils, helper functions
- Tipos e interfaces → `types/` ou arquivo dedicado por domínio
- Interfaces/contratos → arquivo dedicado por domínio (ex: `IUserRepository.ts`)
- Adapters/implementações concretas → `adapters/` dentro do módulo ou domínio

---

## Padrões de Testes

| Tipo | Quando usar |
|------|-------------|
| **Unit** | Utilitários, transformações, validações, lógica de hook isolada |
| **Componente** | Estados visíveis, interações do usuário, loading/empty/error/success, renderização condicional |
| **Integração** | Rotas, fluxos com persistência, contratos API/UI, side effects relevantes |
| **E2E** | Jornadas críticas do usuário |

Toda regra de negócio relevante exige cobertura automatizada. Testes ausentes em código de risco tratam a mudança como incompleta.

---

## Fluxo de Documentação

Para features, APIs e integrações relevantes, siga na ordem:

1. **Specification** — O que precisa ser feito, em linguagem de produto
2. **Contracts** — Interfaces, adapters e contratos que a feature define (obrigatório quando há integração ou extensão)
3. **Planning** — Como será feito, em linguagem técnica
4. **Tasks** — Lista acionável derivada do plano aprovado
5. **Implementation** — Execução alinhada à spec, contratos e plano

Nenhuma implementação começa sem spec, contratos e plano aprovados. Use os templates em `templates/`.

---

## Registro de Componentes

Todo novo componente criado deve ser registrado em [components-registry.md](./components-registry.md) no mesmo changeset, com localização, tipo (reutilizável / feature-local), propósito e props principais.

---

## Governança

Este documento é alterado apenas por decisão explícita. Conflito entre este documento e qualquer outro contexto é resolvido sempre em favor deste. Para propor emenda, documente a motivação e o impacto antes de aplicar.
