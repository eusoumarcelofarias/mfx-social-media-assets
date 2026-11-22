import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const ROOT = new URL('.', import.meta.url).pathname;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FONTS = '<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">';

function render(dir, slides, css) {
  const out = ROOT + dir + '/'; mkdirSync(out, { recursive: true });
  slides.forEach((body, i) => {
    const n = String(i + 1).padStart(2, '0');
    const dots = slides.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
    writeFileSync(`${out}${n}.html`, `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:1350px;overflow:hidden;position:relative}${css}</style></head><body><div class="w">${body}<div class="f"><span class="brand">MFX Soluções</span><span class="dots">${dots}</span></div></div></body></html>`);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1080,1350', '--virtual-time-budget=8000', `--screenshot=${out}${n}.png`, `file://${out}${n}.html`], { stdio: 'ignore' });
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '92', `${out}${n}.png`, '--out', `${out}${n}.jpg`], { stdio: 'ignore' });
  });
}

/* ===== PADRÃO B — EDITORIAL CLARO (revista) ===== */
const Q = '#f2b84b', B = '#3d7bff', INK = '#0b1020';
const cssB = `body{background:#f4f1ea;color:${INK};font-family:Inter}
.w{position:absolute;inset:0;padding:84px 88px 170px;display:flex;flex-direction:column;justify-content:center}
.tag{display:inline-block;align-self:flex-start;font:700 24px Inter;letter-spacing:.12em;text-transform:uppercase;background:${INK};color:#f4f1ea;padding:10px 18px;border-radius:6px}
h1{font:700 116px/.98 'Space Grotesk';letter-spacing:-.04em;margin-top:40px}
h2{font:700 78px/1.02 'Space Grotesk';letter-spacing:-.03em;margin-top:30px}
p{font:400 38px/1.42 Inter;color:#3a4152;margin-top:28px} b{color:${INK};font-weight:700}
.hl{background:linear-gradient(transparent 58%,${Q}aa 58%);padding:0 6px}
.num{font:700 300px/.8 'Space Grotesk';color:${B};letter-spacing:-.06em;margin-top:10px}
.rule{height:6px;background:${INK};margin:40px 0 0;width:120px}
.url{margin-top:40px;background:#fff;border:3px solid ${INK};border-radius:18px;padding:34px 36px;font:500 34px/1.6 'Space Grotesk';word-break:normal}
.url span{border-radius:6px;padding:2px 6px}
.list{margin-top:36px;display:flex;flex-direction:column;gap:18px}
.row{display:grid;grid-template-columns:330px 1fr;align-items:center;background:#fff;border-radius:16px;padding:22px 28px;border-left:12px solid var(--c)}
.row code{font:700 32px 'Space Grotesk'}.row div{font:400 30px Inter;color:#3a4152}
.f{position:absolute;left:88px;right:88px;bottom:76px;display:flex;justify-content:space-between;align-items:center;border-top:3px solid ${INK};padding-top:26px;font:700 24px Inter;letter-spacing:.1em;text-transform:uppercase}
.dots i{display:inline-block;width:18px;height:18px;border-radius:50%;border:3px solid ${INK};margin-left:8px}.dots i.on{background:${INK}}`;
const U = [['utm_source', 'de onde veio', '#3d7bff', 'facebook'], ['utm_medium', 'tipo de mídia', '#2fd38a', 'pago'], ['utm_campaign', 'qual campanha', '#f2b84b', 'black-friday'], ['utm_content', 'qual anúncio', '#ff7a59', 'video-depoimento'], ['utm_term', 'público/palavra', '#a77bff', 'lookalike-1']];
const slidesB = [
  `<span class="tag">Rastreamento</span><h1>Você não perdeu a venda.<br><span class="hl">Perdeu o rastro.</span></h1><div class="rule"></div><p>Sem UTM bem feita, a venda aparece como <b>"direto"</b> e você não sabe qual anúncio pagou a conta.</p><p style="margin-top:60px;font-weight:600;color:${INK}">Os 5 parâmetros, explicados →</p>`,
  `<span class="tag">O que é</span><div class="num">5</div><h2>etiquetas que você cola<br>no fim do link</h2><p>Elas dizem ao seu relatório <b>de onde</b> o clique veio, <b>qual campanha</b> e <b>qual anúncio</b>. Nada muda para o cliente.</p>`,
  `<span class="tag">Os parâmetros</span><h2 style="font-size:64px">Cada um responde<br>uma pergunta</h2><div class="list">${U.map(([k, d, c]) => `<div class="row" style="--c:${c}"><code>${k}</code><div>${d}</div></div>`).join('')}</div>`,
  `<span class="tag">Exemplo montado</span><h2 style="font-size:64px">Como fica o link</h2><div class="url">seusite.com/oferta?${U.map(([k, , c, v]) => `<span style="background:${c}33">${k}=${v}</span>`).join('<br>&amp;')}</div><p style="font-size:28px">Exemplo ilustrativo. Cada cor = um parâmetro.</p>`,
  `<span class="tag">3 regras de ouro</span><h2>Para não bagunçar<br>o relatório</h2><p><b>1.</b> Tudo minúsculo e sem espaço (use hífen).</p><p><b>2.</b> Mesmo nome sempre: <b>facebook</b>, nunca Facebook ou fb.</p><p><b>3.</b> utm_content = nome do criativo, para saber qual vende.</p>`,
  `<span class="tag">Salve este post</span><h1 style="font-size:96px">Padronize hoje.<br><span class="hl">Decida amanhã</span><br>com dados.</h1><p>Mande para quem cuida dos seus links e anúncios.</p>`,
];

