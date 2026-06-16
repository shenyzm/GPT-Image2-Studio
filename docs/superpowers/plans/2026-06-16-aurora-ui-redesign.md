# Aurora UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `public/styles.css` to implement the "Aurora Deep Space" visual theme — gradient accents, frosted-glass panels, glowing buttons — without touching any HTML.

**Architecture:** All changes are confined to `public/styles.css`. The existing CSS variable system is extended with new aurora variables (`--accent-gradient`, `--accent-end`, `--aurora-glow-1/2`), then component rules are updated to consume them. Deep and light themes are updated in parallel.

**Tech Stack:** Vanilla CSS, CSS custom properties, `backdrop-filter`, `radial-gradient`, `linear-gradient`, CSS `transition` (≤200ms)

---

## File Map

| File | Action |
|------|--------|
| `public/styles.css` | Full rewrite of CSS variable blocks + targeted component rule updates |
| `public/styles.css.bak` | Created as backup before any edits |

---

### Task 1: Backup original styles.css

**Files:**
- Create: `public/styles.css.bak`

- [ ] **Step 1: Copy styles.css to styles.css.bak**

```powershell
Copy-Item "public\styles.css" "public\styles.css.bak"
```

Expected: `styles.css.bak` appears in `public/`, same byte size as `styles.css`.

---

### Task 2: Rewrite CSS variables — dark theme

**Files:**
- Modify: `public/styles.css` lines 1–77 (`:root { ... }` block)

- [ ] **Step 1: Replace the entire `:root` block**

Find the existing `:root { ... }` block (ends around line 77 with the closing `}`) and replace it with:

```css
:root {
  color-scheme: dark;
  --bg: #090d18;
  --bg-soft: #0e1526;
  --panel: rgba(15, 22, 44, 0.88);
  --panel-soft: rgba(255, 255, 255, 0.03);
  --border: rgba(111, 140, 255, 0.16);
  --border-strong: rgba(111, 140, 255, 0.28);
  --text: #edf1ff;
  --muted: rgba(237, 241, 255, 0.6);
  --accent: #7b6fff;
  --accent-end: #4ecfb3;
  --accent-gradient: linear-gradient(135deg, #7b6fff, #4ecfb3);
  --accent-soft: rgba(123, 111, 255, 0.16);
  --success: #5de8b5;
  --danger: #ff7eb3;
  --shadow: 0 28px 90px rgba(0, 0, 0, 0.38);
  --overlay-surface-bg: linear-gradient(180deg, rgba(18, 26, 52, 0.97), rgba(10, 15, 28, 0.97));
  --overlay-surface-bg-soft: rgba(14, 20, 38, 0.82);
  --overlay-media-bg: rgba(6, 9, 16, 0.68);
  --overlay-border: rgba(123, 140, 255, 0.22);
  --overlay-border-muted: rgba(123, 140, 255, 0.13);
  --overlay-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  --overlay-inset-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --overlay-scrim: rgba(4, 6, 12, 0.52);
  --overlay-strong-scrim: rgba(0, 0, 0, 0.62);
  --overlay-viewer-scrim: rgba(0, 0, 0, 0.72);
  --gallery-panel-height: calc(100svh - 132px);
  --scrollbar-size: 10px;
  --scrollbar-track-color: rgba(255, 255, 255, 0.05);
  --scrollbar-track-color-hover: rgba(255, 255, 255, 0.08);
  --scrollbar-thumb-color: rgba(123, 111, 255, 0.45);
  --scrollbar-thumb-color-strong: rgba(155, 145, 255, 0.62);
  --scrollbar-thumb-shadow: rgba(56, 42, 160, 0.28);
  --topbar-bg: rgba(6, 10, 22, 0.9);
  --topbar-border: rgba(111, 140, 255, 0.18);
  --topbar-shadow: 0 18px 54px rgba(0, 0, 0, 0.28);
  --topbar-trigger-height: 10px;
  --nav-tab-bg: rgba(12, 20, 42, 0.88);
  --nav-tab-bg-hover: rgba(18, 30, 60, 0.94);
  --nav-tab-border: rgba(111, 140, 255, 0.18);
  --nav-tab-border-strong: rgba(111, 140, 255, 0.3);
  --nav-tab-active: #5de8b5;
  --nav-tab-idle: #7b6fff;
  --control-bg: rgba(255, 255, 255, 0.04);
  --control-bg-hover: rgba(255, 255, 255, 0.08);
  --input-bg: rgba(255, 255, 255, 0.03);
  --input-bg-focus: rgba(255, 255, 255, 0.055);
  --flyout-bg: rgba(7, 11, 24, 0.97);
  --flyout-text: var(--text);
  --flyout-muted: var(--muted);
  --flyout-border: var(--border);
  --active-tab-bg: rgba(123, 111, 255, 0.12);
  --preview-stage-bg: rgba(255, 255, 255, 0.022);
  --preview-canvas-border: rgba(255, 255, 255, 0.05);
  --preview-canvas-bg:
    radial-gradient(circle at top, rgba(123, 111, 255, 0.07), transparent 40%),
    rgba(6, 9, 18, 0.68);
  --preview-canvas-bg-size: auto;
  --preview-canvas-inset: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  --preview-image-shadow: 0 18px 64px rgba(0, 0, 0, 0.3);
  --portrait-accessory-asset-text: #edf1ff;
  --portrait-accessory-asset-muted: rgba(237, 241, 255, 0.66);
  --portrait-accessory-asset-border: rgba(123, 140, 255, 0.22);
  --portrait-accessory-asset-border-strong: rgba(123, 140, 255, 0.42);
  --portrait-accessory-asset-panel-bg: linear-gradient(180deg, rgba(18, 26, 52, 0.99), rgba(10, 15, 28, 0.99));
  --portrait-accessory-asset-head-bg: linear-gradient(90deg, rgba(28, 38, 72, 0.96), rgba(12, 18, 34, 0.64));
  --portrait-accessory-asset-tab-bg: rgba(255, 255, 255, 0.04);
  --portrait-accessory-asset-tab-active-bg: linear-gradient(180deg, rgba(123, 111, 255, 0.32), rgba(123, 111, 255, 0.12));
  --portrait-accessory-asset-card-bg: rgba(255, 255, 255, 0.045);
  --portrait-accessory-asset-card-hover-bg: linear-gradient(180deg, rgba(123, 111, 255, 0.16), rgba(255, 255, 255, 0.04));
  --portrait-accessory-asset-control-bg: rgba(255, 255, 255, 0.07);
  --portrait-accessory-asset-image-bg: rgba(255, 255, 255, 0.92);
  --portrait-accessory-asset-shadow: 0 28px 72px rgba(0, 0, 0, 0.44), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  --type-title-size: 1.02rem;
  --type-small-title-size: 0.9rem;
  --type-body-size: 0.86rem;
  --type-subtitle-size: 0.78rem;
  --aurora-glow-1: rgba(123, 111, 255, 0.12);
  --aurora-glow-2: rgba(78, 207, 179, 0.08);
}
```

