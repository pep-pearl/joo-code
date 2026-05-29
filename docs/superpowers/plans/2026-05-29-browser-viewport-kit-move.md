# Browser Viewport Kit Move Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the viewport height utility into `kits/browser/viewport` while preserving existing `shared/ts/dom` compatibility exports.

**Architecture:** `kits/browser/viewport` becomes the copy-ready unit for viewport-related browser helpers. The old `shared/ts/dom/viewport.ts` file remains as a compatibility re-export.

**Tech Stack:** TypeScript, browser DOM APIs, TypeDoc Markdown, repository Markdown docs.

---

### Task 1: Create the Browser Viewport Kit

**Files:**
- Create: `kits/browser/viewport/README.md`
- Create: `kits/browser/viewport/index.ts`
- Create: `kits/browser/viewport/vanilla-ts/index.ts`
- Modify: `shared/ts/dom/viewport.ts`

- [x] **Step 1: Create `kits/browser/viewport/vanilla-ts`**
- [x] **Step 2: Move `shared/ts/dom/viewport.ts` to `kits/browser/viewport/vanilla-ts/index.ts`**
- [x] **Step 3: Rewrite source JSDoc in Korean without changing runtime logic**
- [x] **Step 4: Add compatibility re-export in `shared/ts/dom/viewport.ts`**
- [x] **Step 5: Add `kits/browser/viewport/index.ts` as the kit entry**
- [x] **Step 6: Add `kits/browser/viewport/README.md`**

### Task 2: Update Archive Docs

**Files:**
- Modify: `docs/archive-map.md`
- Modify: `docs/migration.md`
- Modify: `README.md`
- Modify: `AI_INDEX.md`

- [x] **Step 1: Add `browser/viewport` to `docs/archive-map.md`**
- [x] **Step 2: Add old -> new path to `docs/migration.md`**
- [x] **Step 3: Add `browser/viewport` to root README kit list**
- [x] **Step 4: Add `browser/viewport` to `AI_INDEX.md` current kits**

### Task 3: Verify

**Files:**
- Verify repository state only.

- [x] **Step 1: Run TypeScript check**

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```

- [x] **Step 2: Run viewport smoke tests**

Check SSR fallback and browser-like behavior with a small Node script.

- [x] **Step 3: Run TypeDoc**

```powershell
.\node_modules\.bin\typedoc.cmd
```

- [x] **Step 4: Check git diff**

```powershell
git -c safe.directory=D:/01_Projects/workspace/joo-code-1 diff --check
git -c safe.directory=D:/01_Projects/workspace/joo-code-1 status --short
```

- [x] **Step 5: Commit**

Commit with a Lore-format message and the required OmX co-author trailer.
