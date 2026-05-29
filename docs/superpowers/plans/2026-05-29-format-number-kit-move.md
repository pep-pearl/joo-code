# Format Number Kit Move Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the number formatting utilities into the first copy-ready `kits/format/number` unit while preserving runtime behavior.

**Architecture:** `kits/format/number` becomes the folder-level copy unit. The current shared package keeps compatibility by re-exporting from the new kit path instead of owning the implementation. TypeDoc output moves to `docs/api/` so generated files do not delete manual archive docs.

**Tech Stack:** TypeScript, TypeDoc Markdown, repository Markdown docs.

---

### Task 1: Create the Number Kit Unit

**Files:**
- Create: `kits/format/number/README.md`
- Create: `kits/format/number/index.ts`
- Create: `kits/format/number/vanilla-ts/index.ts`
- Modify: `shared/ts/format/number.ts`

- [x] **Step 1: Create `kits/format/number/vanilla-ts`**
- [x] **Step 2: Move `shared/ts/format/number.ts` to `kits/format/number/vanilla-ts/index.ts`**
- [x] **Step 3: Add compatibility re-export in `shared/ts/format/number.ts`**
- [x] **Step 4: Add `kits/format/number/index.ts` as the kit entry**
- [x] **Step 5: Add `kits/format/number/README.md`**

### Task 2: Update Archive-Level Documentation

**Files:**
- Create: `docs/migration.md`
- Create: `docs/archive-map.md`
- Create: `docs/unit-grades.md`
- Modify: `README.md`
- Modify: `AI_INDEX.md`
- Modify: `AGENTS.md`
- Modify: `rules/docs-writing-guide.md`

- [x] **Step 1: Create migration history**
- [x] **Step 2: Create archive map**
- [x] **Step 3: Create unit grade guide**
- [x] **Step 4: Rewrite root README**
- [x] **Step 5: Rewrite AI_INDEX**
- [x] **Step 6: Update repository documentation guidance for `docs/api/`**

### Task 3: Update Tooling Scope

**Files:**
- Modify: `typedoc.json`
- Modify: `tsconfig.json`
- Delete: old TypeDoc output under `docs/README.md`, `docs/modules.md`, `docs/frontend/`, and `docs/shared/`

- [x] **Step 1: Keep `package.json` workspaces unchanged because this kit is not a package**
- [x] **Step 2: Include `kits/**/*` in `tsconfig.json`**
- [x] **Step 3: Include `kits` in TypeDoc entry points**
- [x] **Step 4: Move TypeDoc output to `docs/api/` to protect manual docs**
- [x] **Step 5: Remove stale TypeDoc output from the previous `docs/` root**

### Task 4: Verify

**Files:**
- Verify repository state only.

- [x] **Step 1: Run TypeScript check**

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```

- [x] **Step 2: Run docs generation**

```powershell
yarn.cmd docs
.\node_modules\.bin\typedoc.cmd
```

- [x] **Step 3: Check git diff**

```powershell
git -c safe.directory=D:/01_Projects/workspace/joo-code-1 diff --check
git -c safe.directory=D:/01_Projects/workspace/joo-code-1 status --short
```

- [x] **Step 4: Commit**

Commit with a Lore-format message and the required OmX co-author trailer.
