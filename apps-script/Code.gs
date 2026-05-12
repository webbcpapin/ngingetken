
/**
 * Ngingetken MVP v5 - Opsi 1 Form Asli + Histori
 * Frontend HTML internal -> Google Apps Script -> Google Sheet.
 *
 * Cara pakai:
 * 1. Buat Google Sheet.
 * 2. Paste ID sheet ke SPREADSHEET_ID.
 * 3. Deploy sebagai Web App.
 * 4. Masukkan URL Web App ke assets/js/config.js.
 */
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID';
const ADMIN_TOKEN = 'ganti-token-rahasia';

const SHEETS = {
  PEGAWAI: 'pegawai',
  PERIODE: 'periode',
  RESPONSES: 'responses',
  MONITORING: 'monitoring',
  FOLLOWUP: 'follow_up',
  QUESTIONS: 'form_questions',
  SETTINGS: 'app_settings',
  LOG: 'log_activity'
};

const HEADERS = {
  pegawai: ['pegawai_id','nip','nama','email','unit','jabatan','status_aktif','created_at','updated_at'],
  periode: ['periode_id','nama_periode','tanggal_mulai','tanggal_deadline','form_url','status','created_at'],
  responses: ['response_id','periode_id','periode_bulan','pegawai_id','nama','email','nip','unit','waktu_submit','sumber_form','status_validasi','answer_json','pernyataan','salinan_pernyataan','catatan','integrity_score','risk_level','created_at'],
  monitoring: ['monitoring_id','periode_id','pegawai_id','nama','nip','email','unit','jabatan','status_pengisian','waktu_submit','catatan_admin','integrity_score','risk_level','updated_at'],
  follow_up: ['followup_id','periode_id','pegawai_id','nama','prioritas','status','catatan','created_by','created_at','updated_at'],
  form_questions: ['question_id','pertanyaan','opsi','bobot','status_aktif','urutan'],
  app_settings: ['key','value','updated_at'],
  log_activity: ['log_id','user','aktivitas','waktu','detail']
};

const WRITE_ACTIONS = new Set(['setupDatabase','createEmployee','createPeriod','createFollowUp','updateFollowUp','updateMonitoringNote']);
const PUBLIC_WRITE_ACTIONS = new Set(['submitHtmlForm']);

function doGet(e){try{const p=e&&e.parameter?e.parameter:{};const action=p.action||'health';enforceToken(action,p);return jsonOutput({success:true,data:route(action,p)});}catch(err){return jsonOutput({success:false,message:err.message});}}
function doPost(e){try{const body=JSON.parse((e.postData&&e.postData.contents)||'{}');const p=Object.assign({},e.parameter||{},body);const action=p.action||'health';enforceToken(action,p);return jsonOutput({success:true,data:route(action,p)});}catch(err){return jsonOutput({success:false,message:err.message});}}

function route(action,p){switch(action){
  case 'health': return {status:'ok',app:'Ngingetken API v4'};
  case 'setupDatabase': return setupDatabase();
  case 'getActivePeriod': return getActivePeriod();
  case 'getDashboardData': return getDashboardData();
  case 'getExecutiveSummary': return getDashboardData();
  case 'getEmployees': return getRows(SHEETS.PEGAWAI);
  case 'getPeriods': return getRows(SHEETS.PERIODE);
  case 'getMonitoringData': return syncMonitoring(p.periodId);
  case 'getFollowUps': return getRows(SHEETS.FOLLOWUP);
  case 'getAuditLogs': return getRows(SHEETS.LOG).slice(-200).reverse();
  case 'getFormQuestions': return getRows(SHEETS.QUESTIONS).filter(q=>String(q.status_aktif).toLowerCase()!=='false');
  case 'lookupEmployeeHistory': return lookupEmployeeHistory(p.nama);
  case 'getEmployeeHistory': return getEmployeeHistory(p.pegawai_id || p.employee_id);
  case 'submitHtmlForm': return submitHtmlForm(p.response || p);
  case 'createEmployee': return createEmployee(p.employee || p);
  case 'createPeriod': return createPeriod(p.period || p);
  case 'createFollowUp': return createFollowUp(p.followup || p);
  case 'updateFollowUp': return updateFollowUp(p.followup_id, p.status, p.catatan);
  case 'updateMonitoringNote': return updateMonitoringNote(p.monitoring_id, p.catatan_admin);
  default: throw new Error('Action tidak dikenal: '+action);
}}
function enforceToken(action,p){if(PUBLIC_WRITE_ACTIONS.has(action))return;if(WRITE_ACTIONS.has(action)&&ADMIN_TOKEN&&String(p.token||'')!==String(ADMIN_TOKEN))throw new Error('Token admin tidak valid');}
function ss(){return SpreadsheetApp.openById(SPREADSHEET_ID)}
function sheet(name){const sh=ss().getSheetByName(name);if(!sh)throw new Error('Sheet tidak ditemukan: '+name);return sh;}
function jsonOutput(payload){return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON)}

