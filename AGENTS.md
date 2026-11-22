# MFX Soluções — Instruções permanentes para agentes

Este repositório armazena somente **mídias públicas** e documentação operacional da publicação social da MFX.

Ao receber pedidos de criar, organizar, agendar ou publicar conteúdos de ADS Scale, OfertaRadar, AppLife, Quiz ou MFX Soluções, **leia primeiro** [`.agents/skills/mfx-social-postagens/SKILL.md`](.agents/skills/mfx-social-postagens/SKILL.md).

Use o Google Sheets para calendário editorial, Drive para artes originais, a Data Table n8n como fila técnica e os workflows já testados. Não pergunte novamente IDs, caminhos, contas e nomenclaturas já definidos na skill; consulte os links canônicos.

Nunca salve tokens ou senhas no repositório. Apenas mídia final aprovada pode ser publicada na Internet.

A rotina automática ativa publica **somente Facebook MFX**. O Instagram oficial `@mfxsolucoesbr` tem publicador próprio (`6YCyQKpcz3QsEPqr`), validado com carrossel real, mas **inativo até autorização explícita do proprietário**. O Instagram pessoal (`@eusoumarcelofarias`) é legado: nunca usar. Não modifique outros apps, serviços ou credenciais AdScale.

Qualidade: todo conteúdo segue `docs/estrategia-de-conteudo.md` e é renderizado com `tools/render-carousel.mjs`. Posts nascem como `rascunho`.


## Onde buscar temas (pesquisa Apify + IA)

Toda segunda às 6h o workflow n8n `Yy82NDfptZ6PpZap` coleta posts em destaque (Apify), a IA filtra (nota ≥ 7) e salva:
- **Arquivo local (para Codex/Claude):** `~/Library/CloudStorage/GoogleDrive-eusoumarcelofarias@gmail.com/Meu Drive/MFX Social/pesquisa/pesquisa-AAAA-MM-DD.json` — use o mais recente. Campos: produto, tema, angulo_mfx, formato, nota, motivo, referencia_url.
- **Planilha (para o proprietário):** aba `Pesquisa` da planilha `1AGUCHhBNsZHiXDiH114rTB05TgT0ec-1zku-yq0xSr0`.
- Fonte técnica: Data Table n8n `MFX_social_pesquisa` (`hIiTsYQyWhxCcFEu`).

Use os temas como **inspiração** (nunca copiar). Padrões visuais aprovados em `templates/` (A `referencia-roas`, B `padrao-b-editorial`, C `padrao-c-cartoes`), alternar entre eles.

## Pedido típico: "crie a remessa da semana"
1. Ler o `pesquisa-*.json` mais recente; escolher os melhores temas por produto.
2. Escrever `remessas/<data>/remessa.json` (copy que ensina, números marcados como exemplo, MFX só na assinatura).
3. Renderizar (Chrome) para `MFX Social/remessas/<data>/` e gerar o painel.
4. Tudo como `rascunho`. Nunca publicar.
