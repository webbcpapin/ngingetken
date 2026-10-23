"use strict";
(()=>{
 const db=window.NGINGETKEN_LIBRARY;
 const $=id=>document.getElementById(id);
 if(!db||!Array.isArray(db.regulations)||!Array.isArray(db.articles)){
   $("results").textContent="Pustaka sementara tidak dapat dimuat.";
   $("item-count").textContent="Data tidak tersedia";return;
 }
 const catNames={"Semua":"Seluruh koleksi","PP":"Peraturan Pemerintah","PMK":"Peraturan Menteri Keuangan","PER DJBC":"Peraturan Direktur Jenderal Bea dan Cukai","SE":"Surat Edaran","Lainnya":"Regulasi lainnya","Materi":"Materi edukasi","Paparan":"Bahan paparan"};
 const regulations=db.regulations.map(r=>({...r,group:r.type,isRegulation:true}));
 const materials=db.articles.map((a,i)=>({...a,group:"Materi",isRegulation:false,code:"MATERI EDUKASI "+String(i+1).padStart(2,"0")}));
 const driveMaterials=(Array.isArray(window.NGINGETKEN_DRIVE_MATERIALS)?window.NGINGETKEN_DRIVE_MATERIALS:[])
   .filter(a=>a&&a.title&&safeDriveUrl(a.url))
   .map(a=>({...a,group:"Paparan",isDriveMaterial:true}));
 const all=[...regulations,...materials,...driveMaterials];
 let selected="Semua";
 function safeOfficialUrl(url){
   try{const obj=new URL(url);return obj.protocol==="https:"&&["jdih.kemenkeu.go.id","www.jdih.kemenkeu.go.id","peraturan.go.id","www.peraturan.go.id","jdih.kpk.go.id","jdih.menpan.go.id"].includes(obj.hostname);}
   catch(e){return false;}
 }
 function safeDriveUrl(url){
   try{
     const obj=new URL(url);
     if(obj.protocol!=="https:")return false;
     if(obj.hostname==="drive.google.com")return /^\/(file\/d\/[^/]+|drive\/folders\/[^/]+)(\/|$)/.test(obj.pathname);
     if(obj.hostname==="docs.google.com")return /^\/(document|presentation|spreadsheets)\/d\/[^/]+(\/|$)/.test(obj.pathname);
     return false;
   }catch(e){return false;}
 }
 function create(tag,className,text){
   const elem=document.createElement(tag);
   if(className)elem.className=className;
   if(text!==undefined&&text!==null)elem.textContent=String(text);
   return elem;
 }
 function makeRegulation(r){
   const card=create("article","resource");
   const head=create("div","resource-head");
   head.append(create("span","resource-type",r.type),create("span","resource-verified","SUMBER PEMERINTAH"));
   card.append(head,create("span","resource-code",r.code),create("h4","",r.title),create("p","",r.description));
   const foot=create("div","resource-foot");
   foot.append(create("span","resource-source",r.publisher));
   if(safeOfficialUrl(r.url)){
     const link=create("a","", "Lihat naskah resmi ↗");
     link.href=r.url;link.target="_blank";link.rel="noopener noreferrer";link.setAttribute("aria-label","Buka dokumen "+r.code+" di sumber resmi");
     foot.append(link);
   }else foot.append(create("span","resource-source","Tautan perlu verifikasi"));
   card.append(foot);
   return card;
 }
 function makeMaterial(a){
   const card=create("article","resource");
   const head=create("div","resource-head");
   head.append(create("span","resource-type materi","Materi edukasi"),create("span","resource-verified","DRAF"));
   card.append(head,create("span","resource-code",a.cat||a.code),create("h4","",a.title),create("p","",a.short||a.intro));
   const foot=create("div","resource-foot");
   foot.append(create("span","resource-source","Ringkasan; perlu validasi pengelola"));
   const btn=create("button","","Baca materi →");btn.type="button";
   btn.setAttribute("aria-label","Baca materi "+a.title);
   btn.addEventListener("click",()=>openMaterial(a));
   foot.append(btn);card.append(foot);
   return card;
 }
 function makeDriveMaterial(a){
   const card=create("article","resource");
   const head=create("div","resource-head");
   head.append(create("span","resource-type materi","Bahan paparan"),create("span","resource-verified",a.access||"AKSES SESUAI IZIN"));
   card.append(head,create("span","resource-code",a.category||"MATERI PENDAMPING"),create("h4","",a.title),create("p","",a.description||"Bahan pembelajaran tambahan."));
   const foot=create("div","resource-foot");
   foot.append(create("span","resource-source","Google Drive · izin akses mengikuti pemilik berkas"));
   const link=create("a","","Buka materi ↗");
   link.href=a.url;link.target="_blank";link.rel="noopener noreferrer";
   link.setAttribute("aria-label","Buka materi "+a.title+" di Google Drive");
   foot.append(link);card.append(foot);
   return card;
 }
 function openMaterial(a){
   $("detail-tag").textContent=(a.cat||"MATERI EDUKASI")+" · DRAF";
   $("detail-title").textContent=a.title;
   $("detail-intro").textContent=a.intro||a.short;
   const list=$("detail-list");list.replaceChildren();
   (a.points||[]).forEach(s=>{list.append(create("li","",s));});
   const source=$("detail-source");source.replaceChildren();
   source.append(create("strong","","Rujukan: "));
   if(Array.isArray(a.sources)){
     a.sources.forEach((entry,i)=>{
       if(i)source.append(document.createTextNode(" · "));
       if(safeOfficialUrl(entry.url)){
         const link=create("a","",entry.label+" ↗");
         link.href=entry.url;link.target="_blank";link.rel="noopener noreferrer";
         source.append(link);
       }else source.append(document.createTextNode(entry.label||"Rujukan perlu verifikasi"));
     });
   }else{
     source.append(document.createTextNode(a.source||"Perlu validasi pengelola"));
   }
   $("detail-dialog").showModal();
 }
 function filtered(){
   const query=$("search").value.toLocaleLowerCase("id").trim();
   return all.filter(item=>{
     const category=selected==="Semua"||item.group===selected;
     const text=[item.title,item.description,item.code,item.publisher,item.topics,item.short,item.intro,item.cat].join(" ").toLocaleLowerCase("id");
     return category&&(!query||text.includes(query));
   });
 }
 function render(){
   document.querySelectorAll("#filters [data-filter]").forEach(btn=>{
     const active=btn.dataset.filter===selected;
     btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));
   });
   $("collection-title").textContent=catNames[selected]||catNames.Semua;
   const items=filtered();
   const root=$("results");root.replaceChildren();
   items.forEach(item=>root.append(item.isRegulation?makeRegulation(item):item.isDriveMaterial?makeDriveMaterial(item):makeMaterial(item)));
   $("item-count").textContent=items.length+" referensi ditampilkan";
   $("collection-note").textContent=selected==="Semua"?
     db.regulations.length+" dokumen pemerintah · "+db.articles.length+" ringkasan edukasi · "+driveMaterials.length+" tautan Drive":selected==="SE"?"Perlu inventarisasi naskah SE dan validasi pengelola":selected==="Paparan"?"Tautan ditampilkan setelah penelaahan dan persetujuan akses":"Materi mengikuti filter yang dipilih";
   $("empty").hidden=items.length>0;
   if(items.length===0){
     $("empty-message").textContent=selected==="SE"?
     "Belum ada Surat Edaran bertema integritas yang telah diverifikasi untuk diterbitkan. Inventarisasi dilakukan melalui JDIH dan pengelola yang berwenang.":
     selected==="Paparan"?
     "Belum ada tautan Google Drive yang disetujui. Bahan sedang ditelaah; berkas tidak diunggah ke situs ini.":
     $("search").value?"Tidak ditemukan. Coba kata kunci lain atau ganti kategori.":"Materi kategori ini belum tersedia dalam katalog.";
   }
 }
 $("filters").addEventListener("click",e=>{
   const btn=e.target.closest("button[data-filter]");
   if(!btn)return;selected=btn.dataset.filter;
   render();
 });
 $("search").addEventListener("input",render);
 $("close-dialog").addEventListener("click",()=>$("detail-dialog").close());
 $("done-dialog").addEventListener("click",()=>$("detail-dialog").close());
 $("detail-dialog").addEventListener("click",event=>{if(event.target===$("detail-dialog"))$("detail-dialog").close();});
 render();
})();
