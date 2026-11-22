# Estratégia de conteúdo MFX Social

Regra de ouro: **todo post ensina algo útil sobre o problema que o sistema resolve.** Não existe post "decorativo". Se o leitor não sair sabendo algo novo ou pronto para agir, o post não é publicado.

Fonte dos produtos: https://mfxsolucoes.com.br/ (consultar antes de escrever; só citar funcionalidades que estejam lá).

## Os 4 sistemas e seus pilares

| Sistema | Etapa | Funcionalidades confirmadas no site | Público |
|---|---|---|---|
| **AdScale Pro** | Escalar | campanhas em tempo real; vendas, UTMs e financeiro; criativos analisados por IA; insights e relatórios | gestores de tráfego, infoprodutores, agências, e-commerces |
| **OfertaRadar** | Descobrir | ofertas por nicho; biblioteca privada; sinais e tendências; monitoramento diário | quem pesquisa ofertas e referências |
| **AppLift** | Entregar | apps sem código; conteúdo e comunidade; vendas e domínios; integrações prontas | quem quer app da própria marca |
| **MFX Quiz** | Converter | construtor no-code; funil de conversão; respostas e relatórios; automações | quem capta leads e vende com jornadas |

Observação de nomes: no site o produto aparece como **AppLift**; internamente (Drive/planilha) usa-se `AppLife` no campo `produto`. Em textos para o público, usar o nome do site.

## Pilares de conteúdo (rodar em rodízio)

1. **Ensinar** — método, passo a passo, erro comum e como evitar (ex.: "3 sinais de que uma oferta está escalando").
2. **Mostrar o sistema em uso** — uma funcionalidade real resolvendo um problema real, sem prometer resultado.
3. **Boas práticas do nicho** — métricas (ROAS, CPA, CTR), estrutura de funil, retenção, UTMs.
4. **Bastidores e ciclo de crescimento** — Descobrir → Captar → Entregar → Escalar, ligando os 4 sistemas.
5. **Chamada suave** — convite para conhecer o sistema ou falar no WhatsApp (no máximo 1 em cada 4 posts).

Distribuição sugerida por remessa de 20: 8 ensinar, 5 mostrar sistema, 4 boas práticas, 2 ciclo, 1 chamada.

## Formatos e template

- **Carrossel 1080×1350** (padrão), 5 a 8 slides, gerado por `tools/render-carousel.mjs` a partir de um JSON (`templates/exemplo-carrossel.json`). Mesmo visual para todos os posts: fundo escuro MFX, cor de destaque por produto, tipografia Space Grotesk/Inter, rodapé com a marca.
- Tipos de slide: `capa`, `ponto`, `lista`, `destaque`, `cta`. Primeiro slide sempre `capa`, último sempre `cta`.
- Cores de destaque por produto: AdScale Pro `#3d7bff`, OfertaRadar `#2fd38a`, AppLift `#9db8ff`, MFX Quiz `#f2b84b`, institucional `#3d7bff`.
- Artes mais elaboradas (mockups de tela) podem ser geradas por IA de imagem, mas só entram se passarem no checklist e seguirem a mesma paleta.

Gerar:
```bash
node tools/render-carousel.mjs social/<produto>/<AAAA-MM-DD_id>/spec.json social/<produto>/<AAAA-MM-DD_id>
```

## Anatomia de uma legenda

1. Gancho na primeira linha (pergunta, número ou afirmação concreta).
2. 3 a 5 linhas com o conteúdo útil (o que ensinar).
3. Uma chamada para ação (salvar, comentar, conhecer o sistema).
4. 3 a 5 hashtags pertinentes (não genéricas).
5. Link/menção: `mfxsolucoes.com.br`.

## Checklist de qualidade (todo post precisa passar)

- [ ] Ensina algo específico? Dá para resumir o aprendizado em uma frase?
- [ ] Fala de um problema real do público e se liga a uma funcionalidade confirmada no site?
- [ ] Sem promessa de resultado, ganho ou faturamento. Sem números inventados.
- [ ] Texto ≤ 70 caracteres por título de slide; fonte legível no celular.
- [ ] Mesma identidade visual do template; nada de arte genérica de banco de imagem.
- [ ] Não copia criativo, texto ou imagem de terceiros (pesquisa serve de **inspiração de tema**, não de cópia).
- [ ] Não repete tema já publicado (consultar a planilha).
- [ ] Revisado e aprovado pelo proprietário antes de marcar `aprovado`.

## Pesquisa de referências (inspiração, não cópia)

Objetivo: descobrir **temas** que estão funcionando no nicho para criar posts nossos.

1. Fontes já disponíveis: Biblioteca de Anúncios da Meta (ferramentas MineraRoi) e o OfertaRadar (temas, nichos, sinais).
2. Fonte futura via Apify (posts orgânicos em destaque do Instagram/Facebook por hashtag e perfis concorrentes): exige token Apify próprio do projeto MFX Social, criado como credencial no n8n pelo proprietário. **Não usar o orçamento Apify do OfertaRadar** (teto mensal de US$ 5, é do produto).
3. Resultado da pesquisa vira uma lista de temas em `docs/banco-de-ideias.md`, com: tema, sistema relacionado, ângulo MFX, formato. Nunca salvar o conteúdo copiado.
