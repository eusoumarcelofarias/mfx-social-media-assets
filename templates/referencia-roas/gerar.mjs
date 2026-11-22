import { writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const OUT = new URL('.', import.meta.url).pathname;
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const A = '#3d7bff', G = '#2fd38a', R = '#ff5c6c', INK = '#f4f6fb', MUTE = '#8a93a6';

const base = (body, n, total) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;background:#03050a;color:${INK};font-family:Inter,sans-serif;position:relative;overflow:hidden}
body:before{content:'';position:absolute;inset:0;background:radial-gradient(900px 600px at 100% 0%,${A}26,transparent 60%)}
.w{position:absolute;inset:0;padding:90px 88px 80px;display:flex;flex-direction:column}
.k{font:600 26px Inter;letter-spacing:.14em;color:${A};text-transform:uppercase}
h1{font:700 104px/1.02 'Space Grotesk';letter-spacing:-.03em;margin-top:28px}
h2{font:700 76px/1.05 'Space Grotesk';letter-spacing:-.025em;margin-top:22px}
p{font:400 38px/1.4 Inter;color:#c9d1e0;margin-top:30px}
b{color:${INK};font-weight:600} .a{color:${A}} .g{color:${G}} .r{color:${R}}
.f{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font:500 24px Inter;color:${MUTE}}
.f i{display:inline-block;width:56px;height:6px;border-radius:3px;background:#ffffff22;margin-left:8px}.f i.on{background:${A}}
.ex{font:500 22px Inter;color:${MUTE};margin-top:18px}
.box{margin-top:44px;border:2px solid #ffffff1a;border-radius:28px;background:#ffffff08;padding:44px}
.formula{font:700 92px 'Space Grotesk';text-align:center;letter-spacing:-.02em}
table{width:100%;border-collapse:collapse;margin-top:40px;font:500 40px Inter}
td{padding:26px 10px;border-bottom:2px solid #ffffff14}td:last-child{text-align:right;font:700 44px 'Space Grotesk'}
tr.hl td{color:${A}}
</style></head><body><div class="w">${body}
<div class="f"><span>Margem de lucro · ${n}/${total}</span><span>${Array.from({length:total},(_,k)=>`<i class="${k===n-1?'on':''}"></i>`).join('')}</span></div></div></body></html>`;

const slides = [
// 1 capa
`<div class="k">Tráfego pago · finanças</div>
<h1>Seu ROAS 2<br>pode estar dando <span class="r">prejuízo</span></h1>
<div class="box" style="padding:50px 54px">
 <svg width="824" height="330" viewBox="0 0 824 330">
  <text x="0" y="40" fill="${MUTE}" font-family="Inter" font-size="28">ROAS da campanha</text>
  <rect x="0" y="64" width="520" height="70" rx="14" fill="${A}"/><text x="540" y="112" fill="${INK}" font-family="Space Grotesk" font-weight="700" font-size="46">2,0</text>
  <text x="0" y="214" fill="${MUTE}" font-family="Inter" font-size="28">ROAS mínimo para empatar (margem 40%)</text>
  <rect x="0" y="238" width="650" height="70" rx="14" fill="none" stroke="${R}" stroke-width="4" stroke-dasharray="14 10"/><text x="670" y="286" fill="${R}" font-family="Space Grotesk" font-weight="700" font-size="46">2,5</text>
 </svg></div>
<p style="margin-top:36px">Arraste para fazer a conta que quase ninguém faz →</p>`,
// 2 o que é roas
`<div class="k">Primeiro, o básico</div>
<h2>ROAS mede <span class="a">receita</span>,<br>não lucro</h2>
<div class="box"><div class="formula">ROAS = <span class="a">Vendas</span> ÷ <span style="color:${MUTE}">Anúncio</span></div></div>
<p><b>ROAS 2</b> significa: cada R$ 1 investido em anúncio voltou <b>R$ 2 em vendas</b>.</p>
<p>Mas desses R$ 2 ainda saem produto, taxas, imposto e comissão.</p>`,
// 3 composição da venda
`<div class="k">Para onde vai o dinheiro</div>
<h2>De uma venda de R$ 100,<br>quanto sobra?</h2>
<div class="box">
<svg width="824" height="420" viewBox="0 0 824 420" font-family="Inter">
 ${[['Produto / entrega',30,'#5b6478'],['Taxas da plataforma',10,'#6f7a91'],['Impostos',12,'#838eaa'],['Comissões / outros',8,'#98a3c0']].map(([t,v,c],i)=>{const y=i*78;return `<rect x="0" y="${y}" width="${v*13}" height="58" rx="10" fill="${c}"/><text x="${v*13+20}" y="${y+40}" fill="#c9d1e0" font-size="30">${t} · R$ ${v}</text>`}).join('')}
 <rect x="0" y="330" width="${40*13}" height="70" rx="12" fill="${G}"/><text x="${40*13+20}" y="378" fill="${G}" font-family="Space Grotesk" font-weight="700" font-size="40">Margem · R$ 40</text>
</svg></div>
<div class="ex">Exemplo ilustrativo. Use os custos reais do seu produto.</div>`,
// 4 fórmula
`<div class="k">A conta</div>
<h2>ROAS de equilíbrio<br>= 1 ÷ margem</h2>
<div class="box"><div class="formula" style="font-size:84px">1 ÷ <span class="g">0,40</span> = <span class="a">2,5</span></div>
<p style="text-align:center;margin-top:24px">Com margem de <b>40%</b>, você precisa de <b>ROAS 2,5</b> só para não perder dinheiro.</p></div>
<p>Abaixo disso, cada venda paga o anúncio com o seu lucro.</p>`,
// 5 gráfico lucro
`<div class="k">Visualizando</div>
<h2>Lucro com R$ 1.000<br>em anúncio</h2>
<div class="box" style="padding:36px 30px">
<svg width="864" height="500" viewBox="0 0 864 500" font-family="Inter">
 <rect x="70" y="20" width="${(2.5-1)/3*690}" height="400" fill="${R}12"/><rect x="${70+(2.5-1)/3*690}" y="20" width="${690-(2.5-1)/3*690}" height="400" fill="${G}10"/>
 ${(()=>{const X=r=>70+(r-1)/3*690, Y=l=>220-l/1200*200*1.0; const pts=[1,1.5,2,2.5,3,3.5,4].map(r=>[r,(r*1000*0.4)-1000]);
 return `<line x1="70" x2="760" y1="${Y(0)}" y2="${Y(0)}" stroke="#ffffff55" stroke-width="2"/>
 <polyline fill="none" stroke="${A}" stroke-width="8" stroke-linecap="round" points="${pts.map(([r,l])=>`${X(r)},${Y(l)}`).join(' ')}"/>
 ${[[2,-200],[2.5,0],[3,200],[4,600]].map(([r,l])=>`<circle cx="${X(r)}" cy="${Y(l)}" r="12" fill="${l<0?R:l==0?INK:G}"/><text x="${X(r)}" y="${Y(l)-28}" text-anchor="${r==4?'end':'middle'}" fill="${l<0?R:l==0?INK:G}" font-family="Space Grotesk" font-weight="700" font-size="32">${l<0?'−':l>0?'+':''}R$ ${Math.abs(l)}</text>`).join('')}
 ${[1,2,2.5,3,4].map(r=>`<text x="${X(r)}" y="470" text-anchor="${r==4?'end':r==1?'start':'middle'}" fill="${MUTE}" font-size="26">ROAS ${String(r).replace('.',',')}</text>`).join('')}
 <text x="80" y="400" fill="${R}" font-size="26" font-weight="600">PREJUÍZO</text><text x="${X(2.5)+20}" y="400" fill="${G}" font-size="26" font-weight="600">LUCRO</text>`})()}
</svg></div>
<div class="ex">Exemplo: margem de 40%. Lucro = vendas × margem − investimento.</div>`,
// 6 tabela
`<div class="k">Guarde esta tabela</div>
<h2>Seu ROAS mínimo<br>pela margem</h2>
<table>${[['Margem 20%','5,0'],['Margem 30%','3,3'],['Margem 40%','2,5'],['Margem 50%','2,0'],['Margem 60%','1,7']].map(([m,r],i)=>`<tr class="${i==2?'hl':''}"><td>${m}</td><td>ROAS ${r}</td></tr>`).join('')}</table>
<p>Quanto <b>menor a margem</b>, mais alto o ROAS que você precisa para escalar com segurança.</p>`,
// 7 fechamento
`<div class="k">Antes de escalar</div>
<h2>Faça isso hoje:</h2>
<div class="box" style="font:500 40px/1.5 Inter">
<div>1. Some <b>todos os custos</b> de uma venda</div>
<div>2. Calcule sua <b>margem real</b> em %</div>
<div>3. ROAS mínimo = <b class="a">1 ÷ margem</b></div>
<div>4. Só escale campanhas <b class="g">acima</b> dele</div></div>
<p>💾 Salve para consultar e mande para quem vive olhando só o ROAS.</p>
<p style="font-size:28px;color:${MUTE}">MFX Soluções · tecnologia para quem anuncia</p>`,
];

slides.forEach((s, i) => {
  const n = String(i + 1).padStart(2, '0');
  const html = `${OUT}${n}.html`, png = `${OUT}${n}.png`;
  writeFileSync(html, base(s, i + 1, slides.length));
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1080,1350', '--virtual-time-budget=8000', `--screenshot=${png}`, `file://${html}`], { stdio: 'ignore' });
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '92', png, '--out', `${OUT}${n}.jpg`], { stdio: 'ignore' });
});
console.log('ok', slides.length);
