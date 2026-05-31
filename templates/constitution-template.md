# Constitution — [Nome do Projeto]

**Version**: 1.0.0 | **Status**: Active

Este documento define princípios imutáveis. Prevalece sobre qualquer convenção local, pressão de prazo ou preferência situacional. Em conflito com qualquer outro contexto, este prevalece.

---

## I. Finalidade e Domínio

[Finalidade do projeto em 1-2 frases. Público-alvo. Tipo.]

**Racional**: Define o norte de todas as decisões técnicas e de produto.

---

## II. Tipagem e Qualidade de Código

- [Linguagem tipada com strict mode? Restrições de `any`/`@ts-ignore`/equivalente?]
- [Padrão de nomenclatura: componentes (PascalCase?), arquivos (kebab-case?), hooks (use*?), tipos/interfaces]
- [Código autoexplicativo — comentários só para o "porquê", nunca o óbvio]

**Racional**: [por que estas regras importam para este projeto]

---

## III. Arquitetura e Separação de Responsabilidades

- [Onde fica lógica de negócio? (hooks, services, domain layer)]
- [Estrutura de pastas: por feature? por tipo? monorepo?]
- [Componentes: só renderização e orquestração — sem lógica de negócio inline]
- [Diretórios protegidos/imutáveis que não podem ser modificados diretamente: ex. `core/`, `shared/`]

**Racional**: [por que esta separação importa neste projeto]

---

## IV. Stack Oficial

- **Linguagem**: [linguagem + versão]
- **Framework**: [framework + versão]
- **UI/Design**: [sistema de design / biblioteca de componentes]
- **Dados**: [banco de dados + ORM/ODM]
- **Estado de servidor**: [React Query / SWR / Redux / nenhum]
- **Auth**: [Clerk / NextAuth / JWT / OAuth / sem auth]
- **Testes**: [framework de testes]
- **Observabilidade**: [Sentry / Datadog / logs estruturados / nenhum]

Qualquer desvio DEVE ser documentado no `plan.md` da feature com justificativa e trade-offs explícitos.

---

## V. Regras de Domínio Imutáveis

[Regras de negócio que nunca mudam. Ex:]
- [dados de usuário nunca deletados fisicamente]
- [toda transação tem audit log]
- [preços sempre em centavos/menor unidade monetária]
- [toda ação destrutiva exige confirmação explícita]

**Racional**: [por que estas regras existem]

---

## VI. Segurança e Integridade de Contrato

- [Nenhum segredo commitado — toda config sensível via variáveis de ambiente]
- [Restrições de autenticação/autorização por rota]
- [Validação de input: cliente E servidor]
- [Contratos que não podem quebrar: ex. "API v1 nunca quebra BC", "schema de DB versionado com migrations"]

---

## VII. Qualidade, Testes e Fluxo

- **Commits**: [padrão — ex. conventional commits em PT]
- **Testes**: toda funcionalidade relevante tem cobertura automatizada; fixes visíveis têm teste de regressão
- **PR/code review**: [checklists obrigatórios, cobertura mínima se definida]
- **Fluxo**: spec → plan → tasks → implementation — nenhuma implementação começa sem spec e plan aprovados

---

## VIII. Registro e Documentação

- Novos componentes reutilizáveis → registrar em `components-registry.md` no mesmo changeset
- Novos módulos/features → documentar em `aicontext/<modulo>.md`
- Contratos alterados → atualizar spec antes de implementar

---

## IX. Governança

Este documento é alterado apenas por decisão explícita com justificativa e impacto documentados. Qualquer exceção (uso de `any`, mudança na stack, alteração em diretório protegido) DEVE ser documentada no `spec.md` e `plan.md` da feature, com estratégia clara de reversão ou mitigação.
