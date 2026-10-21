"use strict";
/* SJT formatif, 45 soal Best–Worst. Semua penilaian berlangsung di browser tanpa penyimpanan. */
(function(){
  const bank=window.SJT_BANK;
  if(!bank||!Array.isArray(bank.items)||bank.items.length!==45){document.getElementById("quiz").textContent="Bank soal tidak tersedia atau tidak lengkap.";return;}
  const questions=bank.items;
  const domains=Array.from(new Set(questions.map(q=>q.competency)));
  const state={index:0,answers:Object.create(null),done:false};
  const $=id=>document.getElementById(id);
  const safe=value=>String(value==null?"":value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  function isComplete(q){const a=state.answers[q.id];return Boolean(a&&a.best&&a.worst&&a.best!==a.worst);}
  function doneCount(){return questions.reduce((n,q)=>n+(isComplete(q)?1:0),0);}
  function renderGrid(){
    $("question-grid").innerHTML=questions.map((q,i)=>{
      const a=state.answers[q.id]||{};
      const cls=isComplete(q)?"complete":a.best||a.worst?"partial":"";
      return '<button class="num '+cls+(i===state.index?" current":"")+'" type="button" data-index="'+i+'" aria-label="Buka soal '+(i+1)+(cls==="complete"?", lengkap":cls==="partial"?", sebagian terjawab":", belum terjawab")+'" aria-current="'+(i===state.index?"step":"false")+'">'+(i+1)+'</button>';
    }).join("");
  }
  function render(){
    if(state.done)return;
    const q=questions[state.index],a=state.answers[q.id]||{};
    $("question-number").textContent="SOAL "+(state.index+1)+" / "+questions.length+" · "+q.id;
    $("question-domain").textContent=q.competency;
    $("scenario").textContent=q.scenario;
    $("behavior").textContent="Indikator pembelajaran: "+q.behavior;
    $("options").innerHTML=Object.keys(q.options).map(letter=>{
      const text=safe(q.options[letter]);
      return '<div class="choice"><span class="letter">'+letter+'</span><span class="choicetext">'+text+'</span><div class="pickers">'+
      '<button type="button" class="pick best '+(a.best===letter?"selected":"")+'" data-mode="best" data-letter="'+letter+'" aria-pressed="'+(a.best===letter)+'" aria-label="Paling efektif, opsi '+letter+'">TERBAIK</button>'+
      '<button type="button" class="pick worst '+(a.worst===letter?"selected":"")+'" data-mode="worst" data-letter="'+letter+'" aria-pressed="'+(a.worst===letter)+'" aria-label="Paling tidak efektif, opsi '+letter+'">TERBURUK</button></div></div>';
    }).join("");
    $("hint").textContent=a.best&&!a.worst?"Pilih tindakan yang paling tidak efektif.":a.worst&&!a.best?"Pilih tindakan yang paling efektif.":!a.best&&!a.worst?"Pilih satu TERBAIK dan satu TERBURUK.":"Dua pilihan lengkap. Anda bisa melanjutkan atau meninjau ulang.";
    $("prev").disabled=state.index===0;
    $("next").textContent=state.index===questions.length-1?"Selesai / Periksa jawaban →":"Berikutnya →";
    const n=doneCount();
    $("completed").textContent=n+" / "+questions.length;
    $("progressfill").style.width=(n/questions.length*100)+"%";
    $("submit").disabled=n!==questions.length;
    $("submit").textContent=n===questions.length?"Lihat hasil latihan":"Lihat hasil ("+n+"/"+questions.length+")";
    $("submit-note").textContent=n===questions.length?"Semua soal lengkap. Klik untuk melihat hasil berdasarkan kunci draf.":"Lengkapi "+(questions.length-n)+" soal untuk menampilkan hasil.";
    renderGrid();
  }
  function navigate(index){
    state.index=Math.min(questions.length-1,Math.max(0,index));
    render();
    $("quiz").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function choose(mode,letter){
    if(!["best","worst"].includes(mode)||!["A","B","C","D"].includes(letter))return;
    const id=questions[state.index].id;
    const a=state.answers[id]||{best:"",worst:""};
    if(a[mode]===letter){a[mode]="";}
    else{a[mode]=letter;const other=mode==="best"?"worst":"best";if(a[other]===letter)a[other]="";}
    state.answers[id]=a;
    render();
  }
  function points(q){
    const a=state.answers[q.id];
    return Number(a.best===q.key_best)+Number(a.worst===q.key_worst);
  }
  function buildReport(){
    if(doneCount()!==questions.length)return;
    state.done=true;
    const rows=questions.map(q=>({id:q.id,competency:q.competency,scenario:q.scenario,answers:state.answers[q.id],points:points(q),best:q.key_best,worst:q.key_worst,rationale:q.rationale,refs:q.references||[]}));
    const total=rows.reduce((sum,r)=>sum+r.points,0);
    const domainRows=domains.map(name=>({name,score:rows.filter(r=>r.competency===name).reduce((sum,r)=>sum+r.points,0)}));
    $("quiz").hidden=true;$("results").hidden=false;
    $("score").textContent=total+" / "+(questions.length*2);
    $("percentage").textContent=Math.round(total/(questions.length*2)*100)+"% kecocokan dengan kunci DRAF; bukan skor kompetensi ASN.";
    $("stats").innerHTML=[2,1,0].map(n=>'<div class="stat"><strong>'+rows.filter(r=>r.points===n).length+'</strong>Kasus dengan '+(n===2?"dua":n===1?"satu":"nol")+' pilihan sesuai</div>').join("");
    $("competency-results").innerHTML=domainRows.map(r=>'<tr><td>'+safe(r.name)+'</td><td><strong>'+r.score+' / 10</strong></td></tr>').join("");
    $("explanations").innerHTML=rows.map((r,i)=>{
      const links=r.refs.map(u=>'<li><a href="'+safe(u)+'" target="_blank" rel="noopener noreferrer">'+safe(u)+'</a></li>').join("");
      return '<div class="resultitem"><h4>'+(i+1)+'. '+safe(r.competency)+' · '+safe(r.id)+' <small>('+r.points+'/2)</small></h4>'+
      '<p>Jawaban Anda: TERBAIK '+safe(r.answers.best)+'; TERBURUK '+safe(r.answers.worst)+'. Kunci DRAF: TERBAIK '+safe(r.best)+'; TERBURUK '+safe(r.worst)+'.</p>'+
      '<details><summary>Penjelasan dan referensi</summary><p>'+safe(r.rationale)+'</p>'+(links?'<ul>'+links+'</ul>':'')+'</details></div>';
    }).join("");
    $("download").onclick=function(){
      const payload={instrument:"Latihan SJT Best-Worst Ngingetken",version:bank.metadata.version,validation:"BELUM DIVALIDASI",respondent_data:"Tidak dikumpulkan",score_draft:total,max_score:questions.length*2,per_competency:domainRows.map(r=>({competency:r.name,score_draft:r.score,max_score:10})),responses:rows.map(r=>({id:r.id,best:r.answers.best,worst:r.answers.worst,points_draft:r.points})),note:"Bukan asesmen resmi dan bukan skor integritas/level kompetensi."};
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
      const url=URL.createObjectURL(blob),link=document.createElement("a");
      link.href=url;link.download="hasil-latihan-sjt-ngingetken.json";document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
    };
    $("submit").hidden=true;$("submit-note").textContent="Latihan selesai. Anda dapat mengunduh atau mencetak hasil.";
    $("results").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function reset(){
    if(!confirm("Ulangi latihan? Semua jawaban yang belum disimpan akan hilang."))return;
    state.index=0;state.answers=Object.create(null);state.done=false;
    $("quiz").hidden=false;$("results").hidden=true;$("submit").hidden=false;
    render();$("quiz").scrollIntoView({behavior:"smooth",block:"start"});
  }
  $("options").addEventListener("click",event=>{
    const button=event.target.closest("button[data-mode]");if(button)choose(button.dataset.mode,button.dataset.letter);
  });
  $("question-grid").addEventListener("click",event=>{
    const button=event.target.closest("button[data-index]");if(button&&!state.done)navigate(Number(button.dataset.index));
  });
  $("prev").addEventListener("click",()=>navigate(state.index-1));
  $("next").addEventListener("click",()=>{
    if(state.index!==questions.length-1){navigate(state.index+1);return;}
    if(doneCount()===questions.length){buildReport();return;}
    const firstMissing=questions.findIndex(q=>!isComplete(q));
    if(firstMissing>=0)navigate(firstMissing);
  });
  $("submit").addEventListener("click",buildReport);
  $("print").addEventListener("click",()=>window.print());
  $("retry").addEventListener("click",reset);
  render();
})();
