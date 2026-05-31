# document-aicontext

**Skill**: Criação e atualização de documentação de contexto de AI no diretório `aicontext/`.

## Quando usar

Após implementação de feature ou fix. Invocada por agents que entregam mudanças (`feature-module-agent`, e qualquer agent após implementação relevante).

## Estrutura do diretório

```
aicontext/
├── auth.md          # Módulo de autenticação
├── payments.md      # Módulo de pagamentos
├── ui.md            # Componentes de interface
└── ...              # Um arquivo por módulo/domínio
```

## Procedimento

1. Inferir o módulo pelo código modificado:
   - Arquivos em `src/auth/` → módulo `auth`
   - Arquivos em `src/payments/` → módulo `payments`
   - etc.
2. Verificar se `aicontext/` existe na raiz do projeto
3. Verificar se já existe `aicontext/<modulo>.md`

**Se `aicontext/` não existir:**
- Criar o diretório
- Criar apenas o arquivo do módulo afetado
- Não criar arquivos para módulos não tocados

**Se existir, respeitar a estrutura presente:**
- Adicionar ao arquivo correto (ou criar se o módulo ainda não tiver arquivo)

## Regras por tipo de mudança

| Situação | Ação |
|----------|------|
| Feature nova | Adicionar nova entrada em `## Features` |
| Nova interface/contrato introduzida | Adicionar entrada em `## Interfaces / Contratos` com adapters conhecidos |
| Adapter novo para interface existente | Atualizar entrada da interface com o novo adapter |
| Fix que muda comportamento descrito | Atualizar descrição existente para refletir comportamento correto |
| Fix interno sem mudança observável | **Não atualizar** — seria redundante |
| Módulo sem arquivo ainda | Criar `aicontext/<modulo>.md` com a seção pertinente |

## Formato do arquivo de módulo

```markdown
# <Nome do Módulo>

## Interfaces / Contratos

### `I<NomeDoContrato>`
<Responsabilidade do contrato. Adapters existentes: `AdapterA` (tecnologia), `AdapterB` (tecnologia).>

## Features

### <Nome da Feature>
<Descrição do comportamento esperado, entradas, saídas e regras de negócio relevantes.>

## Fixes

### <Título do Fix>
<Descrição do comportamento CORRETO após o fix. Não descrever o bug, apenas o funcionamento atual esperado.>
```

## Saída esperada

Arquivo `aicontext/<modulo>.md` criado ou atualizado.