- [ ] **Step 2: Open browser at http://localhost:3600, verify page still loads without broken layout**

Expected: Page renders, colors shift slightly toward the new palette.

---

### Task 3: Rewrite CSS variables — light theme

**Files:**
- Modify: `public/styles.css` — `html[data-theme="light"] { ... }` block (lines ~79–151)

- [ ] **Step 1: Replace the entire `html[data-theme="light"]` block**

```css
html[data-theme="light"] {
  color-scheme: light;
  --bg: #f0f4ff;
  --bg-soft: #ffffff;
  --panel: rgba(255, 255, 255, 0.92);
  --panel-soft: rgba(29, 29, 31, 0.04);
  --border: rgba(91, 95, 255, 0.14);
  --border-strong: rgba(91, 95, 255, 0.26);
  --text: #1d1d1f;
  --muted: rgba(29, 29, 31, 0.62);
  --accent: #5b5fff;
  --accent-end: #29c4a0;
  --accent-gradient: linear-gradient(135deg, #5b5fff, #29c4a0);
  --accent-soft: rgba(91, 95, 255, 0.1);
  --success: #188038;
  --danger: #c2294a;
  --shadow: 0 22px 70px rgba(29, 29, 31, 0.12);
  --overlay-surface-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(240, 244, 255, 0.98));
  --overlay-surface-bg-soft: rgba(255, 255, 255, 0.94);
  --overlay-media-bg: rgba(236, 240, 252, 0.88);
  --overlay-border: rgba(91, 95, 255, 0.14);
  --overlay-border-muted: rgba(91, 95, 255, 0.09);
  --overlay-shadow: 0 22px 70px rgba(29, 29, 31, 0.14);
  --overlay-inset-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --overlay-scrim: rgba(29, 29, 31, 0.36);
  --overlay-strong-scrim: rgba(29, 29, 31, 0.42);
  --overlay-viewer-scrim: rgba(29, 29, 31, 0.5);
  --scrollbar-track-color: rgba(29, 29, 31, 0.06);
  --scrollbar-track-color-hover: rgba(29, 29, 31, 0.09);
  --scrollbar-thumb-color: rgba(91, 95, 255, 0.32);
  --scrollbar-thumb-color-strong: rgba(91, 95, 255, 0.48);
  --scrollbar-thumb-shadow: rgba(29, 29, 31, 0.12);
  --topbar-bg: rgba(248, 250, 255, 0.94);
  --topbar-border: rgba(91, 95, 255, 0.14);
  --topbar-shadow: 0 16px 44px rgba(29, 29, 31, 0.08);
  --nav-tab-bg: rgba(240, 244, 255, 0.9);
  --nav-tab-bg-hover: rgba(228, 234, 255, 0.96);
  --nav-tab-border: rgba(91, 95, 255, 0.14);
  --nav-tab-border-strong: rgba(91, 95, 255, 0.24);
  --nav-tab-active: #188038;
  --nav-tab-idle: #5b5fff;
  --control-bg: rgba(255, 255, 255, 0.74);
  --control-bg-hover: rgba(236, 240, 252, 0.92);
  --input-bg: rgba(255, 255, 255, 0.72);
  --input-bg-focus: rgba(255, 255, 255, 0.98);
  --flyout-bg: rgba(251, 252, 255, 0.97);
  --flyout-text: var(--text);
  --flyout-muted: var(--muted);
  --flyout-border: var(--border);
  --active-tab-bg: rgba(91, 95, 255, 0.08);
  --preview-stage-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(240, 244, 255, 0.94));
  --preview-canvas-border: rgba(43, 53, 76, 0.1);
  --preview-canvas-bg:
    linear-gradient(90deg, rgba(91, 95, 255, 0.04) 1px, transparent 1px),
    linear-gradient(0deg, rgba(91, 95, 255, 0.04) 1px, transparent 1px),
    linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
  --preview-canvas-bg-size: 32px 32px, 32px 32px, auto;
  --preview-canvas-inset:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    inset 0 0 0 1px rgba(255, 255, 255, 0.42);
  --preview-image-shadow: 0 18px 54px rgba(43, 53, 76, 0.18);
  --portrait-accessory-asset-text: #241f2a;
  --portrait-accessory-asset-muted: #6d6257;
  --portrait-accessory-asset-border: rgba(91, 95, 255, 0.18);
  --portrait-accessory-asset-border-strong: rgba(91, 95, 255, 0.3);
  --portrait-accessory-asset-panel-bg: linear-gradient(180deg, #f8f9ff 0%, #eef1ff 52%, #e8ecff 100%);
  --portrait-accessory-asset-head-bg: linear-gradient(90deg, rgba(240, 243, 255, 0.94), rgba(248, 250, 255, 0.44));
  --portrait-accessory-asset-tab-bg: rgba(255, 255, 255, 0.54);
  --portrait-accessory-asset-tab-active-bg: linear-gradient(180deg, rgba(91, 95, 255, 0.18), rgba(91, 95, 255, 0.06));
  --portrait-accessory-asset-card-bg: rgba(248, 250, 255, 0.78);
  --portrait-accessory-asset-card-hover-bg: linear-gradient(180deg, rgba(91, 95, 255, 0.12), rgba(255, 255, 255, 0.16));
  --portrait-accessory-asset-control-bg: rgba(255, 255, 255, 0.66);
  --portrait-accessory-asset-image-bg: rgba(255, 255, 255, 0.88);
  --portrait-accessory-asset-shadow: 0 28px 72px rgba(29, 29, 31, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.72);
  --aurora-glow-1: rgba(91, 95, 255, 0.06);
  --aurora-glow-2: rgba(41, 196, 160, 0.05);
}
```

