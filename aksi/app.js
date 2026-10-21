"use strict";
(() => {
  const $ = id => document.getElementById(id);
  const reminderTopics = [
    {id:"data",name:"Akurasi data dan dokumen",focus:"memastikan angka, dokumen, dan catatan kerja sesuai sumber yang dapat diverifikasi",why:"mengurangi kesalahan informasi dan memudahkan tindak lanjut"},
    {id:"tepatwaktu",name:"Ketepatan waktu dan tindak lanjut",focus:"meninjau kembali tenggat, penanggung jawab, dan status penyelesaian tugas",why:"komitmen kerja kita tetap terjaga"},
    {id:"sop",name:"Konsistensi mengikuti SOP",focus:"memeriksa kembali tahapan pekerjaan dengan prosedur serta kewenangan yang berlaku",why:"mutu dan kepastian proses terjaga"},
    {id:"dataaman",name:"Keamanan akun dan informasi",focus:"menjaga kerahasiaan kata sandi serta menggunakan akses sistem sesuai kewenangan",why:"informasi dan sistem kerja terlindungi"},
    {id:"layanan",name:"Komunikasi pelayanan",focus:"menyampaikan informasi pelayanan secara jelas, sopan, dan berdasarkan ketentuan",why:"pengguna jasa mendapatkan layanan yang setara dan dapat dipahami"},
    {id:"koordinasi",name:"Koordinasi dan pembagian pekerjaan",focus:"menyepakati PIC, target keluaran, serta waktu pengecekan progres",why:"tidak ada tindak lanjut yang terlewat"},
    {id:"gratifikasi",name:"Kehati-hatian atas pemberian",focus:"menghindari penerimaan pemberian terkait jabatan dan berkonsultasi melalui mekanisme pengendalian gratifikasi",why:"independensi dalam pelaksanaan tugas tetap terjaga"},
    {id:"benturan",name:"Mengenali potensi benturan kepentingan",focus:"mengidentifikasi potensi konflik kepentingan dan mengonsultasikannya kepada pihak yang berwenang",why:"keputusan pekerjaan tetap objektif"}
  ];
  const appreciationTopics = [
    {id:"integritas",name:"Integritas dan keteladanan",focus:"menjaga prinsip dan konsisten melakukan hal yang benar",impact:"membangun kepercayaan dan keteladanan di lingkungan kerja"},
    {id:"pelayanan",name:"Pelayanan publik yang baik",focus:"memberikan pelayanan dengan sabar, jelas, dan profesional",impact:"membantu meningkatkan kualitas pengalaman pengguna jasa"},
    {id:"kolaborasi",name:"Kerja sama lintas tim",focus:"berkoordinasi dan mendukung penyelesaian pekerjaan bersama",impact:"mempermudah kolaborasi serta pencapaian target tim"},
    {id:"hasil",name:"Ketuntasan dan orientasi pada hasil",focus:"menuntaskan tanggung jawab serta memantau hasilnya",impact:"menjaga kualitas keluaran dan kepastian penyelesaian"},
    {id:"membimbing",name:"Berbagi pengetahuan dan membimbing",focus:"meluangkan waktu menjelaskan pekerjaan dan membantu rekan belajar",impact:"mempercepat pembelajaran dan memperkuat kemampuan tim"},
    {id:"inisiatif",name:"Inisiatif dan inovasi",focus:"mencari cara kerja yang lebih sederhana dan bermanfaat",impact:"mendorong perbaikan berkelanjutan"},
    {id:"komunikasi",name:"Komunikasi yang jelas",focus:"menyampaikan informasi secara terbuka dan mudah dipahami",impact:"mengurangi kesalahpahaman dalam bekerja"},
    {id:"peduli",name:"Kepedulian terhadap rekan",focus:"menawarkan bantuan dan memperhatikan kebutuhan kerja rekan",impact:"membangun lingkungan kerja yang saling mendukung"}
  ];
  function addOptions(id,items) {
    const el=$(id);
    items.forEach(item => {
      const opt=document.createElement("option");
      opt.value=item.id;opt.textContent=item.name;el.append(opt);
    });
  }
  addOptions("reminder-topic",reminderTopics);
  addOptions("appreciation-topic",appreciationTopics);
  const chosen=(items,id)=>items.find(item=>item.id===$(id).value)||items[0];
  function reminderText() {
    const q=chosen(reminderTopics,"reminder-topic"),style=$("reminder-style").value;
    if(style==="formal")return "Rekan-rekan, izin mengingatkan kembali agar kita "+q.focus+". Langkah ini penting supaya "+q.why+". Apabila ada kendala atau keraguan mengenai ketentuan, mari kita koordinasikan melalui jalur kerja yang sesuai. Terima kasih atas kerja samanya.";
    if(style==="tim")return "Pengingat untuk tim: mari bersama-sama "+q.focus+". Kita dapat saling memeriksa dan membantu jika ada hambatan, sehingga "+q.why+". Terima kasih untuk kepedulian dan kolaborasinya.";
    return "Izin saling mengingatkan, ya. Yuk, kita biasakan "+q.focus+". Kalau ada kendala, kita bisa cari solusinya bersama agar "+q.why+". Terima kasih sudah saling menjaga.";
  }
  function appreciationText() {
    const q=chosen(appreciationTopics,"appreciation-topic"),style=$("appreciation-style").value;
    const detail=$("appreciation-detail").value.replace(/\s+/g," ").trim();
    const example=detail?" Contoh yang saya apresiasi: "+detail.replace(/[.!?]+$/,"")+".":"";
    if(style==="formal")return "Terima kasih dan apresiasi atas upaya "+q.focus+"."+example+" Kontribusi tersebut "+q.impact+". Semoga praktik baik ini terus dikembangkan sebagai teladan bagi tim.";
    if(style==="ringkas")return "Terima kasih sudah "+q.focus+"."+example+" Hal ini "+q.impact+". Teruskan hal baik tersebut.";
    return "Terima kasih atas kepedulian dan kontribusinya. Saya mengapresiasi cara Anda "+q.focus+"."+example+" Hal-hal baik seperti ini "+q.impact+". Semoga terus menjadi inspirasi untuk kita semua.";
  }
  function renderReminder(){$("reminder-output").value=reminderText();$("reminder-status").textContent="";}
  function renderAppreciation(){$("appreciation-output").value=appreciationText();$("appreciation-status").textContent="";}
  for(const id of ["reminder-topic","reminder-style"])$(id).addEventListener("change",renderReminder);
  for(const id of ["appreciation-topic","appreciation-style"])$(id).addEventListener("change",renderAppreciation);
  $("appreciation-detail").addEventListener("input",renderAppreciation);
  async function copy(id,statusId) {
    const el=$(id),status=$(statusId);let success=false;
    try {if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(el.value);success=true;}}catch(e){}
    if(!success) {
      el.focus();el.select();el.setSelectionRange(0,el.value.length);
      try{success=document.execCommand("copy");}catch(e){}
    }
    status.textContent=success?"Pesan berhasil disalin. Periksa kembali sebelum mengirim.":"Perangkat tidak mengizinkan penyalinan otomatis. Silakan pilih dan salin teks secara manual.";
  }
  $("copy-reminder").addEventListener("click",()=>copy("reminder-output","reminder-status"));
  $("copy-appreciation").addEventListener("click",()=>copy("appreciation-output","appreciation-status"));
  const decisions = {
    belajar:{title:"Pelajari sumber dan konsultasikan bila perlu",body:"Mulailah dari pusat pengetahuan Ngingetken dan rujukan resmi. Periksa ketentuan terbaru, ruang lingkup aturan, serta kewenangan Anda. Untuk kasus spesifik, konsultasikan kepada unit atau pejabat yang berwenang.",links:[["Baca Pusat Pengetahuan","../index.html#pengetahuan"],["JDIH Kemenkeu","https://jdih.kemenkeu.go.id/"]]},
    ingatkan:{title:"Gunakan pengingat preventif yang menghormati rekan",body:"Jika persoalannya adalah kebiasaan kerja umum yang bisa dibenahi dan tidak berisi indikasi pelanggaran, komunikasikan secara konstruktif, proporsional, dan bila perlu secara pribadi. Jangan menyebarkan tuduhan atau informasi sensitif.",links:[["Buka contoh pengingat","#pengingat"],["Pelajari pemilihan kanal","../index.html#panduan"]]},
    konsultasi:{title:"Konsultasi dengan pihak yang berwenang",body:"Jangan mengambil kesimpulan sendiri bahwa seorang pegawai melakukan pelanggaran. Bila terkait penerimaan hadiah atau potensi benturan kepentingan, pelajari mekanisme pengendalian yang berlaku dan hubungi atasan, pengelola gratifikasi, atau unit kepatuhan internal sesuai ketentuan. Hindari membagikan informasi pribadi di ruang publik.",links:[["Baca materi pencegahan","../index.html#pengetahuan"],["JDIH Kemenkeu","https://jdih.kemenkeu.go.id/"]]},
    lapor:{title:"Gunakan saluran pelaporan resmi",body:"Apabila Anda mengetahui informasi yang mengindikasikan pelanggaran, jangan mengolahnya menjadi pesan pengingat atau apresiasi. Jaga kerahasiaan identitas dan bukti, bedakan fakta dari dugaan, dan gunakan WISE Kemenkeu atau mekanisme pelaporan resmi yang berwenang. Tidak perlu melakukan penyelidikan sendiri.",links:[["Buka WISE Kemenkeu","https://wise.kemenkeu.go.id/"],["Baca panduan pelaporan","../index.html#panduan"]]}
  };
  $("decision-buttons").addEventListener("click",event=>{
    const btn=event.target.closest("button[data-decision]");
    if(!btn)return;
    const result=decisions[btn.dataset.decision];
    if(!result)return;
    $("decision-title").textContent=result.title;
    $("decision-body").textContent=result.body;
    const actions=$("decision-actions");actions.replaceChildren();
    result.links.forEach(([label,url])=>{
      const link=document.createElement("a");link.href=url;link.textContent=label+" →";
      if(url.startsWith("https://")){link.target="_blank";link.rel="noopener noreferrer";}
      actions.append(link);
    });
    document.querySelectorAll("[data-decision]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));
    $("decision-result").hidden=false;
  });
  const tabs=["pengingat","apresiasi","panduan"];
  function openTab() {
    const current=tabs.includes(location.hash.slice(1))?location.hash.slice(1):"pengingat";
    tabs.forEach(name=>{
      $(name).hidden=name!==current;
      const tab=document.querySelector('[data-tab="'+name+'"]');
      if(name===current)tab.setAttribute("aria-current","page");
      else tab.removeAttribute("aria-current");
    });
  }
  window.addEventListener("hashchange",openTab);
  renderReminder();renderAppreciation();openTab();
})();