function setupDatabase(){const book=ss();Object.keys(HEADERS).forEach(name=>{let sh=book.getSheetByName(name);if(!sh)sh=book.insertSheet(name);const headers=HEADERS[name];if(sh.getLastRow()===0){sh.appendRow(headers);}else{const current=sh.getRange(1,1,1,Math.max(sh.getLastColumn(),headers.length)).getValues()[0];headers.forEach((h,i)=>{if(!current.includes(h))sh.getRange(1,sh.getLastColumn()+1).setValue(h);});}});
  seedIfEmpty();logActivity('system','setupDatabase','Database v4 disiapkan');return {message:'Database Ngingetken v4 siap',sheets:Object.keys(HEADERS)};}
function seedIfEmpty(){if(!getRows(SHEETS.PERIODE).length)appendRow(SHEETS.PERIODE,{periode_id:'PRD202605',nama_periode:'Mei 2026',tanggal_mulai:'2026-05-01',tanggal_deadline:deadlineNextMonthSix('2026-05-01'),form_url:'isi.html',status:'Aktif',created_at:new Date()});
  if(!getRows(SHEETS.PEGAWAI).length){[['PGW001','Ahmad Pratama','PKCDT'],['PGW002','Siti Rahma','Perbendaharaan'],['PGW003','Budi Santoso','P2']].forEach(r=>appendRow(SHEETS.PEGAWAI,{pegawai_id:r[0],nip:'',nama:r[1],email:'',unit:r[2],jabatan:'',status_aktif:true,created_at:new Date(),updated_at:new Date()}));}
  if(!getRows(SHEETS.QUESTIONS).length){[
    ['q4_gratifikasi','Apakah anda mengetahui adanya praktik gratifikasi?','Ya|Tidak|Ragu-ragu',15,true,4],
    ['q5_suap','Apakah anda mengetahui adanya praktik suap menyuap?','Ya|Tidak|Ragu-ragu',15,true,5],
    ['q6_curang','Apakah anda mengetahui adanya praktik curang?','Ya|Tidak|Ragu-ragu',15,true,6],
    ['q7_pemerasan','Apakah anda mengetahui adanya praktik pemerasan?','Ya|Tidak|Ragu-ragu',15,true,7],
    ['q8_kode_etik','Apakah anda mengetahui adanya praktik pelanggaran kode etik?','Ya|Tidak|Ragu-ragu',10,true,8],
    ['q9_gaya_hidup_mewah','Apakah anda mengetahui adanya gaya hidup mewah?','Ya|Tidak|Ragu-ragu',10,true,9],
    ['q10_benturan_kepentingan','Apakah anda mengetahui adanya benturan kepentingan?','Ya|Tidak|Ragu-ragu',10,true,10],
    ['q11_penggelapan_jabatan','Apakah anda mengetahui adanya penggelapan dalam jabatan?','Ya|Tidak|Ragu-ragu',10,true,11]
  ].forEach(q=>appendRow(SHEETS.QUESTIONS,{question_id:q[0],pertanyaan:q[1],opsi:q[2],bobot:q[3],status_aktif:q[4],urutan:q[5]}));}}