- [ ] **Step 2: In browser, toggle light theme (click theme button), verify page renders without broken layout**

Expected: Background shifts to `#f0f4ff`, panels white, accent color becomes `#5b5fff`.

---

### Task 4: Background aurora glow + body

**Files:**
- Modify: `public/styles.css` — `html, body` block and `.app-shell` block

- [ ] **Step 1: Update `html, body` background**

Find:
```css
html,
body {
  margin: 0;
  min-height: 100%;
  overflow-x: clip;
  background:
    radial-gradient(circle at top left, rgba(111, 124, 255, 0.2), transparent 26%),
    radial-gradient(circle at bottom center, rgba(100, 40, 220, 0.14), transparent 30%),
    linear-gradient(180deg, #08101d 0%, #090d18 100%);
```

Replace the `background` value with:
```css
  background:
    radial-gradient(ellipse 60% 40% at 80% 0%, var(--aurora-glow-1, rgba(123,111,255,0.12)), transparent),
    radial-gradient(ellipse 50% 36% at 10% 100%, var(--aurora-glow-2, rgba(78,207,179,0.08)), transparent),
    linear-gradient(180deg, #08101d 0%, #090d18 100%);
```

- [ ] **Step 2: Update light-theme body background**

Find:
```css
html[data-theme="light"] body {
  background: linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%);
}
```

