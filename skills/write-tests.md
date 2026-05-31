# write-tests

**Skill**: Escrita de testes usando o framework configurado no projeto.

## Quando usar

Invocada pelo sub-agent `test-engineer` após `build-risk-matrix`. Executa a escrita real dos testes definidos pela matriz.

## Procedimento

### 1. Detectar configuração de testes existente

Verificar na raiz do projeto (e em `packages/*/` para monorepos):
- Arquivos de config do framework de testes (ex: `vitest.config.ts`, `jest.config.ts`, `playwright.config.ts`)
- Scripts de teste em `package.json` ou equivalente
- Campo `test.include` para saber onde ficam os testes

### 2. Identificar padrão existente

Antes de escrever, inspecionar arquivos de teste já presentes:
- Padrão de nomes: `*.test.ts`, `*.spec.ts`, `*.test.tsx`?
- Localização: colocados ao lado dos arquivos ou em pasta separada (`__tests__/`)?
- Estrutura: como usam `describe`, `it`/`test`, `beforeEach`, mocks?
- Utilitários: há helpers compartilhados de setup?

Seguir **exatamente** o padrão encontrado.

### 3. Se não houver nenhuma cobertura de testes

- Criar estrutura padrão: `__tests__/<modulo>/<arquivo>.test.ts`
- Criar config mínima do framework na raiz
- Verificar se framework está nas dependências — avisar o usuário para instalar se não estiver
- **Parar e perguntar antes de configurar infraestrutura que amplie materialmente o escopo**

### 4. Escrever os testes

Usar a matriz de `build-risk-matrix` como guia:
- **Feature nova**: caminho feliz + pelo menos um caso de borda relevante
- **Fix**: ao menos um teste de regressão que reproduziria o bug antigo e agora passa
- Não exagerar — cobertura útil e focada no que foi alterado

### 5. Executar os testes

Invocar `tools/run-command.md` para rodar os testes e capturar resultado.

## Regras

- Usar o framework de testes configurado no projeto
- Validar comportamento, não trivialidade de implementação
- Não afirmar cobertura não executada
- Não inventar cenários não mapeados na matriz de risco
- **Testar via interface/contrato, não via implementação concreta** — injetar adapters de teste (mocks, fakes, in-memory) satisfazendo a interface
- Se código não tem interface e é testável apenas via implementação concreta: sinalizar no output que interface deve ser extraída antes de mockar dependências

## Saída esperada

- Arquivos de teste criados ou alterados
- Comandos executados e resultados observados
- Cenários cobertos e cenários não cobertos com justificativa