function getRows(name){const sh=sheet(name);const values=sh.getDataRange().getValues();if(values.length<2)return [];const headers=values[0].map(String);return values.slice(1).filter(r=>r.some(c=>c!==''&&c!==null)).map(r=>{const o={};headers.forEach((h,i)=>o[h]=normalize(r[i]));return o;});}
function appendRow(name,obj){const sh=sheet(name);const headers=HEADERS[name] || sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];const row=headers.map(h=>obj[h]!==undefined?obj[h]:'');sh.appendRow(row);return obj;}
function normalize(v){if(v instanceof Date)return Utilities.formatDate(v,Session.getScriptTimeZone(),'yyyy-MM-dd HH:mm:ss');return v;}
function now(){return Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyy-MM-dd HH:mm:ss')}
function getActivePeriod(){const p=getRows(SHEETS.PERIODE).find(x=>String(x.status).toLowerCase()==='aktif');if(!p)throw new Error('Periode aktif belum diset');return p;}
function activeEmployees(){return getRows(SHEETS.PEGAWAI).filter(e=>String(e.status_aktif).toLowerCase()!=='false'&&String(e.status_aktif)!=='0');}
function findEmployee(employees,input){const nama=String(input.nama||'').trim().toLowerCase();return employees.find(e=>String(e.nama||'').trim().toLowerCase()===nama);}
function riskFromAnswers(answerJson,catatan){let answers={};try{answers=typeof answerJson==='string'?JSON.parse(answerJson||'{}'):(answerJson||{});}catch(e){answers={};}let score=100;Object.keys(answers).forEach(k=>{const v=String(answers[k]||'').toLowerCase();if(v==='ya')score-=12;else if(v.indexOf('ragu')>=0)score-=6;});if(String(catatan||'').trim().length>30)score-=3;score=Math.max(0,Math.min(100,score));return {score:score,level:score>=85?'Rendah':score>=65?'Sedang':'Tinggi'};}
function submitHtmlForm(input){const period=getActivePeriod();const employees=activeEmployees();const emp=findEmployee(employees,input);const answerJson=typeof input.answers==='string'?input.answers:JSON.stringify(input.answers||{});const risk=riskFromAnswers(answerJson,input.catatan);const exists=getRows(SHEETS.RESPONSES).find(r=>r.periode_id===period.periode_id && ((emp&&r.pegawai_id===emp.pegawai_id)||String(r.nama||'').trim().toLowerCase()===String(input.nama||'').trim().toLowerCase()));
  if(exists)throw new Error('Pengisian untuk periode ini sudah tercatat. Hubungi admin jika perlu perbaikan.');
  const obj={response_id:'RSP'+Date.now(),periode_id:period.periode_id,periode_bulan:input.periode_bulan||'',pegawai_id:emp?emp.pegawai_id:'',nama:input.nama||(emp&&emp.nama)||'',email:'',nip:'',unit:input.unit||(emp&&emp.unit)||'',waktu_submit:now(),sumber_form:'HTML Internal',status_validasi:emp?'Valid':'Perlu Cek',answer_json:answerJson,pernyataan:'Setuju',salinan_pernyataan:input.salinan_pernyataan||'',catatan:input.catatan||'',integrity_score:risk.score,risk_level:risk.level,created_at:now()};appendRow(SHEETS.RESPONSES,obj);syncMonitoring(period.periode_id);logActivity(obj.nama,'submitHtmlForm','Pengisian HTML periode '+period.periode_id);return obj;}
function syncMonitoring(periodId){const period=periodId?getRows(SHEETS.PERIODE).find(p=>p.periode_id===periodId):getActivePeriod();const employees=activeEmployees();const responses=getRows(SHEETS.RESPONSES).filter(r=>r.periode_id===period.periode_id);const old=getRows(SHEETS.MONITORING).filter(m=>m.periode_id!==period.periode_id);const sh=sheet(SHEETS.MONITORING);sh.clear();sh.appendRow(HEADERS.monitoring);old.forEach(o=>appendRow(SHEETS.MONITORING,o));const rows=employees.map(emp=>{const rsp=responses.find(r=>r.pegawai_id===emp.pegawai_id||String(r.nama||'').trim().toLowerCase()===String(emp.nama||'').trim().toLowerCase());return {monitoring_id:period.periode_id+'-'+emp.pegawai_id,periode_id:period.periode_id,pegawai_id:emp.pegawai_id,nama:emp.nama,nip:'',email:'',unit:emp.unit,jabatan:'',status_pengisian:rsp?'Sudah Mengisi':'Belum Mengisi',waktu_submit:rsp?rsp.waktu_submit:'',catatan_admin:'',integrity_score:rsp?rsp.integrity_score:'',risk_level:rsp?rsp.risk_level:'',updated_at:now()};});rows.forEach(r=>appendRow(SHEETS.MONITORING,r));return rows;}
function getDashboardData(){const activePeriod=getActivePeriod();const monitoring=syncMonitoring(activePeriod.periode_id);const total=monitoring.length;const submitted=monitoring.filter(m=>m.status_pengisian==='Sudah Mengisi').length;const pending=total-submitted;const percentage=total?Math.round(submitted/total*1000)/10:0;const byUnit={};monitoring.forEach(m=>{const u=m.unit||'-';byUnit[u]=byUnit[u]||{unit:u,total:0,submitted:0,pending:0};byUnit[u].total++;if(m.status_pengisian==='Sudah Mengisi')byUnit[u].submitted++;else byUnit[u].pending++;});const riskSummary={rendah:0,sedang:0,tinggi:0};monitoring.forEach(m=>{if(m.risk_level==='Rendah')riskSummary.rendah++;if(m.risk_level==='Sedang')riskSummary.sedang++;if(m.risk_level==='Tinggi')riskSummary.tinggi++;});return {activePeriod:activePeriod,summary:{total:total,submitted:submitted,pending:pending,percentage:percentage,riskSummary:riskSummary},byUnit:Object.values(byUnit),monitoring:monitoring,followups:getRows(SHEETS.FOLLOWUP).filter(f=>String(f.status).toLowerCase()!=='closed')};}

function lookupEmployeeHistory(query){const q=String(query||'').trim().toLowerCase();if(!q)throw new Error('Nama wajib diisi');const employees=activeEmployees();const emp=employees.find(e=>String(e.nama||'').trim().toLowerCase()===q)||employees.find(e=>String(e.nama||'').toLowerCase().indexOf(q)>=0);if(!emp)throw new Error('Pegawai tidak ditemukan');const responses=getRows(SHEETS.RESPONSES).filter(r=>r.pegawai_id===emp.pegawai_id||String(r.nama||'').trim().toLowerCase()===String(emp.nama||'').trim().toLowerCase());responses.sort((a,b)=>String(b.waktu_submit||'').localeCompare(String(a.waktu_submit||'')));return {employee:emp,lastResponse:responses[0]||null,totalResponses:responses.length};}

function createEmployee(input){const obj={pegawai_id:input.pegawai_id||'PGW'+Date.now(),nip:'',nama:input.nama||'',email:'',unit:input.unit||'',jabatan:'',status_aktif:input.status_aktif!==false,created_at:now(),updated_at:now()};appendRow(SHEETS.PEGAWAI,obj);logActivity('admin','createEmployee',obj.nama);return obj;}
function deadlineNextMonthSix(startDate){if(!startDate)return '';const d=new Date(startDate+'T00:00:00');return Utilities.formatDate(new Date(d.getFullYear(),d.getMonth()+1,6),Session.getScriptTimeZone(),'yyyy-MM-dd');}
function createPeriod(input){if(input.status==='Aktif'){const sh=sheet(SHEETS.PERIODE);const rows=getRows(SHEETS.PERIODE);sh.clear();sh.appendRow(HEADERS.periode);rows.forEach(r=>{if(r.status==='Aktif')r.status='Selesai';appendRow(SHEETS.PERIODE,r);});}const obj={periode_id:input.periode_id||'PRD'+Date.now(),nama_periode:input.nama_periode||'',tanggal_mulai:input.tanggal_mulai||'',tanggal_deadline:deadlineNextMonthSix(input.tanggal_mulai),form_url:input.form_url||'isi.html',status:input.status||'Draft',created_at:now()};appendRow(SHEETS.PERIODE,obj);logActivity('admin','createPeriod',obj.nama_periode);return obj;}
function createFollowUp(input){const obj={followup_id:'TL'+Date.now(),periode_id:input.periode_id||getActivePeriod().periode_id,pegawai_id:input.pegawai_id||'',nama:input.nama||'',prioritas:input.prioritas||'Medium',status:input.status||'Open',catatan:input.catatan||'',created_by:'admin',created_at:now(),updated_at:now()};appendRow(SHEETS.FOLLOWUP,obj);logActivity('admin','createFollowUp',obj.nama+' - '+obj.catatan);return obj;}
function updateFollowUp(id,status,catatan){const sh=sheet(SHEETS.FOLLOWUP);const values=sh.getDataRange().getValues();const headers=values[0];for(let i=1;i<values.length;i++){if(values[i][headers.indexOf('followup_id')]==id){if(status)sh.getRange(i+1,headers.indexOf('status')+1).setValue(status);if(catatan)sh.getRange(i+1,headers.indexOf('catatan')+1).setValue(catatan);sh.getRange(i+1,headers.indexOf('updated_at')+1).setValue(now());logActivity('admin','updateFollowUp',id+' -> '+status);return {followup_id:id,status:status};}}throw new Error('Tindak lanjut tidak ditemukan');}
function updateMonitoringNote(id,note){const sh=sheet(SHEETS.MONITORING);const values=sh.getDataRange().getValues();const headers=values[0];for(let i=1;i<values.length;i++){if(values[i][headers.indexOf('monitoring_id')]==id){sh.getRange(i+1,headers.indexOf('catatan_admin')+1).setValue(note);return {monitoring_id:id,catatan_admin:note};}}throw new Error('Monitoring tidak ditemukan');}
function getEmployeeHistory(pegawaiId){const employees=getRows(SHEETS.PEGAWAI);const emp=employees.find(e=>e.pegawai_id===pegawaiId)||employees[0]||{};return {employee:emp,responses:getRows(SHEETS.RESPONSES).filter(r=>r.pegawai_id===emp.pegawai_id||String(r.nama||'').trim().toLowerCase()===String(emp.nama||'').trim().toLowerCase()),monitoring:getRows(SHEETS.MONITORING).filter(m=>m.pegawai_id===emp.pegawai_id),followups:getRows(SHEETS.FOLLOWUP).filter(f=>f.pegawai_id===emp.pegawai_id)};}
function logActivity(user,activity,detail){try{appendRow(SHEETS.LOG,{log_id:'LOG'+Date.now(),user:user||'system',aktivitas:activity,waktu:now(),detail:detail||''});}catch(e){}}
