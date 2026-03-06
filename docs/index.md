# CRUD Feature Guide — Index

This is the entry point for building a new CRUD feature in the frontend. Read this first, then follow the relevant files for your specific form pattern.

---

## Which files to read

**Always read (every feature):**
- [`crud-base.md`](./crud-base.md) — folder structure, definitions layer, API hooks, shared components, utilities, aliases, pre-implementation checklist
- [`crud-table.md`](./crud-table.md) — column factory + DataTable wrapper (covers both standard and dialog variants)

**Then read exactly one based on form complexity:**

| Form complexity | Read |
|---|---|
| 3+ fields, needs its own page | [`crud-page-form.md`](./crud-page-form.md) |
| 1–2 fields, dialog is enough | [`crud-dialog-form.md`](./crud-dialog-form.md) |

---

## File responsibilities

| File | What it covers |
|---|---|
| `crud-base.md` | §1 pre-implementation checklist, §2 folder layout, §3 app routes, §4–6 definitions layer (constants/types/schema), §7 API hooks, §8 shared components, §9 utilities, §10 import aliases |
| `crud-table.md` | `<feature>-column.tsx` + `<feature>-table.tsx` — standard and dialog variants side by side |
| `crud-page-form.md` | `use-<feature>-form.ts` (page), `<feature>-list.tsx` (page), `<feature>-form.tsx` |
| `crud-dialog-form.md` | `use-<feature>-form.ts` (dialog), `<feature>-list.tsx` (dialog), `<feature>-dialog.tsx` |

---

## Quick decision guide

```
Does the form have 3 or more fields?
├── Yes → use the full-page form pattern  →  crud-page-form.md
└── No  → use the dialog form pattern     →  crud-dialog-form.md
```

The table layer (`crud-table.md`) is identical in both patterns — only `onEdit`'s signature changes.
