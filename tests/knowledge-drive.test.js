const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const base = path.join(__dirname, "..", "pengetahuan");

function element() {
  return {
    children: [],
    value: "",
    textContent: "",
    dataset: {},
    classList: { toggle() {} },
    append(...items) { this.children.push(...items); },
    replaceChildren() { this.children = []; },
    addEventListener(name, callback) { this[name] = callback; },
    setAttribute() {},
  };
}

function load(extraMaterials) {
  const ids = new Map();
  const get = id => {
    if (!ids.has(id)) ids.set(id, element());
    return ids.get(id);
  };
  const filterButtons = ["Semua", "Paparan"].map(filter => ({
    dataset: { filter }, classList: { toggle() {} }, setAttribute() {},
  }));
  const context = {
    URL,
    window: {},
    document: {
      getElementById: get,
      createElement: element,
      createTextNode: text => text,
      querySelectorAll: () => filterButtons,
    },
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(base, "library.js"), "utf8"), context);
  vm.runInContext(fs.readFileSync(path.join(base, "drive-materials.js"), "utf8"), context);
  if (extraMaterials !== undefined) context.window.NGINGETKEN_DRIVE_MATERIALS = extraMaterials;
  vm.runInContext(fs.readFileSync(path.join(base, "knowledge.js"), "utf8"), context);
  get("filters").click({ target: { closest: () => filterButtons[1] } });
  return { get };
}

const empty = load([]);
assert.equal(empty.get("results").children.length, 0);
assert.match(empty.get("empty-message").textContent, /Belum ada tautan Google Drive/);

const valid = load([
  { id: "a", title: "Panduan", url: "https://drive.google.com/drive/folders/example" },
  { id: "b", title: "Tidak valid", url: "https://drive.google.com.evil.example/file/d/example/view" },
  { id: "c", title: "Belum diunggah" },
  { id: "d", title: "Materi Lainnya", status: "pending" },
]);
assert.equal(valid.get("results").children.length, 2);
assert.equal(valid.get("results").children[0].children[2].textContent, "Panduan");
assert.equal(valid.get("results").children[0].children[4].children[1].href, "https://drive.google.com/drive/folders/example");
assert.equal(valid.get("results").children[1].children[2].textContent, "Materi Lainnya");
assert.equal(valid.get("results").children[1].children[4].children.length, 1);
const published = load();
assert.equal(published.get("results").children.length, 9);
assert.equal(published.get("results").children.filter(card => card.children[4].children.length === 2).length, 8);
assert.equal(published.get("results").children[8].children[2].textContent, "Materi Lainnya");
console.log("Katalog Drive: hanya folder sah bertautan; Materi Lainnya tampil tanpa tautan.");
