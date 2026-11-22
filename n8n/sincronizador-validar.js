// Codigo do no "Validar aprovados e evitar duplicados" (workflow qFeuWphPSq0mWI49).
// Mantido aqui para versionamento; o n8n e a fonte de verdade.
// Aceita rede=facebook (imagem|carrossel) e rede=instagram (somente carrossel, com urls_jpeg_publicas).
const text=String($('Exportar Calendario Google Sheets em CSV').first().json.csv||'');
function parseCSV(src){
  const rows=[];let row=[],v='',q=false;
  for(let i=0;i<src.length;i++){
    const c=src[i];
    if(q){if(c==='"'&&src[i+1]==='"'){v+='"';i++;}else if(c==='"'){q=false;}else{v+=c;}}
    else if(c==='"'){q=true;}
    else if(c===','){row.push(v);v='';}
    else if(c==='\n'){row.push(v.replace(/\r$/,'')); rows.push(row);row=[];v='';}
    else{v+=c;}
  }
  if(v||row.length){row.push(v.replace(/\r$/,''));rows.push(row);}
  return rows;
}
const data=parseCSV(text);
if(!data.length)return [];
const keys=data.shift().map(x=>x.trim().replace(/^﻿/,''));
const existing=new Set($input.all().map(i=>String(i.json.id_editorial||'').trim()).filter(Boolean));
const seen=new Set();
const out=[];
for(const vals of data){
  const row=Object.fromEntries(keys.map((k,i)=>[k,String(vals[i]||'').trim()]));
  const id=row.id_editorial||'';
  if(!id||id.startsWith('EXEMPLO')||seen.has(id)||existing.has(id))continue;
  if(row.aprovacao.toLowerCase()!=='aprovado'||row.status_automacao.toLowerCase()!=='pendente')continue;
  const rede=row.rede.toLowerCase();
  if(rede!=='facebook'&&rede!=='instagram')continue;
  if(!['imagem','carrossel'].includes(row.formato))continue;
  if(!row.legenda||!row.produto)continue;
  const ms=Date.parse(row.publicar_em_iso);
  if(!Number.isFinite(ms)||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(row.publicar_em_iso))continue;
  const ids=row.arquivos_drive_ids.split(/[,;\s]+/).map(x=>x.trim()).filter(Boolean);
  let pub=[];
  if(rede==='facebook'){
    if((row.formato==='imagem'&&ids.length!==1)||(row.formato==='carrossel'&&(ids.length<2||ids.length>10)))continue;
    if(!ids.every(x=>/^[A-Za-z0-9_-]{20,}$/.test(x)))continue;
  } else {
    // Instagram oficial: so carrossel, 2-10 JPEG HTTPS publicos, separados por |
    if(row.formato!=='carrossel')continue;
    pub=row.urls_jpeg_publicas.split('|').map(x=>x.trim()).filter(Boolean);
    if(pub.length<2||pub.length>10)continue;
    if(!pub.every(u=>/^https:\/\/[^\s]+\.jpe?g(\?[^\s]*)?$/i.test(u)))continue;
    if(ids.length&&!ids.every(x=>/^[A-Za-z0-9_-]{20,}$/.test(x)))continue;
  }
  seen.add(id);
  out.push({json:{id_editorial:id,produto:row.produto,plataforma:rede,formato:row.formato,legenda:row.legenda,agendado_em:new Date(ms).toISOString(),pasta_drive_id:row.pasta_drive_id||'',arquivos_drive_json:JSON.stringify(ids),imagens_publicas_json:JSON.stringify(pub),status:'pronto',erro:'',post_id_meta:'',post_url:''}});
}
return out;
