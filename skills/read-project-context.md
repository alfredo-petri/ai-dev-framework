# read-project-context

**Skill**: Leitura obrigatória de contexto antes de qualquer trabalho relevante.

## Quando usar

Primeiro passo de todo agent e sub-agent. Executar antes de qualquer inspeção de código ou tomada de decisão.

## Procedimento

1. Ler `constitution.md` — princípios de engenharia permanentes que prevalecem sobre qualquer outra instrução
2. Ler `agents.md` — regras operacionais, stack do projeto, mapa de contexto
3. Identificar o domínio afetado pela tarefa
4. Ler apenas os arquivos de contexto de domínio aplicáveis (ex: `aicontext/auth.md` para mudanças em autenticação)
5. Ler arquivos explicitamente citados pelo usuário

## Regras

- Não abrir contextos desnecessários — leia apenas o domínio afetado
- Prefira contextos específicos de domínio ao contexto geral quando ambos existirem
- Se houver conflito entre documentação, código e requisitos: pare e questione, não preencha com suposições

## Saída esperada

Registro interno do que foi lido. Referenciar na seção `**Contexto lido**` do output final.
