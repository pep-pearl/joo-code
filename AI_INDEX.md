# AI Index

## Purpose

This file is a navigation map for agents working in `joo-code`.

`joo-code` is a practical copy-ready code archive. Do not treat it as a product application or a Feature-Sliced Design frontend app.

Use this file to decide the minimum files to read before making structural, documentation, or kit-level changes.

## Repository Model

| Area | Role | Read when |
| --- | --- | --- |
| `kits/` | Copy-ready archive units | Adding, moving, or using reusable logic |
| `docs/archive-map.md` | Human and agent index of kits | Looking for the right unit |
| `docs/migration.md` | Old path to new path history | Updating imports or tracing moved code |
| `docs/unit-grades.md` | Required files by kit size | Creating or reshaping a kit |
| `shared/` | Existing compatibility exports | Preserving older import paths |
| `frontend/` | Existing frontend compatibility exports | Preserving older React import paths |
| `docs/api/` | TypeDoc output | Updating generated API docs |
| `docs/*.md` | Manual archive docs | Updating archive maps, migration notes, or unit rules |
| `rules/` | Repository-specific agent rules | Documentation and navigation policy changes |

## Current Kits

| Kit | Runtime | Source | Notes |
| --- | --- | --- | --- |
| `format/number` | `vanilla-ts` | `kits/format/number/vanilla-ts/index.ts` | First migrated copy-ready unit |
| `browser/viewport` | `vanilla-ts` | `kits/browser/viewport/vanilla-ts/index.ts` | Browser viewport height CSS variable helper |
| `react/hooks/use-debounced-value` | `react` | `kits/react/hooks/use-debounced-value/react/index.ts` | React debounce hook |

## Navigation Rules

1. If the user names a specific file, start there.
2. If the task is about finding reusable logic, read `docs/archive-map.md`.
3. If the task is about a moved path, read `docs/migration.md`.
4. If the task creates or reshapes a kit, read `docs/unit-grades.md`.
5. If the task changes public API docs or JSDoc, read `rules/docs-writing-guide.md`.
6. Do not scan every source file unless the task explicitly requires broad restructuring.

## Structure Direction

The preferred structure is:

```txt
kits/<domain>/<unit>/<runtime>/
```

Examples:

- `kits/format/number/vanilla-ts/`
- `kits/api/http-client/vanilla-ts/`
- `kits/react/hooks/use-debounced-value/react/`

Each kit folder should explain what to copy, which runtime it targets, and whether it has external dependencies.

## Compatibility Policy

When moving logic into `kits/`, keep existing `shared/*` or `frontend/*` paths working with re-export files unless the user explicitly approves removal.

Record every move in `docs/migration.md`.

## Generated Docs

Generated TypeDoc Markdown lives under `docs/api/`.

Prefer editing source JSDoc and kit README files, then regenerate docs. Do not manually patch generated files unless the user explicitly asks for that.
