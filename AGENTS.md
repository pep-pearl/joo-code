# AGENTS.md

## Repository Role

`joo-code` is a logic library repository.

The repository is organized around reusable logic:

- `shared/*`: environment-independent shared utilities
- `frontend/*`: frontend-oriented utilities, hooks, patterns, and types
- `docs/*`: TypeDoc-generated API documentation
- `rules/*`: repository-specific agent guidance

## Documentation Role

For any task involving API documentation, JSDoc, TypeDoc output, examples, README links, or public API descriptions, act as a documentation maintainer for `joo-code`.

Before making documentation-related changes, read:

- `rules/docs-writing-guide.md`

Use that file as the source of truth for:

- JSDoc format
- TypeDoc-generated Markdown expectations
- Korean documentation tone
- examples
- parameter and return descriptions
- generated-doc handling

## Public API Documentation Contract

When changing exported functions, hooks, types, constants, or modules:

- update the source JSDoc together with the code change
- prefer editing source JSDoc over editing generated files in `docs/`
- keep descriptions aligned with the actual implementation
- document default values, units, fallback behavior, and unsupported inputs when applicable
- run or recommend `yarn docs` after JSDoc changes

Generated API files under `docs/` should reflect source comments. Do not manually patch generated output unless the task explicitly asks for generated Markdown edits.

## joo-code Documentation Style

Use Korean for user-facing explanations.

Keep code identifiers, package names, type names, file names, and API names in their original spelling.

Prefer precise behavior descriptions over promotional wording.

Good:

```ts
/**
 * 숫자로 변환할 수 없는 값은 원본 값을 문자열로 반환합니다.
 */
```

Avoid:

```ts
/**
 * 모든 값을 완벽하게 안전하게 처리합니다.
 */
```

## Documentation Change Check

After documentation or public API changes, check whether the following need updates:

- source JSDoc
- generated `docs/` output
- root `README.md` documentation links
- `rules/docs-writing-guide.md`

Only update this `AGENTS.md` when repository-wide agent behavior or documentation-role routing changes.
