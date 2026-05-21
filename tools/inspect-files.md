# inspect-files

**Tool**: Leitura sistemática de arquivos e estrutura de diretórios.

## Uso

Operação atômica de leitura. Usada por agents, sub-agents e skills para inspecionar código, configuração, contratos e estrutura do projeto.

## Procedimento

### Inspecionar estrutura de diretórios

```
Listar conteúdo de um diretório:
  ls <caminho>/

Buscar arquivos por padrão:
  find <caminho> -name "*.ts" -type f
```

### Ler arquivo específico

Abrir e ler conteúdo completo ou seção relevante de um arquivo.

### Inspecionar arquivos vizinhos

Para entender padrões locais, ler arquivos do mesmo diretório ou feature:
- Componentes similares
- Hooks, services, types do mesmo módulo
- Testes existentes na mesma área

## Regras

- Abrir apenas o mínimo necessário para o objetivo
- Não abrir metade do repositório para achar uma referência
- Se o arquivo não for relevante para o domínio afetado, não ler
- Preferir leitura de arquivos específicos à listagem ampla

## Saída esperada

Conteúdo dos arquivos lidos, referenciado em `**Contexto lido**` no output final.
