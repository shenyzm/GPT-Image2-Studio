import test from "node:test";
import assert from "node:assert/strict";

import {
  toggleSelection,
  selectAll,
  formatSelectionCountLabel,
  formatMultiSelectButtonLabel,
  formatBatchDeleteConfirm,
  resolveSelectedItems,
} from "../lib/gallery-selection.mjs";

test("toggleSelection adds and removes a filename", () => {
  const selection = new Set();
  toggleSelection(selection, "a.png");
  assert.ok(selection.has("a.png"));
  toggleSelection(selection, "a.png");
  assert.ok(!selection.has("a.png"));
});

test("selectAll adds every visible item's filename and ignores blanks", () => {
  const selection = new Set();
  selectAll(selection, [{ filename: "a.png" }, { filename: "b.png" }, {}, null]);
  assert.deepEqual([...selection].sort(), ["a.png", "b.png"]);
});

test("selectAll preserves prior selections", () => {
  const selection = new Set(["x.png"]);
  selectAll(selection, [{ filename: "y.png" }]);
  assert.deepEqual([...selection].sort(), ["x.png", "y.png"]);
});

test("formatSelectionCountLabel renders the selected count", () => {
  assert.equal(formatSelectionCountLabel(0), "已选 0 张");
  assert.equal(formatSelectionCountLabel(3), "已选 3 张");
});

test("formatMultiSelectButtonLabel reflects active state", () => {
  assert.equal(formatMultiSelectButtonLabel(true), "退出多选");
  assert.equal(formatMultiSelectButtonLabel(false), "多选");
});

test("formatBatchDeleteConfirm includes the count and irreversibility note", () => {
  const message = formatBatchDeleteConfirm(5);
  assert.match(message, /5/);
  assert.match(message, /不可撤销/);
});

test("resolveSelectedItems returns gallery items in gallery order", () => {
  const gallery = [{ filename: "a.png" }, { filename: "b.png" }, { filename: "c.png" }];
  const selection = new Set(["c.png", "a.png"]);
  const resolved = resolveSelectedItems(gallery, selection);
  assert.deepEqual(
    resolved.map((item) => item.filename),
    ["a.png", "c.png"],
  );
});

test("resolveSelectedItems tolerates non-array gallery input", () => {
  assert.deepEqual(resolveSelectedItems(null, new Set(["a.png"])), []);
});
