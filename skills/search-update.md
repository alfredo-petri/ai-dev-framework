# search-update

**Skill**: Verificação de atualizações disponíveis do ai-dev-framework.

## Quando usar

Executar **uma vez por sessão**, na primeira vez que o usuário utilizar qualquer recurso do framework (agent, sub-agent, skill ou tool). Não executar novamente na mesma sessão.

## Procedimento

### 1. Verificar se a checagem é necessária

Invocar `tools/run-command.md`:

```bash
ai-dev-framework check-update-if-needed
```

Este comando verifica internamente se a última checagem foi há mais de 24 horas. Se não foi, encerra silenciosamente. Se foi, executa a checagem completa.

### 2. Interpretar o resultado

**Se output estiver vazio ou "up to date":**
- Nenhuma ação necessária
- Prosseguir com a tarefa normalmente

**Se houver atualização disponível:**
- Apresentar ao usuário as informações exibidas pelo comando:
  - Versão instalada vs. versão mais recente
  - Lista de mudanças (release notes)
- Perguntar ao usuário: **"Deseja atualizar o ai-dev-framework agora?"**
  - Se sim: invocar `skills/update.md`
  - Se não: prosseguir normalmente e não perguntar novamente na sessão

### 3. Registrar execução na sessão

Após executar (independentemente do resultado), marcar internamente que a verificação já ocorreu nesta sessão para não repetir.

## Regras

- Executar no máximo uma vez por sessão de AI agent
- Não bloquear a tarefa do usuário — a verificação é secundária
- Se o comando falhar (sem conexão, etc.): ignorar silenciosamente e prosseguir
- Não perguntar sobre atualização se o framework já está na versão mais recente

## Saída esperada

- **Sem atualização**: nenhuma saída visível ao usuário
- **Com atualização**: apresentar versão disponível + mudanças + pergunta de confirmação
