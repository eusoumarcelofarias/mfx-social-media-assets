#!/usr/bin/env node
// Renderiza um carrossel MFX (JPEG 1080x1350) a partir de um spec JSON.
// Uso: node tools/render-carousel.mjs <spec.json> <pasta-de-saida>
// Requer: Google Chrome (macOS) e `sips` (nativo do macOS). Sem dependencias npm.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const W = 1080, H = 1350;

const PRODUTOS = {
  'ADS Scale':        { nome: 'AdScale Pro',  cor: '#3d7bff', tag: 'ESCALAR' },
  'OfertaRadar':      { nome: 'OfertaRadar',  cor: '#2fd38a', tag: 'DESCOBRIR' },
  'AppLife':          { nome: 'AppLift',      cor: '#9db8ff', tag: 'ENTREGAR' },
  'Quiz':             { nome: 'MFX Quiz',     cor: '#f2b84b', tag: 'CONVERTER' },
  'MFX Institucional':{ nome: 'MFX Soluções', cor: '#3d7bff', tag: 'TECNOLOGIA E IA' },
};

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// **trecho** vira destaque colorido
const rich = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<em>$1</em>').replace(/\n/g, '<br>');

function css(cor) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${W}px;height:${H}px}
  body{background:#03050a;color:#f4f6fb;font-family:'Inter',-apple-system,Helvetica,Arial,sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;inset:0;background:
    radial-gradient(900px 700px at 85% -5%, ${cor}38, transparent 60%),
    radial-gradient(800px 600px at -10% 105%, ${cor}22, transparent 60%)}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(circle at 50% 40%,#000 20%,transparent 75%)}
  .wrap{position:absolute;inset:0;padding:84px 84px 76px;display:flex;flex-direction:column}
  .top{display:flex;justify-content:space-between;align-items:center;font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:.04em}
  .brand{font-size:30px}.brand b{color:${cor}}
  .tag{font-size:22px;color:${cor};border:2px solid ${cor}66;padding:8px 18px;border-radius:999px}
  .main{flex:1;display:flex;flex-direction:column;justify-content:center}
  h1,h2{font-family:'Space Grotesk',sans-serif;font-weight:700;line-height:1.06;letter-spacing:-.02em}
  h1{font-size:112px}h2{font-size:84px}
  em{font-style:normal;color:${cor}}
  .sub{font-size:42px;line-height:1.38;color:#c9d1e0;margin-top:44px;font-weight:400}
  .num{font-family:'Space Grotesk',sans-serif;font-size:220px;font-weight:700;color:${cor};line-height:.9;opacity:.95;margin-bottom:26px}
  ul{list-style:none;margin-top:52px;display:flex;flex-direction:column;gap:26px}
  li{font-size:42px;line-height:1.3;color:#e6ebf5;padding:26px 32px;border:1.5px solid rgba(255,255,255,.12);border-left:6px solid ${cor};border-radius:18px;background:rgba(255,255,255,.03)}
  .stat{font-family:'Space Grotesk',sans-serif;font-size:260px;font-weight:700;color:${cor};line-height:1;letter-spacing:-.04em}
  .cta{display:inline-block;margin-top:56px;align-self:flex-start;background:linear-gradient(135deg,#f6d27a,#d9a21f);color:#1a1200;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:44px;padding:28px 54px;border-radius:22px}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:26px;color:#8a93a6;border-top:1.5px solid rgba(255,255,255,.1);padding-top:28px}
  .foot b{color:#f4f6fb;font-family:'Space Grotesk',sans-serif}
  .dots{display:flex;gap:10px}.dots i{width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,.18)}.dots i.on{background:${cor}}
  `;
}

function slideHtml(spec, s, i, total) {
  const p = PRODUTOS[spec.produto] || PRODUTOS['MFX Institucional'];
  let body = '';
  switch (s.tipo) {
    case 'capa':
      body = `<h1>${rich(s.titulo)}</h1>${s.subtitulo ? `<p class="sub">${rich(s.subtitulo)}</p>` : ''}`; break;
    case 'ponto':
      body = `${s.numero ? `<div class="num">${esc(s.numero)}</div>` : ''}<h2>${rich(s.titulo)}</h2>${s.texto ? `<p class="sub">${rich(s.texto)}</p>` : ''}`; break;
    case 'lista':
      body = `<h2>${rich(s.titulo)}</h2><ul>${(s.itens || []).map((t) => `<li>${rich(t)}</li>`).join('')}</ul>`; break;
    case 'destaque':
      body = `<div class="stat">${esc(s.valor)}</div><h2>${rich(s.titulo)}</h2>${s.texto ? `<p class="sub">${rich(s.texto)}</p>` : ''}`; break;
    case 'cta':
      body = `<h1>${rich(s.titulo)}</h1>${s.texto ? `<p class="sub">${rich(s.texto)}</p>` : ''}<div class="cta">${esc(s.botao || 'Saiba mais')}  →</div>`; break;
    default: throw new Error(`Tipo de slide invalido: ${s.tipo}`);
  }
  const dots = Array.from({ length: total }, (_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${css(p.cor)}</style></head><body>
  <div class="glow"></div><div class="grid"></div>
  <div class="wrap">
    <div class="top"><div class="brand">MFX <b>${esc(p.nome)}</b></div><div class="tag">${esc(p.tag)}</div></div>
    <div class="main">${body}</div>
    <div class="foot"><div><b>MFX</b> Soluções · mfxsolucoes.com.br</div><div class="dots">${dots}</div></div>
  </div></body></html>`;
}

function validar(spec) {
  const erros = [];
  if (!PRODUTOS[spec.produto]) erros.push(`produto invalido: ${spec.produto}`);
  const sl = spec.slides || [];
  if (sl.length < 2 || sl.length > 10) erros.push('carrossel precisa de 2 a 10 slides');
  if (sl[0]?.tipo !== 'capa') erros.push('o primeiro slide deve ser do tipo "capa"');
  if (sl.length && sl[sl.length - 1].tipo !== 'cta') erros.push('o ultimo slide deve ser do tipo "cta"');
  sl.forEach((s, i) => {
    if (!s.titulo) erros.push(`slide ${i + 1} sem titulo`);
    if (String(s.titulo || '').length > 70) erros.push(`slide ${i + 1}: titulo com mais de 70 caracteres`);
  });
  if (erros.length) throw new Error('Spec invalido:\n - ' + erros.join('\n - '));
}

const [specPath, outDir] = process.argv.slice(2);
if (!specPath || !outDir) { console.error('Uso: node tools/render-carousel.mjs <spec.json> <pasta-de-saida>'); process.exit(1); }
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
validar(spec);
const out = resolve(outDir);
mkdirSync(out, { recursive: true });
const tmp = join(out, '.tmp'); mkdirSync(tmp, { recursive: true });

spec.slides.forEach((s, i) => {
  const n = String(i + 1).padStart(2, '0');
  const html = join(tmp, `${n}.html`), png = join(tmp, `${n}.png`), jpg = join(out, `${n}.jpg`);
  writeFileSync(html, slideHtml(spec, s, i, spec.slides.length));
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--window-size=${W},${H}`,
    '--virtual-time-budget=8000', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '92', png, '--out', jpg], { stdio: 'ignore' });
  console.log('ok', jpg);
});
rmSync(tmp, { recursive: true, force: true });
