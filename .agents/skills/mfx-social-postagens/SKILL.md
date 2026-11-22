---
name: mfx-social-postagens
description: Produzir, organizar, aprovar, agendar e acompanhar publicações sociais ADS Scale, OfertaRadar, AppLife, Quiz e MFX Soluções usando Google Drive, Google Sheets e n8n, sem exigir JSON manual.
---

# Skill MFX — Produção, calendário e publicação social

> Contrato operacional canônico. Use quando receber pedidos como “crie 15 posts”, “salve as artes no Drive”, “coloque as copies no Sheets”, “agende a campanha”, “publique um carrossel”, “monte uma remessa de postagens”.

## 1. Serviços, links e IDs permanentes

**Google Drive:** conta `ideiasemmovimentodigital@gmail.com`
- Raiz operacional, PRIVADA: [MFX Solucoes - Publicacoes](https://drive.google.com/drive/folders/1EXesdckyVM-_UX25jFl8cvWh_Q319CUq), ID `1EXesdckyVM-_UX25jFl8cvWh_Q319CUq`.
- Mídias finais, PÚBLICA somente leitura com link: [00 - MIDIAS PUBLICAS MFX](https://drive.google.com/drive/folders/1PnqL8Y7OmUPdiSwEBsTGKpkGJmcW-HQD), ID `1PnqL8Y7OmUPdiSwEBsTGKpkGJmcW-HQD`.
- Subpastas públicas por produto (criar pasta INDIVIDUAL para cada novo post):
  - ADS Scale: `1aTzlwh-3WuPM-E9zXm6M66zWSqwJjR-A`
  - OfertaRadar: `18j533YrmU8wMjS55K-03tMXDIiVVXVUM`
  - AppLife: `1ViDjWmkcfywsKOer1ezV2uFW0rpdiX5o`
  - Quiz: `1SgEl8d3hZqa3aZrg7ecQT1XOBMhIfiGF`
  - MFX Institucional: `1r2LoPtP6-ELSyn-n0K3A3jall-6rihR2`

**Google Sheets — [MFX Soluções — Calendário de Publicações](https://docs.google.com/spreadsheets/d/1PGPTET5RO2xgPXcKqIhCa_QNelJiCymSsl1q5tYpQ_k/edit)**
- Spreadsheet ID `1PGPTET5RO2xgPXcKqIhCa_QNelJiCymSsl1q5tYpQ_k`.
- Aba `Calendario`, com abas adicionais `Como usar` e `Configuracoes`.
- Editores existentes: conta Drive Ideias em Movimento e `eusoumarcelofarias@gmail.com`.
- Cada linha representa **uma publicação para UMA rede**; para Facebook + Instagram, criar **duas linhas e IDs editoriais diferentes**.

**n8n — [Sincronizar Sheets para a fila](https://workflows.mfxsolucoes.com.br/workflow/qFeuWphPSq0mWI49)**
- Workflow `qFeuWphPSq0mWI49`; importa posts aprovados do Calendario (Facebook **e Instagram oficial**). Usa Drive OAuth, exporta a aba em CSV, valida, evita duplicatas por `id_editorial` e insere na Data Table. Instagram: somente `carrossel` com 2–10 URLs JPEG HTTPS em `urls_jpeg_publicas`. Código versionado em `n8n/sincronizador-validar.js`.
- **[Publicador Instagram OFICIAL @mfxsolucoesbr](https://workflows.mfxsolucoes.com.br/workflow/6YCyQKpcz3QsEPqr)**, ID `6YCyQKpcz3QsEPqr`. Consome `plataforma=instagram`, `status=pronto`, `agendado_em` vencido. Valida a conta por `GET /me` (bloqueia se não for `mfxsolucoesbr`). Credencial `MFX Instagram OFICIAL - mfxsolucoesbr - 22nov2026`. Teste real: exec `1602430`. **Fica INATIVO até o proprietário autorizar a ativação.**
- Escrita no Sheets pelos agentes: usar o conector Google Sheets (`get_values`, `append_values`, `update_values`); testado em 22/11/2026. Nunca alterar linhas existentes sem pedido.
- Data Table técnica `MFX_social_publicacoes`, ID `9yb4fZLqowstYbDH`, projeto `XCKVC1HkVLl6hhNI`.
- [Publicador Facebook MFX](https://workflows.mfxsolucoes.com.br/workflow/Nahkx5DiWfRQyplx), ID `Nahkx5DiWfRQyplx`. Já validado em produção para imagem e múltiplas fotos; consulta Data Table a cada 15 minutos.
- [Publicador Instagram pessoal LEGADO](https://workflows.mfxsolucoes.com.br/workflow/TfXMvgnogFKD96za), ID `TfXMvgnogFKD96za` (`@eusoumarcelofarias`). **Desativado, não usar** para conteúdo MFX nem reutilizar sua credencial.
- Verificador de token Instagram oficial (sem publicar): `qoUhoi9OOLwVamA3`.
- Credencial n8n Drive: **Google Drive Ideias em Movimento**, ID `bIy6hjPRxvhf7Nv2`. Meta Facebook e Instagram já têm credenciais distintas — **não exibir ou copiar tokens**.
- O Facebook MFX tem token que precisa ser revisado/renovado antes de **21/01/2027**.

**URLs JPEG diretas para Instagram:** Google Drive compartilhado é apenas arquivo/origem, **não** hospedagem direta garantida. Usar provedor público de imagens JPEG HTTPS, já testado pelo projeto: [mfx-social-media-assets](https://github.com/eusoumarcelofarias/mfx-social-media-assets) / URL `https://raw.githubusercontent.com/eusoumarcelofarias/mfx-social-media-assets/main/<caminho>/01.jpg`. Nunca usar Drive `/file/d/ID/view` como `image_url` do Instagram. Confirmar HTTP 200, Content-Type image/jpeg.

## 1.1 Qualidade de conteúdo e template (obrigatório)

Antes de escrever qualquer post, leia [`docs/estrategia-de-conteudo.md`](../../../docs/estrategia-de-conteudo.md): pilares por sistema (AdScale Pro, OfertaRadar, AppLift, MFX Quiz), checklist de qualidade e anatomia da legenda. Todo post precisa **ensinar algo útil** e se ligar a uma funcionalidade confirmada em https://mfxsolucoes.com.br/. Sem promessa de resultado, sem número inventado, sem copiar terceiros.

Artes: use o template `tools/render-carousel.mjs` (spec JSON em `templates/exemplo-carrossel.json`) para gerar JPEG 1080×1350 padronizados. Não gere arte avulsa fora da identidade do template.

Ferramentas por agente: Claude Code/Codex (executam: render, Drive, Sheets, n8n), ChatGPT (ideias e rascunhos; ver `docs/chatgpt-instrucoes.md`).

## 2. Geração de posts sob demanda

1. Entenda o pedido (produto, quantidade, formato, objetivo, canal, frequência). Se quantidade ou distribuição forem dadas, **não pergunte outra vez**.
2. Escreva copy específica de cada post: gancho inicial, utilidade, benefícios reais, chamada para ação e hashtags pertinentes. Não invente resultado de produto ou métrica; evite duplicações mecânicas.
3. Gere o criativo no formato solicitado. Para arte estática: exportar imagem final nítida, sem marca d'água. Para carrossel, produzir 2–10 quadros JPEG, mesma razão de aspecto, com sequência narrativa.
4. Cada publicação ganha **uma subpasta dentro da pasta do produto**: `YYYY-MM-DD_<id_editorial>` (ex.: `2026-12-01_ADS-001`). Imagens ordenadas `01.jpg`, `02.jpg`, `03.jpg`, ...; não misturar mídias de posts diferentes. Guardar opcional `legenda.txt` e `briefing.txt` na subpasta; a legenda canônica fica no Sheets.
5. Salvar no Drive (ideiasemmovimentodigital@gmail.com). Coletar IDs reais dos arquivos, não inventar. Para Instagram, disponibilizar cópias JPEG em URL HTTPS direta e testar.
6. Criar linhas na aba `Calendario`, sem mexer nas existentes, com status **rascunho** por padrão. Quando o proprietário autorizar agendamento/ publicação da remessa, marcar **aprovado**. Nunca inventar autorização nem publicar rascunho.
7. Apresentar resumidamente número de posts, onde estão as artes, quando serão publicados e qual canal.

## 3. Contrato preciso da planilha

Colunas em `Calendario`:
- A `id_editorial`: ÚNICO e estável, ex.: `ADS-20261201-001-FB`. Não reutilizar IDs de testes.
- B `produto`: ADS Scale / OfertaRadar / AppLife / Quiz / MFX Institucional.
- C `rede`: `facebook` ou `instagram` (valores exatos).
- D `formato`: `imagem` (1 foto) ou `carrossel` (2–10 fotos).
- E `titulo_interno`: título descritivo, para visualização.
- F `legenda`: copy completa em texto, com quebras de linha.
- G `publicar_em_iso`: data ISO8601 **com offset**. Ex.: `2026-12-01T10:00:00-03:00` (10h de Brasília). Nunca agendar em horário local incerto.
- H `pasta_drive_id`: **ID real da subpasta do post**, não da raiz.
- I `arquivos_drive_ids`: IDs reais separados por **vírgula**, em ordem, sem JSON. Ex.: `ID1,ID2,ID3`.
- J `urls_jpeg_publicas`: URLs JPEG diretas separados por `|`, em ordem, sem JSON. Instagram necessita estas URLs; Facebook pode deixar vazio porque faz upload privado do Drive.
- K `aprovacao`: `rascunho` / `aprovado` / `cancelado`. Só **aprovado** autoriza importação.
- L `status_automacao`: `pendente` inicialmente; manter conforme o processo. **IMPORTANTE: atualmente NÃO há espelhamento automático do estado da Data Table de volta para a planilha**; se necessário, consulte a Data Table para status real, link e erro.
- M `link_publicado`: preencher com resultado real quando obtido.
- N `erro_publicacao`: mensagem resumida de erro.
- O `atualizado_em`: última edição ISO.
- P `id_fila_n8n`: ID da Data Table importada, se conhecido.

**Fonte editorial**: Sheets. **Fila e status técnico reais**: n8n Data Table. Não tratar aprovação alterada depois da importação como cancelamento garantido da fila — cancelar também o registro técnico.

## 4. Automação existente e limites

O sincronizador exporta CSV da primeira aba por Drive API, usando a credencial OAuth Drive. Foi testado duas vezes:
- Uma linha aprovada com data fictícia 2099 foi importada uma única vez (n8n exec. `1601612`), mas depois cancelada em Sheet e Data Table (id=4).
- Reexecução `1601613` gerou 0 duplicatas.

O importador só considera linhas com `aprovacao=aprovado`, `status_automacao=pendente`, `rede` = `facebook` ou `instagram`, data ISO correta, legenda e mídias adequadas (Facebook: IDs do Drive; Instagram: carrossel com URLs JPEG HTTPS). Passa `status=pronto` para a Data Table. O publicador Facebook executa quando `agendado_em` vencer. O publicador Instagram oficial só roda se o proprietário o ativar (hoje inativo). O Instagram **pessoal** nunca entra no fluxo.

A API Google Sheets REST do projeto Google Cloud associado ao Drive OAuth retornou HTTP 403 por estar desativada, por isso a leitura funcional é por **exportação CSV pela API do Drive**. **Ainda não há escrita bidirecional status/link do n8n para Sheets**, apenas leitura/ingestão. Para acompanhar resultados, ler a Data Table do n8n.

## 5. Cancelar ou excluir

- Antes da importação: altere Sheets `aprovacao=cancelado`; se já entrou na fila, altere **também** o registro correspondente na Data Table `status=cancelado`.
- Depois de publicado: excluir no perfil autorizado da rede e marcar Data Table `status=excluido`, preservando o histórico e o link anterior apenas como referência.
- Não repetir a operação de publicação após timeout/erro sem consultar se a Meta já criou o post.
- Cada autorização de publicação precisa identificar conta de destino. Instagram `@eusoumarcelofarias` só deve ser usado quando usuário o pedir explicitamente.

## 6. Validação obrigatória de qualquer remessa

- Drive: imagens finais realmente existem; IDs reais; nomes ordenados.
- Sheets: linhas distintas para cada rede, agenda ISO, legendas legíveis, aprovação explícita.
- Instagram: URL HTTPS pública JPEG que responde 200 como `image/jpeg`, 2–10 quadros no carrossel, conta IG certa, publicação manual enquanto for perfil pessoal.
- Facebook: importar via sincronizador para Data Table, conferir ID editorial idempotente, publicar em fila a partir da data e conferir post_id/post_url.
- Nunca prometer “agendado e funcionando” sem executar ao menos uma leitura ou simulação de teste sem postagem de risco.
- Não divulgar credenciais, não alterar AdScale, não tornar pública a pasta operacional raiz.

## 7. Exemplo de comando do usuário — o que o agente faz

> “Faça 20 publicações para MFX, 5 por produto; crie as imagens e copies, salve no Drive, registre na planilha e programe uma por dia.”

Agente: produz as 20 artes e copies; salva cada arte em pasta própria do produto; coleta file IDs; preenche 20 linhas para a rede escolhida; deixa em **rascunho** caso não tenha aprovação explícita; se usuário expressamente mandou programar, marca como aprovado com datas reais e deixa o sincronizador importar as de Facebook. Devolve links das pastas e da planilha, com contagem por produto e rede. Se pedir IG pessoal, executar **somente manualmente** e confirmar conta certa; caso deseje automação IG MFX, exigir conta MFX vinculada e testada antes de ativar.