Replace with:
```css
html[data-theme="light"] body {
  background:
    radial-gradient(ellipse 55% 35% at 80% 0%, var(--aurora-glow-1, rgba(91,95,255,0.06)), transparent),
    radial-gradient(ellipse 45% 32% at 10% 100%, var(--aurora-glow-2, rgba(41,196,160,0.05)), transparent),
    linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%);
}
```

- [ ] **Step 3: Verify in browser (dark + light)**

Expected: Subtle purple glow top-right and cyan glow bottom-left, neither too strong.

---

### Task 5: Topbar — aurora top-line via ::before

**Files:**
- Modify: `public/styles.css` — `.topbar` block (~line 465)

- [ ] **Step 1: Add `position: relative` guard and `::before` aurora line**

After the closing `}` of the `.topbar { ... }` block, add:

```css
.topbar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-radius: 18px 18px 0 0;
  background: var(--accent-gradient);
  opacity: 0.7;
  pointer-events: none;
}
```

The `.topbar` already has `position: relative` — no change needed there.

- [ ] **Step 2: Update `.brand-mark` to use aurora gradient**

Find the `.brand-mark-core` rule:
```css
.brand-mark-core {
  inset: 18px;
  background: linear-gradient(135deg, #86b7ff, #7ce0ff);
```

Replace `background` value:
```css
  background: var(--accent-gradient);
```

- [ ] **Step 3: Verify topbar aurora line visible in browser**

Expected: 1px gradient line (purple→cyan) runs along the top edge of the topbar.

---

### Task 6: Panel frosted-glass

**Files:**
- Modify: `public/styles.css` — `.studio-panel` block

- [ ] **Step 1: Find `.studio-panel` rule**

Search for `.studio-panel` definition. It should look like:
```css
.studio-panel {
  ...
  background: var(--panel);
  border: 1px solid var(--border);
  ...
}
```

- [ ] **Step 2: Add/update frosted-glass properties**

Ensure the `.studio-panel` rule contains:
```css
.studio-panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  box-shadow:
    var(--shadow),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

- [ ] **Step 3: Verify panels have glass effect in browser**

Expected: Panels look slightly translucent with blur behind them.

---

### Task 7: Generate button — gradient fill

**Files:**
- Modify: `public/styles.css` — `.generate-button` block

- [ ] **Step 1: Find `.generate-button` rule and update**

Find the existing `.generate-button` styles and replace/add:
```css
.generate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  padding: 0 24px;
  border-radius: 9px;
  border: 1px solid transparent;
  background: var(--accent-gradient);
  color: #ffffff;
  font-size: var(--type-small-title-size);
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 20px rgba(123, 111, 255, 0.35);
  transition:
    transform 160ms ease,
    box-shadow 160ms ease,
    opacity 160ms ease;
}

.generate-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 28px rgba(123, 111, 255, 0.45);
}

.generate-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 12px rgba(123, 111, 255, 0.3);
}

