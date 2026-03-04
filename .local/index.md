# CRUD Feature Guide — Index

> This file is the entry point. Attach the relevant files listed below to every AI session.

---

## Which files to attach

**Always attach (every feature):**
- `crud-base.md` — folder structure, definitions, API hooks, shared components, utilities, aliases, checklist
- `crud-table.md` — column factory + DataTable wrapper (covers both standard and dialog variants)

**Then attach exactly one based on form complexity:**

| Form complexity | Attach |
|---|---|
| 3+ fields, needs its own page | `crud-page-form.md` |
| 1–2 fields, dialog is enough | `crud-dialog-form.md` |

---

## File responsibilities

| File | What it covers |
|---|---|
| `crud-base.md` | §1 developer inputs, §2 folder layout, §3 app routes, §4–6 definitions, §7 API hooks, §8 shared components, §9 utilities, §10 aliases, §11 checklist |
| `crud-table.md` | `<feature>-column.tsx` + `<feature>-table.tsx` — standard and dialog variants side by side |
| `crud-page-form.md` | `use-<feature>-form.ts` (page), `<feature>-list.tsx` (page), `<feature>-form.tsx` |
| `crud-dialog-form.md` | `use-<feature>-form.ts` (dialog), `<feature>-list.tsx` (dialog), `<feature>-dialog.tsx` |
