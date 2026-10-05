const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../apps-script/Code.gs'), 'utf8');

function backend(instant = '2026-10-05T05:00:00Z') {
  const props = new Map();
  let clock = instant;
  let locked = false;
  let writes = 0;
  const context = vm.createContext({
    Date: class extends Date {
      constructor(...args) { super(...(args.length ? args : [clock])); }
    },
    Utilities: { formatDate(date, zone, format) {
      const fields = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
        timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit'
      }).formatToParts(date).map(p => [p.type, p.value]));
      const day = `${fields.year}-${fields.month}-${fields.day}`;
      return format === 'yyyy-MM-dd' ? day : `${day} 12:00:00`;
    } },
    Session: { getScriptTimeZone: () => 'Asia/Jakarta' },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: k => props.get(k),
      setProperty: (k, v) => props.set(k, v),
      deleteProperty: k => props.delete(k)
    }) },
    LockService: { getScriptLock: () => ({
      waitLock() { assert.equal(locked, false); locked = true; },
      releaseLock() { locked = false; }
    }) }
  });
  vm.runInContext(source, context);
  let rows = JSON.parse(vm.runInContext('JSON.stringify(SEED_PERIODS)', context));
  context.getRows = name => { assert.equal(name, 'periode'); return structuredClone(rows); };
  context.getRowsCached = name => context.getRows(name);
  context.logActivity = () => {};
  context.savePeriodRows_ = next => {
    assert.equal(locked, true, 'period writes must be serialized');
    rows = structuredClone(next); writes++;
    props.delete('ngingetken_period_sync_date');
  };
  return {
    context, props,
    run: (action, p = {}) => context.route(action, p),
    setDate: date => { clock = date; },
    rows: () => structuredClone(rows),
    writes: () => writes,
    locked: () => locked
  };
}

test('September opens October 1 WIB and remains open through October 6', () => {
  const b = backend('2026-09-30T16:59:59Z');
  assert.throws(() => b.run('getActivePeriod'), /Tidak ada periode/);
  b.setDate('2026-09-30T17:00:00Z');
  assert.equal(b.run('getActivePeriod').periode_id, 'PRD2026SEP');
  b.setDate('2026-10-06T16:59:59Z');
  assert.equal(b.run('getActivePeriod').periode_id, 'PRD2026SEP');
  b.setDate('2026-10-06T17:00:00Z');
  assert.throws(() => b.run('getActivePeriod'), /Tidak ada periode/);
  assert.equal(b.locked(), false);
  assert.equal(b.rows().find(r => r.periode_id === 'PRD2026OKT').status, 'Draft');
});

test('manual activate and close persist across date changes; automatic can resume', () => {
  const b = backend();
  b.run('updatePeriodStatus', { periode_id: 'PRD2026AGU', status: 'Aktif' });
  assert.equal(b.run('getPeriodManagement').mode, 'manual');
  assert.equal(b.rows().filter(r => r.status === 'Aktif').length, 1);
  b.setDate('2026-11-01T01:00:00Z');
  assert.equal(b.run('getActivePeriod').periode_id, 'PRD2026AGU');
  b.run('updatePeriodStatus', { periode_id: 'PRD2026AGU', status: 'Selesai' });
  assert.throws(() => b.run('getActivePeriod'), /Tidak ada periode/);
  b.run('setPeriodMode', { mode: 'automatic' });
  assert.equal(b.run('getActivePeriod').periode_id, 'PRD2026OKT');
});

test('new year periods are created once and December submissions count in January', () => {
  const b = backend('2027-01-03T01:00:00Z');
  const december = b.run('getActivePeriod');
  assert.equal(december.periode_id, 'PRD2026DES');
  assert.equal(b.context.responseMatchesPeriod({ periode_id: december.periode_id, waktu_submit: '2027-01-03' }, december), true);
  assert.equal(b.context.responseMatchesPeriod({ periode_id: december.periode_id, waktu_submit: '2025-12-03' }, december), false);
  b.setDate('2027-02-01T01:00:00Z');
  assert.equal(b.run('getActivePeriod').nama_periode, 'Januari 2027');
  const count = b.rows().length;
  b.context.syncPeriodSchedule();
  assert.equal(b.rows().length, count);
});

