# search-codebase

**Tool**: Busca de símbolos, padrões e referências no codebase.

## Uso

Operação atômica de busca. Usada para localizar definições, consumidores, usos de função/componente, padrões recorrentes e referências cruzadas.

## Procedimento

### Buscar por símbolo ou padrão

```bash
# Localizar definição de função ou componente
grep -r "nomeDoSimbolo" src/ --include="*.ts" --include="*.tsx"

# Localizar importações de um módulo
grep -r "from '.*modulo'" src/ --include="*.ts"

# Localizar todos usos de um componente
grep -r "<NomeDoComponente" src/ --include="*.tsx"

# Buscar padrão específico com contexto
grep -rn "padrão" src/ --include="*.ts" -A 2 -B 2
```

### Quando usar

- Antes de refatorar: localizar todos os consumidores do que será alterado
- Antes de criar: verificar se já existe implementação similar
- Para entender impacto: localizar o que pode quebrar com a mudança
- Para identificar padrões: como o projeto resolve problemas similares

## Regras

- Buscar com precisão — evite padrões genéricos demais que retornam ruído
- Verificar consumidores antes de alterar contratos
- Confirmar que "não existe" antes de criar — uma busca evita duplicação

## Saída esperada

Lista de arquivos e linhas onde o padrão foi encontrado, referenciada nas decisões do output final.
