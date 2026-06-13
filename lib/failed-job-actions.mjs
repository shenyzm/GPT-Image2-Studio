// Pure helpers for the failed-job retry lifecycle. Kept out of the app shell
// so the shell stays within its line budget and the logic is unit-testable.

import { buildGenerationTaskStatusText } from "./generation-activity-feed.mjs";

// Produce the patch that marks a job as failed while preserving every
// parameter needed to re-run it (prompt, ratio, size, reference files, ...).
export function buildFailedJobPatch(message) {
  const errorMessage = message || "生成失败";
  return {
    failed: true,
    isRunning: false,
    started: true,
    status: "error",
    statusStage: "error",
    errorMessage,
    statusText: errorMessage,
    previewUrl: "",
  };
}

// Build the contents of the preview placeholder for a failed job: the error
// text, a hint, and Retry / Dismiss buttons wired to the supplied callbacks.
// Returns an array of nodes for the caller to append.
export function buildFailedPreviewNodes(placeholderState, item, { onRetry, onDismiss } = {}) {
  const nodes = [];

  if (placeholderState.statusText) {
    const status = document.createElement("p");
    status.className = "preview-placeholder-error";
    status.textContent = placeholderState.statusText;
    nodes.push(status);
  }

  const detail = document.createElement("span");
  detail.textContent = placeholderState.detail;
  nodes.push(detail);

  if (item?.id) {
    const actions = document.createElement("div");
    actions.className = "preview-placeholder-actions";

    const retry = document.createElement("button");
    retry.type = "button";
    retry.className = "toolbar-button strong";
    retry.textContent = "重试";
    retry.addEventListener("click", () => onRetry?.(item.id));
    actions.appendChild(retry);

    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "toolbar-button";
    dismiss.textContent = "关闭";
    dismiss.addEventListener("click", () => onDismiss?.(item.id));
    actions.appendChild(dismiss);

    nodes.push(actions);
  }

  return nodes;
}

// Produce the patch that resets a failed job back to a queued state so the
// normal generation scheduler will pick it up again.
export function buildRetryJobPatch() {
  return {
    failed: false,
    started: false,
    isRunning: false,
    status: "running",
    statusStage: "queued",
    statusText: buildGenerationTaskStatusText({ statusStage: "queued", statusText: "等待并发槽位" }),
    errorMessage: "",
    previewUrl: "",
    requestRetryCount: 0,
  };
}

