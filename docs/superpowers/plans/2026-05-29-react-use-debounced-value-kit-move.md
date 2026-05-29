# React Use Debounced Value Kit Move Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move `useDebouncedValue` into `kits/react/hooks/use-debounced-value` while preserving existing `frontend/react-ts/src/pures/hooks` compatibility exports.

**Architecture:** `kits/react/hooks/use-debounced-value` becomes the copy-ready unit for the React debounce hook. The old frontend path remains as a compatibility re-export.

**Tech Stack:** TypeScript, React hooks, TypeDoc Markdown, repository Markdown docs.

---

### Task 1: Create the React Hook Kit

**Files:**
- Create: `kits/react/hooks/use-debounced-value/README.md`
- Create: `kits/react/hooks/use-debounced-value/index.ts`
- Create: `kits/react/hooks/use-debounced-value/react/index.ts`
- Modify: `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts`

- [x] **Step 1: Create `kits/react/hooks/use-debounced-value/react`**
- [x] **Step 2: Move `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts` to `kits/react/hooks/use-debounced-value/react/index.ts`**
- [x] **Step 3: Rewrite source JSDoc in Korean without changing runtime logic**
- [x] **Step 4: Add compatibility re-export in `frontend/react-ts/src/pures/hooks/useDebouncedValue.ts`**
- [x] **Step 5: Add `kits/react/hooks/use-debounced-value/index.ts` as the kit entry**
- [x] **Step 6: Add `kits/react/hooks/use-debounced-value/README.md` with React dependency notes**

### Task 2: Update Archive Docs

**Files:**
- Modify: `docs/archive-map.md`
- Modify: `docs/migration.md`
- Modify: `README.md`
- Modify: `AI_INDEX.md`

- [x] **Step 1: Add `react/hooks/use-debounced-value` to `docs/archive-map.md`**
- [x] **Step 2: Add old -> new path to `docs/migration.md`**
- [x] **Step 3: Add the new React hook kit to root README kit list**
- [x] **Step 4: Add the new React hook kit to `AI_INDEX.md` current kits**

### Task 3: Verify

**Files:**
- Verify repository state only.

- [x] **Step 1: Run TypeScript check**

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```

- [x] **Step 2: Run static smoke checks**

Check that the moved hook and old compatibility path both export `useDebouncedValue`.

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
