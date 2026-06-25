// 配置档案（API 预设）存储：让用户在多家上游 / 多把 Key 之间快速切换，
// 无需每次手动重填。档案只保存"私有配置"字段（baseUrl / apiKey / 模型 / 路由等），
// 与生效配置 image-studio-browser-config-v1 解耦：切换档案时把档案值填入表单，
// 用户点保存后才真正写入生效配置。
import { normalizeBrowserPrivateConfig } from "./browser-config.mjs";

export const CONFIG_PRESETS_STORAGE_KEY = "image-studio-config-presets-v1";

function getLocalStorage() {
  return globalThis.window?.localStorage || null;
}

function makePresetId() {
  return `preset-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizePresetName(name, fallback = "未命名档案") {
  const trimmed = String(name || "").trim();
  return trimmed || fallback;
}

function normalizePreset(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const id = String(raw.id || "").trim() || makePresetId();
  return {
    id,
    name: normalizePresetName(raw.name),
    config: normalizeBrowserPrivateConfig(raw.config || {}),
  };
}

export function readPresetStore(storage = getLocalStorage()) {
  try {
    const raw = storage?.getItem?.(CONFIG_PRESETS_STORAGE_KEY);
    if (!raw) {
      return { presets: [], activeId: "" };
    }
    const parsed = JSON.parse(raw);
    const presets = Array.isArray(parsed?.presets)
      ? parsed.presets.map(normalizePreset).filter(Boolean)
      : [];
    const activeId = presets.some((preset) => preset.id === parsed?.activeId)
      ? String(parsed.activeId)
      : presets[0]?.id || "";
    return { presets, activeId };
  } catch (_error) {
    return { presets: [], activeId: "" };
  }
}

function writePresetStore(store, storage = getLocalStorage()) {
  const normalized = {
    presets: (store.presets || []).map(normalizePreset).filter(Boolean),
    activeId: String(store.activeId || ""),
  };
  if (!normalized.presets.some((preset) => preset.id === normalized.activeId)) {
    normalized.activeId = normalized.presets[0]?.id || "";
  }
  storage?.setItem?.(CONFIG_PRESETS_STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function listPresets(storage = getLocalStorage()) {
  return readPresetStore(storage).presets;
}

export function getActivePresetId(storage = getLocalStorage()) {
  return readPresetStore(storage).activeId;
}

export function getActivePreset(storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  return store.presets.find((preset) => preset.id === store.activeId) || null;
}

export function getPreset(id, storage = getLocalStorage()) {
  return readPresetStore(storage).presets.find((preset) => preset.id === id) || null;
}

export function setActivePresetId(id, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  if (!store.presets.some((preset) => preset.id === id)) {
    return store;
  }
  return writePresetStore({ ...store, activeId: id }, storage);
}

// 新建档案；返回新档案对象（已设为激活）。
export function addPreset({ name, config } = {}, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  const preset = normalizePreset({ id: makePresetId(), name, config });
  const next = writePresetStore(
    { presets: [...store.presets, preset], activeId: preset.id },
    storage,
  );
  return next.presets.find((item) => item.id === preset.id) || preset;
}

export function renamePreset(id, name, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  const presets = store.presets.map((preset) =>
    preset.id === id ? { ...preset, name: normalizePresetName(name, preset.name) } : preset,
  );
  return writePresetStore({ ...store, presets }, storage);
}

export function deletePreset(id, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  const presets = store.presets.filter((preset) => preset.id !== id);
  const activeId = store.activeId === id ? presets[0]?.id || "" : store.activeId;
  return writePresetStore({ presets, activeId }, storage);
}

// 用给定配置覆盖当前激活档案；若没有任何档案则自动新建一个"默认"档案。
export function upsertActivePreset(config, { defaultName = "默认" } = {}, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  const active = store.presets.find((preset) => preset.id === store.activeId);
  if (active) {
    const presets = store.presets.map((preset) =>
      preset.id === active.id ? { ...preset, config: normalizeBrowserPrivateConfig(config || {}) } : preset,
    );
    writePresetStore({ ...store, presets }, storage);
    return presets.find((preset) => preset.id === active.id);
  }
  return addPreset({ name: defaultName, config }, storage);
}

// 首次使用时，把当前生效配置吸纳为"默认"档案，保证下拉框不为空。
export function ensureDefaultPreset(currentConfig, { defaultName = "默认" } = {}, storage = getLocalStorage()) {
  const store = readPresetStore(storage);
  if (store.presets.length > 0) {
    return store;
  }
  if (!currentConfig) {
    return store;
  }
  addPreset({ name: defaultName, config: currentConfig }, storage);
  return readPresetStore(storage);
}