.generate-button:disabled {
  opacity: 0.42;
  pointer-events: none;
}
```

- [ ] **Step 2: Verify generate button in browser**

Expected: "开始生成" button shows purple→cyan gradient, glows on hover.

---

### Task 8: Input / textarea / select — aurora focus

**Files:**
- Modify: `public/styles.css` — input, textarea, select rules

- [ ] **Step 1: Find or add base input styles**

Locate the rule block that styles `input`, `textarea`, `select` (there may be several scattered blocks). Find the `:focus` / `:focus-visible` rules and ensure they contain:

```css
input:focus,
input:focus-visible,
textarea:focus,
textarea:focus-visible,
select:focus,
select:focus-visible {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
  background: var(--input-bg-focus);
}
```

- [ ] **Step 2: Verify focus ring in browser**

Click into the prompt textarea. Expected: Purple glow ring appears around the input.

---

### Task 9: Toolbar buttons and inline buttons

**Files:**
- Modify: `public/styles.css` — `.toolbar-button`, `.inline-button`, `.header-button` rules

- [ ] **Step 1: Update `.toolbar-button` and `.header-button`**

Find existing `.header-pill, .header-button, .toolbar-button, .count-pill` shared rule and ensure border-radius is `12px` (already is). Then find `.toolbar-button` specific rules and update:

```css
.toolbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 14px;
  border-radius: 9px;
  border: 1px solid var(--border);
  background: var(--control-bg);
  color: var(--text);
  font-size: var(--type-subtitle-size);
  font-weight: 600;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.toolbar-button:hover {
  border-color: var(--border-strong);
  background: var(--control-bg-hover);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
}

.toolbar-button.strong,
.header-button.strong {
  background: var(--accent-soft);
  border-color: var(--border-strong);
  color: var(--accent);
}

.toolbar-button.danger {
  color: var(--danger);
  border-color: rgba(255, 126, 179, 0.24);
}

.toolbar-button.danger:hover {
  background: rgba(255, 126, 179, 0.1);
  border-color: rgba(255, 126, 179, 0.4);
}
```

- [ ] **Step 2: Verify buttons in browser**

Expected: Toolbar buttons have subtle border, strong variant shows accent tint, danger variant shows rose color.

---

### Task 10: Status pill and status dot

**Files:**
- Modify: `public/styles.css` — `.header-pill`, `.status-dot`, `.status-ready` rules

- [ ] **Step 1: Update status pill ready state**

Find `.header-pill.status-ready` or the rule that sets the ready/connected state, and update:

```css
.header-pill.status-ready {
  background: linear-gradient(135deg, rgba(123, 111, 255, 0.14), rgba(78, 207, 179, 0.1));
  border-color: rgba(123, 111, 255, 0.28);
  color: var(--text);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--muted);
  flex-shrink: 0;
}

.header-pill[data-state="ready"] .status-dot,
.header-pill.status-ready .status-dot {
  background: var(--success);
  box-shadow: 0 0 6px var(--success);
}
```

- [ ] **Step 2: Verify status pill in browser after API config**

Expected: Connected state shows aurora tint background, dot glows green.

---

### Task 11: Filmstrip selected frame

**Files:**
- Modify: `public/styles.css` — `.filmstrip-item` rules

- [ ] **Step 1: Update filmstrip item active/selected state**

Find `.filmstrip-item.active` or `.filmstrip-item[aria-selected="true"]` and update/add:

```css
.filmstrip-item {
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.filmstrip-item.active,
.filmstrip-item[aria-selected="true"] {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 4px 16px rgba(123, 111, 255, 0.3);
}
```

- [ ] **Step 2: Generate an image, verify filmstrip selected frame glows in browser**

Expected: Active filmstrip thumbnail has purple outline + glow.

---

### Task 12: Final verification — dark and light themes

- [ ] **Step 1: Open browser at http://localhost:3600 in dark theme**

Check each of these visually:
- Body background has subtle purple glow top-right, cyan glow bottom-left
- Topbar has 1px aurora gradient line at top edge
- Panels look frosted/translucent
- "开始生成" button is gradient purple→cyan with glow
- Input focus ring is purple
- Status pill (if API key set) has aurora tint

- [ ] **Step 2: Toggle light theme**

Click theme toggle. Check:
- Background shifts to `#f0f4ff` (very light blue-white)
- Panels are white/near-white
- Accent color is `#5b5fff` (darker purple for contrast)
- Button gradient uses `#5b5fff → #29c4a0`
- No white-on-white or illegible text combinations

- [ ] **Step 3: Check mobile layout**

Resize browser to 375px width. Verify layout is not broken.

- [ ] **Step 4: Commit**

```bash
git add public/styles.css
git commit -m "feat: aurora deep space UI redesign - gradient accents, frosted panels, glow buttons"
```
