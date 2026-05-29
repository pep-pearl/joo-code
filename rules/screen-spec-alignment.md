# Screen Spec Alignment Rule

## Purpose

Use this rule only when the task explicitly involves implementing, fixing, auditing, or aligning screens based on the official screen specification PDF.

Do not apply this rule to unrelated feature work, refactoring, bug fixes, or styling tasks unless the user explicitly requests screen-spec alignment.

## Source Priority

The latest and authoritative screen specification is:

- `미어캣 웹플랫폼_화면설계서_0.9_260515.pdf`

If another PDF exists, including `미어캣 웹플랫폼_화면설계서_0.9_260512.pdf`, do not use it as the main source of truth unless the latest file is missing or unreadable.

The screen specification PDF is the authoritative source for:

- page layout
- screen structure
- content hierarchy
- required UI elements
- labels and text intent
- panels, drawers, modals, filters, tables, cards
- GIS map/list/detail relationships
- page-specific behavior
- route/page meaning

The legacy HTML prototype is only a secondary visual/style reference.

It may be used for:

- visual tone
- color hints
- reusable styling patterns
- simple component styling ideas
- rough UI atoms that can be adapted

The legacy HTML must not be used as the source of truth for:

- page layout
- page content
- IA
- screen composition
- which elements should exist
- GIS panel placement
- list/detail/filter structure
- route/page requirements

If the PDF and legacy HTML differ, the PDF wins.

## Mandatory Work Order Before Screen Fixes

Before changing implementation code for screen-spec work, perform a screen-spec compliance audit.

For each target page:

1. Find the matching page/screen in `미어캣 웹플랫폼_화면설계서_0.9_260515.pdf`.
2. Identify the intended page layout from the PDF.
3. Identify every required UI region and element from the PDF.
4. Inspect the current React implementation.
5. Inspect the legacy HTML only after the PDF structure is understood.
6. Compare PDF vs current implementation vs legacy HTML.
7. Write a concise correction plan.
8. Only then modify code.

If the PDF page cannot be found, stop and report the uncertainty instead of guessing from HTML.

## HTML Usage Restriction

Use legacy HTML only after the PDF requirement is extracted.

Allowed:

- design feel
- reusable component ideas
- minor style hints
- simple markup patterns that do not affect screen structure

Not allowed:

- copying entire HTML pages
- reproducing HTML page layout when it conflicts with the PDF
- removing, replacing, renaming, or reordering PDF-required elements
- inferring missing PDF content from HTML unless explicitly marked as an assumption

Every page implementation should be explainable from the PDF first.

## Required Audit Output Format

Before implementation, produce a short audit report:

```txt
[SPEC_COMPLIANCE_AUDIT]

Target page:
- ...

PDF reference:
- File:
- Screen/page name:
- PDF page number or nearby section if identifiable:

Current implementation:
- Route:
- Main files:
- Components:

Legacy HTML reference:
- Files/folders checked:
- Used only for:
- Ignored because:

Mismatch summary:
1. PDF requires: ...
   Current implementation: ...
   Problem: ...
   Fix: ...

Implementation plan:
1. ...

Files likely to change:
- ...

Risks / assumptions:
- ...
```

Do not skip this audit for major pages.

## Screen Implementation Order

Implement screens in this order:

1. PDF structure
2. PDF-required content and UI elements
3. PDF interaction states
4. Current project route/component conventions
5. Reusable UI extraction
6. Legacy HTML visual hints
7. Final cleanup/build

Never implement in this order:

1. Legacy HTML page
2. Visual similarity
3. Guess missing elements
4. Add PDF elements afterward

## Definition of Done

A page is not done unless:

- the latest PDF was checked
- the page layout follows the PDF
- all required regions from the PDF are represented
- all required major UI elements from the PDF are represented
- any missing or simplified behavior is explicitly listed as TODO
- any use of legacy HTML is documented as style-only or reusable-component-only
- current implementation does not silently replace PDF structure with HTML structure
- npm run build has been run if feasible
- the final response includes a spec compliance summary

## Final Response Format

When finishing a screen-spec fix, report:

```txt
[SPEC_ALIGNMENT_SUMMARY]

PDF used:
- ...

Target page:
- ...

Inspected current files:
- ...

Inspected legacy HTML:
- ...
- Used only for style/component hints:
- Ignored for layout/content because:

Major mismatches found:
- ...

Changes made:
- ...

Still not fully matched:
- ...

Assumptions:
- ...

Build:
- ...
```
