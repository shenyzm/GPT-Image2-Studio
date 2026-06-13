/**
 * Shared reference label building functions used by both server.mjs and cloudflare-pages-worker.mjs
 */

/**
 * Build portrait reference image labels for person, action, and accessory images
 * @param {Array} personReferenceImages - Array of person reference images
 * @param {Array} actionReferenceImages - Array of action reference images
 * @param {Array} accessoryReferenceImages - Array of accessory reference images
 * @returns {Array<string>} Array of label strings
 */
export function buildPortraitReferenceImageLabels(
  personReferenceImages = [],
  actionReferenceImages = [],
  accessoryReferenceImages = [],
) {
  const personCount = personReferenceImages.length;
  const actionCount = actionReferenceImages.length;
  const accessoryCount = accessoryReferenceImages.length;
  return [
    ...personReferenceImages.map(
      (image, index) =>
        `Portrait person reference ${index + 1} of ${personCount}: ${image.filename || "person reference image"}. Preserve visible identity, face, body proportions, hairstyle, and non-sensitive appearance cues from this person reference.`,
    ),
    ...actionReferenceImages.map(
      (image, index) =>
        `Portrait action and pose reference ${index + 1} of ${actionCount}: ${image.filename || "action reference image"}. Use this only for pose, gesture, body movement, limb placement, and action rhythm; do not treat it as another person identity, outfit, or prop source.`,
    ),
    ...accessoryReferenceImages.map(
      (image, index) =>
        `Portrait clothing, prop, and accessory reference ${index + 1} of ${accessoryCount}: ${image.filename || "styling reference image"}. WARDROBE LOCK: This image is the wardrobe authority. The generated subject must wear the supplied outfit, fabric structure, silhouette, colors, material, accessories, shoes, and props from this reference. Do not replace it with a generic blazer, suit, dress, or everyday outfit; do not treat it as another person identity.`,
    ),
  ];
}
