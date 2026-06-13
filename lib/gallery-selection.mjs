// Pure helpers for gallery multi-select / batch deletion. Kept out of the app
// shell so the shell stays within its line budget and logic is unit-testable.

// Toggle one filename in the selection set (mutates the set in place).
export function toggleSelection(selection, filename) {
  if (selection.has(filename)) {
    selection.delete(filename);
  } else {
    selection.add(filename);
  }
  return selection;
}

// Add every visible item's filename to the selection set.
export function selectAll(selection, visibleItems) {
  (Array.isArray(visibleItems) ? visibleItems : []).forEach((item) => {
    if (item?.filename) {
      selection.add(item.filename);
    }
  });
  return selection;
}

// Format the "已选 N 张" pill label.
export function formatSelectionCountLabel(count) {
  return `已选 ${count} 张`;
}

// Build the multi-select toggle button label for the current mode.
export function formatMultiSelectButtonLabel(active) {
  return active ? "退出多选" : "多选";
}

// Build the confirmation message shown before a batch delete.
export function formatBatchDeleteConfirm(count) {
  return `确定要删除选中的 ${count} 张图片吗？此操作不可撤销。`;
}

// Resolve the gallery items matching the selected filenames, preserving the
// gallery's order so deletion is deterministic.
export function resolveSelectedItems(gallery, selection) {
  return (Array.isArray(gallery) ? gallery : []).filter((item) => selection.has(item?.filename));
}
