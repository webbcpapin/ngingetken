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
  context.window.NGINGETKEN_DRIVE_MATERIALS = extraMaterials;
  vm.runInContext(fs.readFileSync(path.join(base, "knowledge.js"), "utf8"), context);
  get("filters").click({ target: { closest: () => filterButtons[1] } });
  return { get };
}

const empty = load([]);
assert.equal(empty.get("results").children.length, 0);
assert.match(empty.get("empty-message").textContent, /Belum ada tautan Google Drive/);

const valid = load([
  { id: "a", title: "Panduan", url: "https://drive.google.com/file/d/example/view", access: "Organisasi" },
  { id: "b", title: "Tidak valid", url: "https://drive.google.com.evil.example/file/d/example/view" },
  { id: "c", title: "Belum diunggah" },
]);
assert.equal(valid.get("results").children.length, 1);
assert.equal(valid.get("results").children[0].children[2].textContent, "Panduan");
assert.equal(valid.get("results").children[0].children[4].children[1].href, "https://drive.google.com/file/d/example/view");
console.log("Katalog Drive: tautan kosong dan domain tidak sah tidak ditampilkan.");
