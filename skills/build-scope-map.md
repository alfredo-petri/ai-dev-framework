# build-scope-map

**Skill**: Mapeamento de escopo, contratos e ambiguidades antes de refatorar, testar ou auditar.

## Quando usar

Invocada pelo sub-agent `scope-mapper` após `read-project-context`. Usada quando escopo difuso, mudança cruzando módulos ou contratos sensíveis.

## Procedimento

1. Inspecionar código, estrutura de pastas e contratos da área afetada
2. Identificar arquivos candidatos à mudança
3. Identificar arquivos vizinhos em risco de side effect
4. Delimitar explicitamente:
   - Arquivos **em escopo**
   - Arquivos **fora do escopo**
   - Contratos e fluxos sensíveis que não podem quebrar
   - Estados e side effects que devem permanecer idênticos
5. Identificar ambiguidades que o código não resolve
6. Formular perguntas para o usuário apenas quando o repositório não responde

## Regras

- Sem implementação, sem refatoração, sem escrita de testes
- Prefira fatos observáveis — não suponha comportamento
- Aponte e questione se documentação diverge do código em pontos críticos
- Delimite o escopo conservador antes de sugerir expansão

## Saída esperada

Mapa de escopo contendo:
- Arquivos em escopo
- Arquivos fora do escopo
- Contratos sensíveis
- Perguntas abertas (se o repositório não respondeu)