/* ===== PADRÃO C — CARTÕES COLORIDOS ===== */
const G = '#2fd38a';
const cssC = `body{background:#0b3b2a;color:#f4fff9;font-family:Inter}
body:before{content:'';position:absolute;inset:0;background:radial-gradient(800px 700px at 0% 0%,#2fd38a55,transparent 60%),radial-gradient(700px 600px at 100% 100%,#0a1f17,transparent 70%)}
.w{position:absolute;inset:0;padding:84px 80px 170px;display:flex;flex-direction:column;justify-content:center}
.k{font:700 26px Inter;letter-spacing:.14em;text-transform:uppercase;color:#b8ffd9}
h1{font:700 110px/1 'Space Grotesk';letter-spacing:-.035em;margin-top:26px}
h2{font:700 72px/1.04 'Space Grotesk';letter-spacing:-.025em;margin-top:22px}
.card{margin-top:40px;background:#f4fff9;color:#062016;border-radius:36px;padding:48px 50px;box-shadow:0 30px 80px #0007}
.card .n{font:700 34px 'Space Grotesk';color:#fff;background:#062016;width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.card h3{font:700 58px/1.08 'Space Grotesk';margin-top:26px;letter-spacing:-.02em}
.card p{font:400 34px/1.42 Inter;color:#2f4b3f;margin-top:20px}
p.s{font:400 36px/1.42 Inter;color:#d7f5e6;margin-top:28px} b{font-weight:700}
.chips{display:flex;gap:16px;margin-top:40px;flex-wrap:wrap}.chips span{font:700 30px Inter;background:#ffffff1f;border:2px solid #ffffff40;padding:14px 24px;border-radius:999px}
.f{position:absolute;left:80px;right:80px;bottom:76px;display:flex;justify-content:space-between;align-items:center;font:600 24px Inter;color:#b8ffd9}
.dots i{display:inline-block;width:40px;height:8px;border-radius:4px;background:#ffffff33;margin-left:8px}.dots i.on{background:#fff}`;
const spark = (pts, color, label, unit) => { const w = 820, h = 330, max = Math.max(...pts), min = Math.min(...pts); const xy = pts.map((v, i) => [i / (pts.length - 1) * (w - 40) + 20, h - 30 - (v - min) / (max - min || 1) * (h - 70)]);
  return `<svg width="${w}" height="${h + 40}" viewBox="0 0 ${w} ${h + 40}" style="margin-top:26px"><polyline fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" points="${xy.map(p => p.join(',')).join(' ')}"/>${xy.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${i === xy.length - 1 ? 13 : 7}" fill="${color}"/>`).join('')}<text x="20" y="${h + 30}" font-family="Inter" font-size="24" fill="#5a7a6c">Semana 1</text><text x="${w - 20}" y="${h + 30}" text-anchor="end" font-family="Inter" font-size="24" fill="#5a7a6c">Semana 4 · ${label} ${pts[pts.length - 1]}${unit}</text></svg>`; };
const slidesC = [
  `<div class="k">Criativos · diagnóstico</div><h1>Seu anúncio<br>não morreu.<br>Ele <span style="color:${G}">cansou.</span></h1><div class="chips"><span>Frequência ↑</span><span>CTR ↓</span><span>CPM ↑</span></div><p class="s">3 sinais que aparecem <b>antes</b> do resultado cair. Arraste →</p>`,
  `<div class="k">Sinal 1 de 3</div><div class="card"><div class="n">1</div><h3>A frequência passa de 3</h3><p>O mesmo público já viu seu anúncio muitas vezes. A novidade acabou.</p>${spark([1.4, 2.1, 2.9, 3.8], '#e0662f', 'freq.', '')}</div><p class="s" style="font-size:26px">Números de exemplo.</p>`,
  `<div class="k">Sinal 2 de 3</div><div class="card"><div class="n">2</div><h3>O CTR cai semana após semana</h3><p>Menos gente clica porque o criativo virou "paisagem" no feed.</p>${spark([2.4, 2.1, 1.6, 1.1], '#e0662f', 'CTR', '%')}</div><p class="s" style="font-size:26px">Números de exemplo.</p>`,
  `<div class="k">Sinal 3 de 3</div><div class="card"><div class="n">3</div><h3>O CPM sobe sem mudar o público</h3><p>A plataforma cobra mais para entregar um anúncio com menos interesse.</p>${spark([18, 21, 26, 32], '#e0662f', 'CPM R$', '')}</div><p class="s" style="font-size:26px">Números de exemplo.</p>`,
  `<div class="k">O que fazer</div><h2>Viu 2 dos 3 sinais?<br>Troque o criativo,<br>não a campanha.</h2><div class="card" style="padding:40px 46px"><p style="margin:0;color:#062016;font:500 36px/1.6 Inter">→ Novo gancho nos 3 primeiros segundos<br>→ Mesmo público, outro ângulo<br>→ Mantenha a campanha aprendendo</p></div>`,
  `<div class="k">Salve para a próxima análise</div><h1 style="font-size:96px">Frequência, CTR e CPM:<br><span style="color:${G}">olhe juntos,</span><br>toda semana.</h1><p class="s">Marque quem cuida dos seus anúncios.</p>`,
];

render('padrao-b-editorial', slidesB, cssB);
render('padrao-c-cartoes', slidesC, cssC);
console.log('ok');
