# run-command

**Tool**: Execução de comandos de terminal e interpretação de saída.

## Uso

Operação atômica de execução. Usada para rodar testes, builds, linters e outros comandos do projeto.

## Procedimento

### Identificar o comando correto

Verificar em `package.json`, `Makefile` ou equivalente os scripts disponíveis:

```bash
# Exemplos comuns
npm test           # executar testes
npm run test:unit
npm run build
npm run lint
npm run typecheck
```

### Executar e interpretar saída

1. Rodar o comando
2. Verificar código de saída (0 = sucesso, não-zero = falha)
3. Ler output completo — não assumir sucesso sem verificar
4. Para testes: identificar quais passaram, quais falharam e por quê
5. Para build/lint: identificar erros específicos e arquivos afetados

### Para testes

```bash
# Rodar todos os testes
npm test

# Rodar testes de um arquivo específico
npm test -- path/to/file.test.ts

# Rodar com cobertura
npm test -- --coverage
```

## Regras

- Não afirmar que testes passaram sem executar
- Reportar saída real — não resumir sem embasamento
- Se comando falhar, reportar o erro exato
- Não executar comandos destrutivos sem confirmação explícita do usuário

## Saída esperada

Resultado do comando: saída textual, código de saída e interpretação do resultado.
