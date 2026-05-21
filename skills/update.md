# update

**Skill**: Atualização do ai-dev-framework para a versão mais recente.

## Quando usar

Invocada após `skills/search-update.md` quando o usuário confirma que deseja atualizar.

## Pré-requisito

Aprovação explícita do usuário. **Nunca executar sem confirmação.**

Se invocada diretamente (sem passar por `search-update`), apresentar primeiro:

```
Versão instalada: v<X.Y.Z>
Esta ação irá sobrescrever os arquivos em ~/.ai-dev-framework/ com a versão mais recente.
Confirma a atualização? (s/n)
```

Só prosseguir com resposta afirmativa.

## Procedimento

### 1. Executar atualização

Invocar `tools/run-command.md`:

```bash
ai-dev-framework update
```

Este comando:
1. Baixa a versão mais recente do GitHub
2. Sobrescreve os arquivos em `~/.ai-dev-framework/`
3. Re-injeta referência em todos os agents CLI detectados

### 2. Aguardar conclusão

O comando pode levar alguns segundos. Aguardar output completo.

### 3. Confirmar resultado

**Se sucesso** (output contém "✓ Update complete"):
- Informar ao usuário: "ai-dev-framework atualizado com sucesso para v<nova-versão>"
- Prosseguir com a tarefa original do usuário usando os arquivos atualizados

**Se falha** (comando retornou erro):
- Informar o erro exato ao usuário
- Sugerir: verificar conexão e tentar novamente com `ai-dev-framework update`
- Prosseguir com a versão instalada atualmente

## Regras

- Nunca executar sem aprovação explícita do usuário
- Não tentar executar update parcial — o comando é atômico
- Se falhar, não bloquear a sessão — prosseguir com versão atual

## Saída esperada

```
✓ ai-dev-framework atualizado para v<nova-versão>
```

Ou em caso de falha:

```
✗ Atualização falhou: <erro>
Prosseguindo com a versão atual (v<versão>).
```
