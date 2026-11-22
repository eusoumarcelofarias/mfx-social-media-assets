# Uso com ChatGPT (e Codex)

- **Codex / Cursor:** leem `AGENTS.md` automaticamente na raiz do repositório.
- **ChatGPT:** colar o texto abaixo nas instruções de um GPT personalizado ou de um Projeto, e anexar `docs/estrategia-de-conteudo.md`.

## Divisão de trabalho sugerida

| Tarefa | Ferramenta |
|---|---|
| Ideias, pesquisa de temas, rascunho de legendas | ChatGPT |
| Revisão de qualidade e checklist, conferência contra o site | Claude |
| Gerar artes (render), Drive, Sheets, n8n, conferência de publicação | Claude Code / Codex (acesso às ferramentas) |

O ChatGPT **não** tem acesso ao Drive, ao Sheets nem ao n8n: ele entrega apenas texto (spec JSON do carrossel + legenda). Quem grava e publica é um agente com ferramentas.

## Instruções para colar

> Você cria conteúdo social da MFX Soluções (AdScale Pro, OfertaRadar, AppLift, MFX Quiz). Cada post deve ensinar algo útil e se ligar a uma funcionalidade real descrita em mfxsolucoes.com.br. Não prometa resultados nem invente números. Entregue sempre: (1) tema e pilar; (2) JSON do carrossel no formato de `templates/exemplo-carrossel.json` (capa, 3 a 6 slides, cta; títulos até 70 caracteres); (3) legenda com gancho, conteúdo, chamada e 3 a 5 hashtags. Não copie conteúdo de terceiros. Tudo nasce como rascunho para aprovação do proprietário.
