/**
 * Shared image utility functions used by both server.mjs and cloudflare-pages-worker.mjs
 */

import { normalizeBase64 } from "../responses-workflow.mjs";
import { normalizeCreationLogoOptions } from "../creation-planner.mjs";

/**
 * Convert ArrayBuffer to base64 string
 * Works in both Node.js and browser/Cloudflare Workers environments
 * @param {ArrayBuffer} arrayBuffer - The buffer to convert
 * @returns {string} Base64 encoded string
 */
export function arrayBufferToBase64(arrayBuffer) {
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  // Use btoa in browser/Cloudflare Workers environment
  if (typeof btoa === "function") {
    return btoa(binary);
  }

  // Use Buffer in Node.js environment
  return Buffer.from(bytes).toString("base64");
}

/**
 * Convert uploaded files to reference image objects
 * @param {Array} files - Array of File objects from FormData
 * @returns {Promise<Array>} Array of reference image objects with filename, mimeType, and base64
 */
export async function toReferenceImages(files) {
  const validFiles = files.filter(
    (file) =>
      file &&
      typeof file === "object" &&
      typeof file.arrayBuffer === "function" &&
      Number(file.size || 0) > 0,
  );

  return Promise.all(
    validFiles.map(async (file, index) => {
      const buffer = await file.arrayBuffer();
      const base64 = normalizeBase64(arrayBufferToBase64(buffer));

      // In Node.js, also include the Buffer for backward compatibility
      const result = {
        filename: file.name || `reference-image-${index + 1}`,
        mimeType: file.type || "application/octet-stream",
        base64,
      };

      // Add Buffer only in Node.js environment (when Buffer is available)
      if (typeof Buffer !== "undefined" && typeof Buffer.from === "function") {
        result.buffer = Buffer.from(buffer);
      }

      return result;
    }),
  );
}

/**
 * Read creation logo image from FormData
 * @param {FormData} formData - The form data containing logo image
 * @returns {Promise<Object|null>} The logo image object or null
 * @throws {Error} If more than one logo or non-image file is provided
 */
export async function readCreationLogoImage(formData) {
  const logoImages = await toReferenceImages([
    ...formData.getAll("logoImage"),
    ...formData.getAll("creationLogoImage"),
  ]);
  if (logoImages.length > 1) {
    throw new Error("Logo 最多只能上传 1 张。");
  }
  if (logoImages.some((image) => !String(image.mimeType || "").startsWith("image/"))) {
    throw new Error("Logo 仅支持图片文件。");
  }
  return logoImages[0] || null;
}

/**
 * Build creation logo options from form data
 * @param {FormData} formData - The form data containing logo options
 * @param {Object|null} logoImage - Logo image object or null
 * @returns {Object} Normalized logo options
 */
export function buildCreationLogoOptionsFromFormData(formData, logoImage = null) {
  const submittedLogo = normalizeCreationLogoOptions(formData.get("logoOptions"));
  return normalizeCreationLogoOptions({
    ...submittedLogo,
    filename: logoImage?.filename || submittedLogo.filename,
    enabled: Boolean(logoImage) || submittedLogo.enabled,
    placement: formData.get("logoPlacement") || submittedLogo.placement,
    background: formData.get("logoBackground") || submittedLogo.background,
  });
}

/**
 * Append logo reference to reference images array
 * @param {Array} referenceImages - Array of reference images
 * @param {Object|null} logoImage - Logo image object or null
 * @returns {Array} Combined array with logo appended if present
 */
export function appendCreationLogoReference(referenceImages = [], logoImage = null) {
  return logoImage ? [...referenceImages, logoImage] : referenceImages;
}
