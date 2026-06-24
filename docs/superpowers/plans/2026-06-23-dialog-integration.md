# Dialog Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `src/react/dialog` project-independent, documented, and runnable in Storybook and the playground while improving Tooltip autodocs.

**Architecture:** Preserve the current global stores, Promise contracts, compound panel API, and UI slot overrides. Replace project-only components with `src/ui/Button`, remove the unnecessary loadable-specific type dependency, and expose dialog through existing public barrels.

**Tech Stack:** React 19, TypeScript, Headless UI, Zustand, React Hook Form, Storybook 10, Vitest, Testing Library, Vite, Tailwind CSS

---

### Task 1: Establish test runtime and lock dialog behavior

**Files:**
- Modify: `package.json`
- Modify: `src/react/dialog/stores.test.ts`
- Modify: `src/react/dialog/DialogProvider.test.tsx`
- Create: `src/react/dialog/ConfirmAlertDialog.test.tsx`

- [ ] **Step 1: Add test scripts and dependencies**

Add `"test": "vitest run"`, runtime dependencies `zustand` and `react-hook-form`, and dev dependencies `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`.

- [ ] **Step 2: Write failing default UI tests**

Test that the default confirm UI renders `취소` and `확인`, calls the correct handlers, exposes an accessible close button, and does not import project-only modules.

- [ ] **Step 3: Run the focused tests and verify failure**

Run: `npm test -- src/react/dialog/ConfirmAlertDialog.test.tsx`

Expected: FAIL because current files resolve `@dmp/ui` and the project-specific SVG.

### Task 2: Replace project-specific defaults and publish dialog API

**Files:**
- Modify: `src/react/dialog/ConfirmAlertDialog.tsx`
- Modify: `src/react/dialog/panel/Wrap.tsx`
- Modify: `src/react/dialog/presets/mode-dialog-panel/buttons.tsx`
- Modify: `src/react/dialog/DialogProvider.tsx`
- Modify: `src/react/dialog/stores.ts`
- Modify: `src/react/dialog/types.ts`
- Delete: `src/react/dialog/global.d.ts`
- Modify: `src/react/index.ts`
- Modify: `src/ui/index.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: Use `src/ui/Button` for defaults**

Map confirm to primary solid, cancel to ghost outline, delete to danger solid, and edit/save/ok to existing Button intents without adding a duplicate button abstraction.

- [ ] **Step 2: Replace the close asset**

Render a local accessible SVG inside a plain icon button and keep `closeIcon` override support.

- [ ] **Step 3: Remove loadable-only typing**

Use `React.ComponentType` for `dialogMap` and `PropsOf`; React-loadable components remain structurally accepted as components without a package dependency.

- [ ] **Step 4: Export public modules**

Export dialog from `src/react/index.ts`, export Button/Badge/GridLayout/Tooltip from `src/ui/index.ts`, and export UI from `src/index.ts` so playground imports exercise the public API.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- src/react/dialog`

Expected: all dialog tests PASS.

### Task 3: Add Storybook coverage and Tooltip autodocs

**Files:**
- Create: `src/react/dialog/dialog-overview.stories.tsx`
- Modify: `src/ui/Tooltip.stories.tsx`
- Modify: `.storybook/main.ts`

- [ ] **Step 1: Add interactive Dialog stories**

Create stories for confirm, alert, custom body, and a registered general dialog using `DialogProvider` and store actions.

- [ ] **Step 2: Improve Tooltip autodocs**

Add `tags: ["autodocs"]`, component description, prop descriptions, type summaries, defaults, and subcomponent documentation for `Tooltip.Trigger` and `Tooltip.Content`.

- [ ] **Step 3: Remove unused addon registrations**

Keep only installed `@storybook/addon-docs`; controls and interaction callbacks used by these stories do not require the two missing addon packages.

- [ ] **Step 4: Build Storybook**

Run: `npm run build-storybook`

Expected: PASS without missing addon warnings and include `React/Dialog` plus Tooltip docs.

### Task 4: Add playground example and documentation

**Files:**
- Modify: `playground/src/App.tsx`
- Modify: `playground/src/styles.css`
- Modify: `playground/README.md`
- Create: `src/react/dialog/README.md`
- Modify: `src/react/README.md`
- Modify: `src/ui/README.md`
- Modify: `README.md`

- [ ] **Step 1: Add a live dialog card**

Mount one `DialogProvider`, add alert/confirm/general dialog launch buttons, and display the latest Promise result.

- [ ] **Step 2: Document dialog usage**

Document provider setup, module augmentation, `open`, `confirm`, `alert`, config flags, slots, panel forms, copy unit, and dependencies in the existing README style.

- [ ] **Step 3: Update parent indexes**

Add dialog to the React and root lookup tables; mention Dialog in playground and Tooltip autodocs in UI docs.

### Task 5: Full verification

**Files:**
- Verify all modified files

- [ ] **Step 1: Run tests**

Run: `npm test`

Expected: PASS.

- [ ] **Step 2: Run TypeScript check**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 3: Build playground**

Run: `npm run playground:build`

Expected: PASS.

- [ ] **Step 4: Build Storybook**

Run: `npm run build-storybook`

Expected: PASS without missing addon warnings.
