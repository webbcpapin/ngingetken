"use strict";
const KB = [
{id:"gratifikasi",icon:"◇",cat:"Pencegahan",title:"Mengenali Gratifikasi",intro:"Hadiah dan fasilitas yang berkaitan dengan pekerjaan perlu disikapi secara hati-hati.",short:"Risiko pemberian hadiah dan fasilitas yang terkait dengan tugas.",points:["Kenali keterkaitan pemberian dengan kewenangan atau pelayanan.","Jangan menjanjikan pelayanan khusus sebagai imbalan.","Jika ragu, konsultasikan melalui mekanisme pengendalian gratifikasi yang berlaku.","Gunakan informasi yang dapat diverifikasi dalam pelaporan."],source:"Rujukan awal: UU 31/1999 jo. UU 20/2001; ketentuan pengendalian gratifikasi yang berlaku. Perlu verifikasi pengelola."},
{id:"konflik",icon:"⇄",cat:"Pencegahan",title:"Benturan Kepentingan",intro:"Benturan kepentingan perlu dikenali dan ditangani secara transparan.",short:"Menjaga objektivitas ketika kepentingan pribadi beririsan dengan tugas.",points:["Kenali hubungan pribadi atau kepentingan yang berkaitan dengan penugasan.","Sampaikan potensi benturan kepentingan melalui mekanisme yang ditetapkan.","Hindari menggunakan kewenangan untuk kepentingan pribadi.","Dokumentasikan arahan dan mitigasi yang disetujui."],source:"Rujukan: ketentuan benturan kepentingan dan kode etik organisasi. Perlu verifikasi pengelola."},
{id:"pungli",icon:"!",cat:"Pencegahan",title:"Mencegah Pungutan Tidak Resmi",intro:"Pelayanan harus dijalankan sesuai dasar dan mekanisme yang sah.",short:"Menjaga kepastian biaya serta mencegah permintaan imbalan tidak resmi.",points:["Sampaikan dasar dan prosedur pembayaran yang benar.","Jangan meminta atau menerima imbalan di luar ketentuan.","Gunakan daftar tarif atau biaya resmi.","Laporkan dugaan penyimpangan melalui kanal resmi yang berwenang."],source:"Rujukan: ketentuan kepabeanan dan antikorupsi yang berlaku. Perlu verifikasi pengelola."},
{id:"etika",icon:"✓",cat:"Perilaku",title:"Menjaga Kode Etik",intro:"Integritas tercermin dalam kejujuran informasi, tanggung jawab, dan keteladanan.",short:"Praktik sehari-hari untuk menjaga etika dan komitmen.",points:["Tepati komitmen yang telah disepakati.","Sampaikan informasi yang benar dan dapat dipercaya.","Berani memberi masukan atau koreksi dengan cara yang profesional.","Hargai rekan tanpa mengabaikan ketentuan."],source:"Rujukan: kode etik/kode perilaku Kemenkeu dan indikator Integritas Level 2. Perlu verifikasi pengelola."},
{id:"ingatkan",icon:"↗",cat:"Kolaborasi",title:"Cara Mengingatkan Rekan",intro:"Pengingat berfungsi membantu perbaikan, bukan menuduh atau mempermalukan.",short:"Komunikasi sopan dan spesifik ketika menyampaikan masukan.",points:["Mulai dengan niat membantu, bukan menghakimi.","Fokus pada perilaku atau proses yang dapat diperbaiki.","Gunakan rujukan ketentuan yang valid.","Jangan gunakan fitur pengingat untuk menyebarkan dugaan pelanggaran berat."],source:"Rujukan: pembelajaran Integritas Level 2 dan konsep Ngingetken. Perlu validasi pengelola."},
{id:"data",icon:"▣",cat:"Keamanan",title:"Menjaga Kerahasiaan Informasi",intro:"Data pekerjaan dan informasi pribadi hanya dibagikan sesuai kewenangan.",short:"Menjaga data pegawai, identitas pelapor dan informasi sensitif.",points:["Periksa kewenangan penerima sebelum berbagi data.","Jangan publikasikan NIP atau respons pegawai di GitHub.","Jaga kerahasiaan identitas pelapor.","Gunakan sistem organisasi dan akses yang disetujui untuk menyimpan data."],source:"Rujukan awal: UU 27/2022 tentang Pelindungan Data Pribadi; kebijakan keamanan informasi yang berlaku."},
{id:"layanan",icon:"★",cat:"Perilaku",title:"Pelayanan Prima",intro:"Pelayanan mencakup ketepatan informasi, kepastian proses, dan tindak lanjut.",short:"Contoh perilaku profesional yang membantu penerima layanan.",points:["Sampaikan persyaratan layanan secara jelas.","Buat tindak lanjut yang terukur.","Catat hambatan dan perbaikan proses.","Gunakan umpan balik untuk meningkatkan mutu layanan."],source:"Rujukan: standar layanan unit kerja. Perlu verifikasi pengelola."},
{id:"apresiasi",icon:"✧",cat:"Kolaborasi",title:"Apresiasi Perilaku Positif",intro:"Apresiasi dapat menguatkan keteladanan dan budaya kerja yang baik.",short:"Menghargai inovasi, kepedulian, dan tindakan positif yang faktual.",points:["Sampaikan perilaku yang benar-benar diamati.","Hindari penilaian umum atas karakter seseorang.","Verifikasi informasi sebelum dipublikasikan.","Hormati privasi penerima apresiasi."],source:"Rujukan: konsep apresiasi dalam Proposal Inovasi Ngingetken (2018)."},
{id:"monitoring",icon:"◎",cat:"Sistem",title:"Memahami Monitoring Integritas",intro:"Monitoring pengisian, pengingat, dan pelaporan dugaan pelanggaran memiliki tujuan berbeda.",short:"Menggunakan pemantauan rutin tanpa menghakimi kondisi integritas pegawai.",points:["Ikuti instruksi pengisian sesuai periode yang ditetapkan kantor.","Status pengisian bukan skor integritas pribadi.","Laporkan dugaan pelanggaran melalui mekanisme resmi.","Hasil isian harus dijaga sesuai hak akses yang ditetapkan."],source:"Rujukan historis: Proposal Ngingetken dan ND-151/KBC.0503/2025. Verifikasi kebijakan terkini."},
{id:"suap",icon:"↔",cat:"Pencegahan",title:"Mengenali Suap-Menyuap",intro:"Mengetahui kemungkinan adanya pemberian atau janji imbalan untuk memengaruhi keputusan dan pelayanan.",short:"Bedakan layanan sesuai prosedur dari pemberian atau janji imbalan.",points:["Jangan memberi, meminta, atau menerima sesuatu untuk memengaruhi pelaksanaan tugas.","Pastikan setiap keputusan dan layanan didasarkan pada ketentuan yang berlaku.","Hindari membahas dugaan pelanggaran dengan orang yang tidak berwenang.","Sampaikan informasi dugaan melalui saluran resmi yang sesuai."],source:"Topik indikator nomor 5 Form Induk NGINGETKEN; definisi dan referensi hukum perlu diverifikasi pengelola."},
{id:"curang",icon:"△",cat:"Pencegahan",title:"Mengenali Perbuatan Curang",intro:"Perbuatan curang dapat berkaitan dengan kesengajaan untuk memperoleh keuntungan yang membahayakan pihak lain.",short:"Menjaga kejujuran data, proses, dan penggunaan kewenangan.",points:["Gunakan dokumen, catatan, dan data yang benar.","Hindari mengubah informasi untuk kepentingan pribadi.","Periksa kesesuaian prosedur dan bukti sebelum mengambil tindakan.","Gunakan jalur resmi bila menemukan indikasi penyimpangan."],source:"Topik indikator nomor 6 Form Induk NGINGETKEN; memerlukan verifikasi rujukan aturan."},
{id:"pemerasan",icon:"!",cat:"Pencegahan",title:"Mencegah Pemerasan",intro:"Pelayanan harus bebas dari permintaan imbalan atau tekanan di luar dasar dan prosedur yang sah.",short:"Mengenali permintaan imbalan dengan menggunakan posisi atau layanan.",points:["Hindari permintaan imbalan untuk mempercepat atau mengubah pelayanan.","Gunakan tarif dan prosedur layanan resmi.","Jangan menekan pengguna jasa atau rekan kerja untuk keuntungan pribadi.","Jika mengetahui dugaan, gunakan kanal pengaduan resmi."],source:"Topik indikator nomor 7 Form Induk NGINGETKEN; perlu validasi definisi dan dasar hukum oleh pengelola."},
{id:"gaya-hidup",icon:"◈",cat:"Perilaku",title:"Kesederhanaan dan Gaya Hidup",intro:"Budaya organisasi menekankan kehati-hatian, kepatutan, dan tanggung jawab dalam perilaku sehari-hari.",short:"Memahami isu gaya hidup tanpa menilai atau mempermalukan individu.",points:["Pelajari ketentuan sikap dan perilaku yang berlaku bagi pegawai.","Hindari penilaian seseorang berdasarkan penampilan atau asumsi semata.","Jangan memublikasikan foto atau data pribadi orang lain untuk memperkuat dugaan.","Jika ada informasi terkait pelanggaran, gunakan prosedur resmi dan bukti yang relevan."],source:"Topik indikator nomor 9 Form Induk NGINGETKEN; bukan alat menilai kekayaan atau status sosial pegawai."},
{id:"penggelapan",icon:"▤",cat:"Pencegahan",title:"Mencegah Penggelapan dalam Jabatan",intro:"Pengelolaan uang, barang, surat berharga, dokumen, dan bukti harus dapat dipertanggungjawabkan.",short:"Memahami pentingnya pencatatan, pengendalian, dan keutuhan dokumen.",points:["Jaga keutuhan, otorisasi, dan ketertelusuran dokumen dinas.","Lakukan pengelolaan barang dan uang sesuai ketentuan yang berlaku.","Jangan mengubah, merusak, atau menyembunyikan bukti.","Laporkan indikasi penyimpangan melalui mekanisme resmi."],source:"Topik indikator nomor 11 Form Induk NGINGETKEN; penjelasan resmi perlu divalidasi pengelola."}
];
const byId=id=>document.getElementById(id);
const cats=["Semua",...new Set(KB.map(a=>a.cat))];
let selected="Semua";
function filters(){
 const target=byId("filters");target.replaceChildren();
 cats.forEach(cat=>{const btn=document.createElement("button");btn.type="button";btn.textContent=cat;btn.className="filter"+(cat===selected?" active":"");btn.setAttribute("aria-pressed",String(cat===selected));btn.addEventListener("click",()=>{selected=cat;filters();articles();});target.append(btn);});
}
function articles(){
 const root=byId("articles");root.replaceChildren();
 const q=byId("search").value.trim().toLowerCase();
 const chosen=KB.filter(a=>(selected==="Semua"||a.cat===selected)&&[a.title,a.short,a.cat].join(" ").toLowerCase().includes(q));
 byId("none").hidden=chosen.length>0;
 chosen.forEach(a=>{const btn=document.createElement("button");btn.type="button";btn.className="article";
 const top=document.createElement("div");top.className="article-top";
 const icon=document.createElement("span");icon.className="article-icon";icon.textContent=a.icon;
 const cat=document.createElement("span");cat.className="article-cat";cat.textContent=a.cat;top.append(icon,cat);
 const title=document.createElement("h3");title.textContent=a.title;
 const intro=document.createElement("p");intro.textContent=a.short;
 const more=document.createElement("span");more.className="article-more";more.textContent="Baca Materi  →";
 btn.append(top,title,intro,more);btn.addEventListener("click",()=>detail(a));root.append(btn);});
}
function detail(a){
 byId("detailCat").textContent=a.cat;byId("detailTitle").textContent=a.title;byId("detailIntro").textContent=a.intro;byId("detailSource").textContent=a.source;
 const list=byId("detailPoints");list.replaceChildren();
 a.points.forEach(p=>{const li=document.createElement("li");li.textContent=p;list.append(li);});
 byId("articleDialog").showModal();
}
byId("search").addEventListener("input",articles);
byId("closeArticle").addEventListener("click",()=>byId("articleDialog").close());
byId("doneArticle").addEventListener("click",()=>byId("articleDialog").close());
byId("closeForm").addEventListener("click",()=>byId("formDialog").close());
byId("doneForm").addEventListener("click",()=>byId("formDialog").close());
const labels={monitoring:"Monitoring Berkala",reminder:"Saling Ngingetken",appreciation:"Apresiasi Rekan",suggestion:"Usulkan Materi"};
document.querySelectorAll("[data-form]").forEach(btn=>btn.addEventListener("click",()=>{
const key=btn.getAttribute("data-form");const url=(window.NGINGETKEN_FORMS||{})[key]||"";
if(/^https:\/\/forms\.(office\.com|microsoft\.com)\//i.test(url)){window.open(url,"_blank","noopener,noreferrer");return;}
byId("formTitle").textContent=labels[key]+" belum aktif";byId("formDialog").showModal();
}));
const mobile=byId("mobileMenu");mobile.addEventListener("click",()=>{let open=byId("navitems").classList.toggle("open");mobile.setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#navitems a").forEach(a=>a.addEventListener("click",()=>{byId("navitems").classList.remove("open");mobile.setAttribute("aria-expanded","false");}));
document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)&&!byId("articleDialog").open&&!byId("formDialog").open){e.preventDefault();byId("search").focus();}});
filters();articles();