test('custom deadline is honored and repeated daily reads do not rewrite data', () => {
  const b = backend('2026-10-05T01:00:00Z');
  b.run('updatePeriodDetails', { periode_id: 'PRD2026SEP', tanggal_deadline: '2026-10-10' });
  b.setDate('2026-10-09T01:00:00Z');
  assert.equal(b.run('getActivePeriod').periode_id, 'PRD2026SEP');
  const writes = b.writes();
  b.run('getPeriods'); b.run('getPeriodManagement');
  assert.equal(b.writes(), writes);
  b.setDate('2026-10-10T17:00:00Z');
  assert.throws(() => b.run('getActivePeriod'), /Tidak ada periode/);
});

test('invalid actions do not change mode and stale forms cannot move answers to a new period', () => {
  const b = backend();
  assert.throws(() => b.run('updatePeriodStatus', {periode_id:'missing', status:'Aktif'}), /tidak ditemukan/);
  assert.throws(() => b.run('updatePeriodStatus', {periode_id:'PRD2026SEP', status:'invalid'}), /tidak valid/);
  assert.equal(b.run('getPeriodManagement').mode, 'automatic');
  assert.throws(() => b.run('submitHtmlForm', {response:{periode_id:'PRD2026AGU'}}), /telah berubah/);
  assert.throws(() => b.context.enforceToken('setPeriodMode', {token:'invalid'}), /Token admin/);
  assert.equal(b.locked(), false);
});

test('duplicate months are rejected; creating an active period selects manual mode', () => {
  const b = backend();
  assert.throws(() => b.run('createPeriod', {period:{tanggal_mulai:'2026-09-01'}}), /sudah ada/);
  b.run('createPeriod', {period:{nama_periode:'Januari 2027',tanggal_mulai:'2027-01-01',status:'Aktif'}});
  assert.equal(b.run('getPeriodManagement').mode, 'manual');
  assert.equal(b.rows().filter(r => r.status === 'Aktif').length, 1);
});

test('period page scripts compile and status buttons use delegated handlers', () => {
  const html = fs.readFileSync(path.join(__dirname, '../periode.html'), 'utf8');
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
  assert.ok(html.includes('data-period-id='));
  assert.ok(!html.includes('onclick="setPeriodStatus('));
});

test('reports select the last reporting period while submissions are closed', () => {
  const b = backend('2026-10-07T01:00:00Z');
  const periods = b.run('getPeriods');
  assert.equal(b.context.reportingPeriod_(periods).periode_id, 'PRD2026SEP');
  assert.throws(() => b.run('getActivePeriod'), /Tidak ada periode/);
});

test('live period requests fail closed instead of returning demo data', async () => {
  const api = fs.readFileSync(path.join(__dirname, '../assets/js/api.js'), 'utf8');
  const ctx = vm.createContext({
    window: { NGINGETKEN_CONFIG: { API_URL: 'https://example.invalid/exec' } },
    console: { warn() {} }, fetch: async () => { throw new Error('offline'); }, setTimeout
  });
  vm.runInContext(api, ctx);
  for (const action of ['getActivePeriod','getPeriods','getPeriodManagement']) {
    await assert.rejects(ctx.requestApi(action), /Data Google Sheet belum terbaca/);
  }
  await assert.rejects(ctx.requestApi('setPeriodMode', {mode:'automatic'}), /Data belum tersimpan/);
  const period = {periode_id:'PRD2026JUL',tanggal_deadline:'2026-08-12'};
  assert.equal(ctx.normalizeBackendPeriodNames(period).tanggal_deadline, '2026-08-12');
});
