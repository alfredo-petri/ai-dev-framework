# Contracts — [feature-slug]

**Criado em**: YYYY-MM-DD  
**Status**: Draft  
**Feature**: [link para spec.md]

---

## Visão geral

[Quais integrações, serviços ou abstrações esta feature introduz ou modifica. Uma linha por contrato.]

---

## Interfaces / Contratos

### `I[NomeDoContrato]`

**Arquivo proposto**: `src/[domínio]/[NomeDoContrato].ts`  
**Responsabilidade**: [o que representa — sem mencionar tecnologia]

```typescript
interface I[NomeDoContrato] {
  // métodos e assinaturas
}
```

**Adapters previstos**:
| Adapter | Tecnologia | Arquivo proposto |
|---------|-----------|-----------------|
| `[NomeAdapter]` | [ex: PostgreSQL, Redis, Stripe] | `src/[domínio]/adapters/[NomeAdapter].ts` |

---

<!-- Repetir bloco acima para cada interface adicional -->

---

## Componentes base / abstratos

### `[BaseComponentName]`

**Arquivo proposto**: `src/components/[BaseComponentName].tsx`  
**Responsabilidade**: [comportamento compartilhado entre variantes]

**Implementações previstas**:
| Componente | Variante | Arquivo proposto |
|-----------|---------|-----------------|
| `[VariantName]` | [descrição] | `src/components/[VariantName].tsx` |

---

## Decisões de design

| Decisão | Racional |
|---------|---------|
| [ex: usar interface ao invés de classe abstrata] | [motivo] |

---

## Contratos que NÃO mudam

[Interfaces ou contratos existentes que esta feature não pode quebrar]

- ...

---

## Perguntas abertas

[Ambiguidades de contrato não resolvidas — deixar vazio se nenhuma]
