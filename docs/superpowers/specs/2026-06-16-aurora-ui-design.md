# UI 视觉重设计：极光深空

**日期：** 2026-06-16
**范围：** `public/styles.css` 完整重写；`public/index.html` 不动
**目标：** 在不破坏任何功能结构的前提下，全面提升视觉品质

---

## 设计方向

**极光深空**：以现有深蓝底色为基础，引入极光渐变（紫 `#6f7cff` → 青 `#4ecfb3`）作为 accent 系统，面板做磨砂玻璃质感，主按钮改渐变填充，整体强化科技感与层次感。深色、浅色主题同步升级。

---

## 色彩系统

### 深色主题（默认）

| 变量 | 新值 | 说明 |
|------|------|------|
| `--bg` | `#090d18` | 不变，深海蓝黑 |
| `--bg-soft` | `#0e1526` | 略提亮 |
| `--panel` | `rgba(15, 22, 44, 0.88)` | 磨砂玻璃底色 |
| `--panel-soft` | `rgba(255,255,255,0.03)` | 不变 |
| `--border` | `rgba(111,140,255,0.16)` | 微升蓝紫感 |
| `--border-strong` | `rgba(111,140,255,0.28)` | 对应加强 |
| `--text` | `#edf1ff` | 不变 |
| `--muted` | `rgba(237,241,255,0.6)` | 不变 |
| `--accent` | `#7b6fff` | 原 `#6f7cff`，稍偏紫更鲜 |
| `--accent-end` | `#4ecfb3` | 新增，渐变终点青色 |
| `--accent-gradient` | `linear-gradient(135deg,#7b6fff,#4ecfb3)` | 新增，主渐变 |
| `--accent-soft` | `rgba(123,111,255,0.16)` | 光晕底色 |
| `--success` | `#5de8b5` | 从 `#70e2a2` 调为更清亮的青绿 |
| `--danger` | `#ff7eb3` | 从 `#ff9489` 改为玫瑰粉红，更雅致 |
| `--shadow` | `0 28px 90px rgba(0,0,0,0.38)` | 稍加深 |
| `--topbar-bg` | `rgba(6,10,22,0.9)` | 更深，增强分离感 |
| `--aurora-glow-1` | `rgba(123,111,255,0.12)` | 新增，背景放射光晕色1 |
| `--aurora-glow-2` | `rgba(78,207,179,0.08)` | 新增，背景放射光晕色2 |

### 浅色主题

| 变量 | 新值 | 说明 |
|------|------|------|
| `--bg` | `#f0f4ff` | 原 `#f5f5f7`，改为极浅蓝白 |
| `--bg-soft` | `#ffffff` | 不变 |
| `--panel` | `rgba(255,255,255,0.92)` | 白色面板 |
| `--accent` | `#5b5fff` | 浅色下更深的紫蓝，保证对比度 |
| `--accent-end` | `#29c4a0` | 对应青色 |
| `--accent-gradient` | `linear-gradient(135deg,#5b5fff,#29c4a0)` | 浅色主渐变 |
| `--accent-soft` | `rgba(91,95,255,0.1)` | 淡光晕 |
| `--success` | `#188038` | 不变 |
| `--danger` | `#c2294a` | 从 `#b3261e` 调整 |

---

## 组件升级规则

### 面板（`.studio-panel`、`.settings-panel` 等）
- `backdrop-filter: blur(16px)` + `saturate(1.4)` 实现磨砂玻璃
- `border` 使用 `--border` 变量（已升级为蓝紫调）
- `box-shadow` 加入 `inset 0 1px 0 rgba(255,255,255,0.06)` 顶部高光

### 主按钮（`.generate-button`）
- `background: var(--accent-gradient)`
- `box-shadow: 0 4px 20px rgba(123,111,255,0.35)`
- `hover` 状态：亮度提升 + 投影扩散
- `active` 状态：轻微内压缩 `transform: translateY(1px)`

### 次级按钮（`.inline-button`、`.toolbar-button`）
- 默认：`background: rgba(255,255,255,0.04)` + `border: 1px solid rgba(255,255,255,0.1)`
- strong 变体：`background: var(--accent-soft)` + `border-color: var(--border-strong)`

### Topbar（`.topbar`）
- 顶部加 `1px` 极光线：用 `.topbar::before` 伪元素实现（`position:absolute; top:0; left:0; right:0; height:1px; background:var(--accent-gradient)`），避免 `border-image` 破坏圆角
- 背景更深（`--topbar-bg` 新值）
- Brand mark 改用渐变填充

### 输入框（`input`、`textarea`、`select`）
- 默认边框：`var(--border)`
- `focus` 状态：`border-color: var(--accent)` + `box-shadow: 0 0 0 3px var(--accent-soft)`
- 背景：`var(--input-bg)`（保持现有变量，调整深色值为更通透）

### 背景极光光晕（`.app-shell::before/::after`）
- `::before`：右上角紫色放射光晕，`radial-gradient`，`var(--aurora-glow-1)`
- `::after`：左下角青色放射光晕，`radial-gradient`，`var(--aurora-glow-2)`
- 两者均 `pointer-events: none; position: fixed; z-index: 0`

### 状态指示器（`.header-pill`、`.status-dot`）
- 就绪状态：`background: linear-gradient(135deg,rgba(123,111,255,0.15),rgba(78,207,179,0.1))`
- `status-dot` 就绪：颜色改为 `var(--success)`，加 `box-shadow: 0 0 6px var(--success)`

### 滚动条
- `--scrollbar-thumb-color` 升级为 `rgba(123,111,255,0.45)`
- `--scrollbar-thumb-color-strong` 升级为 `rgba(155,145,255,0.62)`

### 胶片条（`.filmstrip`）
- 胶片格子 `border-color` 用 `var(--border-strong)`
- 选中帧加 `outline: 2px solid var(--accent)` + 渐变投影

### 圆角统一
- 面板：`14px`（原多处混用 `8px`/`12px`）
- 按钮：`9px`
- 输入框：`8px`
- 小控件（pill、badge）：`20px`（保持胶囊形）

---

## 约束

- 不修改任何 HTML 结构、class 名称、data 属性、id
- 不引入新的字体（保留 IBM Plex Sans + Sora）
- 不引入 JS 动画库，仅用 CSS `transition`
- 所有 `transition` 时长 ≤ `200ms`，避免卡顿感
- 保持现有深/浅主题切换逻辑（`data-theme="light"` / `data-theme="dark"`）
- 保持所有 `@media` 响应式断点不变
- WCAG AA 对比度：文字与背景对比度 ≥ 4.5:1（正文），≥ 3:1（大字/UI 控件）

---

## 实施策略

1. 备份原始 `styles.css` 为 `styles.css.bak`
2. 重写 CSS 变量区（`:root` + `html[data-theme="light"]`）
3. 按组件分批更新规则，优先顺序：变量 → 全局基础 → Topbar → 面板 → 按钮 → 输入框 → 背景光晕 → 其余组件
4. 每批完成后在浏览器验证深/浅主题切换正常
5. 对照原 styles.css 的 class 列表逐一核查，确保无遗漏
