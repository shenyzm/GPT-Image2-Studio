/**
 * Shared normalization functions used by both server.mjs and cloudflare-pages-worker.mjs
 */

import { DEFAULT_REASONING_EFFORT, REASONING_EFFORT_OPTIONS } from "../studio-constants.mjs";
import { IMAGE_DECOMPOSITION_MODE } from "../image-decomposition-prompt.mjs";
import { QUICK_BLEND_MODE } from "../quick-blend-prompt.mjs";

const GENERATION_MODES = new Set([
  "style-transfer",
  "reference-analysis",
  IMAGE_DECOMPOSITION_MODE,
  QUICK_BLEND_MODE,
  "portrait",
]);

/**
 * Normalize generation mode value
 * @param {string} value - The generation mode to normalize
 * @returns {string} The normalized mode, or empty string if invalid
 */
export function normalizeGenerationMode(value) {
  const mode = String(value || "").trim();
  return GENERATION_MODES.has(mode) ? mode : "";
}

/**
 * Normalize reasoning effort value
 * @param {string} value - The reasoning effort to normalize
 * @param {string} fallback - The fallback value if normalization fails
 * @returns {string} The normalized reasoning effort
 * @throws {Error} If the value is invalid
 */
export function normalizeReasoningEffort(value, fallback = DEFAULT_REASONING_EFFORT) {
  const normalized = String(value || "").trim().toLowerCase();
  if (!normalized) {
    return fallback;
  }
  if (!REASONING_EFFORT_OPTIONS.includes(normalized)) {
    throw new Error(`不支持的推理强度: ${normalized}`);
  }
  return normalized;
}
