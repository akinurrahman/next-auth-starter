# Cascading Selects — FormInput System

A guide to building cascading (dependent) select fields using `FormInput`, API hooks, and React Hook Form.

---

## What is Cascading?

A cascading select is a field whose available options — or very visibility — depends on the value of another field. Classic examples:

- **Academic Year → Class → Section**: you must pick a year before classes are relevant, and a class before sections appear.
- **Country → State → City**: each level filters the next.
- **Department → Role**: role list changes based on selected department.

The system handles two things automatically:

1. **Auto-clear** — when a parent field changes, all descendant fields reset to empty, recursively (A → B → C all clear when A changes).
2. **Hide until parent selected** — a dependent field can be hidden until its parent has a value, making the form less overwhelming.

---

## The Two Props

Both are available on **every** `FormInput` field type (not just `select`):

| Prop | Type | Default | Description |
|---|---|---|---|
| `dependsOn` | `string` | `undefined` | The `name` of the parent field. When that field's value changes, this field's value is **cleared automatically**. |
| `alwaysVisible` | `boolean` | `false` | When `true`, the field is always rendered even if the parent has no value yet. Clear-on-parent-change still applies. |

And for `select` fields specifically:

| Prop | Type | Description |
|---|---|---|
| `optionsFn` | `(formValues: Record<string, unknown>) => SelectOption[]` | Dynamic options callback. Receives the **full current form state**. Overrides `options` when provided. Called on every re-render triggered by the parent field changing. |

---

## Visibility Rules

| `dependsOn` set? | `alwaysVisible` | Parent has value? | Field rendered? |
|---|---|---|---|
| No | — | — | ✅ Always |
| Yes | `false` (default) | No | ❌ Hidden |
| Yes | `false` (default) | Yes | ✅ Visible |
| Yes | `true` | No | ✅ Visible (only clears) |
| Yes | `true` | Yes | ✅ Visible |

---

## Pattern: API-backed Cascading (Recommended)

When each level of the cascade requires a separate API call (scoped to the parent's ID), fetch the data at the component level and expose it through `optionsFn`.

### Step 1 — Watch the parent field to drive the hook

Use `form.watch()` to get the live parent value and pass it as a parameter to the query hook. React Query will refetch automatically when the value changes.

```tsx
const academicYearId = form.watch('academicYearId');
const classInstanceId = form.watch('classInstanceId');

// Fetches class instances for the selected academic year
const { data: classInstancesData } = useGetClassInstances({
    academicYear: academicYearId ?? '',
});

// Fetches sections for the selected class instance
const { data: sectionsData } = useGetSections({
    classInstanceId: classInstanceId ?? '',
});
```

> Make sure each hook has `enabled: !!paramId` so it doesn't fire with an empty string.

### Step 2 — Wire `dependsOn` + `optionsFn` on the fields

```tsx
{/* Level 1 — no dependsOn, always visible */}
<FormInput
    fieldType="select"
    name="academicYearId"
    label="Academic Year"
    placeholder="Select academic year"
    options={academicYearOptions}
    required
/>

{/* Level 2 — always visible but clears when year changes */}
<FormInput
    fieldType="select"
    name="classInstanceId"
    label="Class"
    placeholder="Select class"
    dependsOn="academicYearId"
    alwaysVisible   {/* show even before year is chosen */}
    optionsFn={() =>
        classInstancesData?.data?.map(c => ({
            value: c.id,
            label: c.classId.name,
        })) ?? []
    }
    required
/>

{/* Level 3 — hidden until a class is selected */}
<FormInput
    fieldType="select"
    name="sectionId"
    label="Section"
    placeholder="Select section"
    dependsOn="classInstanceId"
    {/* no alwaysVisible → hidden until class is picked */}
    optionsFn={() =>
        sectionsData?.data?.map(s => ({
            value: s.id,
            label: s.name,
        })) ?? []
    }
/>
```

### Full example (student enrollment form)

```tsx
'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '@form-input';
import { useGetAcademicYears } from '@/features/academics-management/academic-years/hooks/use-academic-year';
import { useGetClassInstances } from '@/features/academics-management/class-instances/hooks/use-class';
import { useGetSections } from '@/features/academics-management/class-instances/hooks/use-sections';

type FormValues = {
    academicYearId: string;
    classInstanceId: string;
    sectionId: string;
};

export function EnrollmentForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            academicYearId: '',
            classInstanceId: '',
            sectionId: '',
        },
    });

    // Watch the fields that drive dependent fetches
    const academicYearId  = form.watch('academicYearId');
    const classInstanceId = form.watch('classInstanceId');

    // Fetch data scoped to the current parent values
    const { data: yearsData }         = useGetAcademicYears({ page: '1', limit: '100' });
    const { data: classInstancesData } = useGetClassInstances({ academicYear: academicYearId ?? '' });
    const { data: sectionsData }       = useGetSections({ classInstanceId: classInstanceId ?? '' });

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(console.log)} className="grid grid-cols-3 gap-4">

                {/* Level 1 */}
                <FormInput
                    fieldType="select"
                    name="academicYearId"
                    label="Academic Year"
                    placeholder="Select academic year"
                    options={yearsData?.data?.map(y => ({ value: y.id, label: y.name })) ?? []}
                    required
                />

                {/* Level 2 — always visible, clears when year changes */}
                <FormInput
                    fieldType="select"
                    name="classInstanceId"
                    label="Class"
                    placeholder="Select class"
                    dependsOn="academicYearId"
                    alwaysVisible
                    optionsFn={() =>
                        classInstancesData?.data?.map(c => ({
                            value: c.id,
                            label: c.classId.name,
                        })) ?? []
                    }
                    required
                />

                {/* Level 3 — hidden until class is selected */}
                <FormInput
                    fieldType="select"
                    name="sectionId"
                    label="Section"
                    placeholder="Select section"
                    dependsOn="classInstanceId"
                    optionsFn={() =>
                        sectionsData?.data?.map(s => ({
                            value: s.id,
                            label: s.name,
                        })) ?? []
                    }
                />

                <button type="submit">Enroll</button>
            </form>
        </FormProvider>
    );
}
```

---

## Pattern: Client-side Filtering with `optionsFn`

When all data is already available (e.g. a small static list or fully pre-fetched), skip the scoped hook and filter inside `optionsFn` instead. The function receives the **full form values** so you can use any field, not just the direct parent.

```tsx
// All departments and roles pre-fetched once
const { data: allRoles } = useGetAllRoles();

<FormInput
    fieldType="select"
    name="departmentId"
    label="Department"
    options={departmentOptions}
/>

<FormInput
    fieldType="select"
    name="roleId"
    label="Role"
    dependsOn="departmentId"
    optionsFn={(formValues) =>
        allRoles
            ?.filter(r => r.departmentId === formValues.departmentId)
            ?.map(r => ({ value: r.id, label: r.name })) ?? []
    }
/>
```

---

## Pattern: Edit Mode (Pre-populated Values)

When editing an existing record, the form is populated with default values via `useForm({ defaultValues: ... })`. The cascade system skips the auto-clear on the initial mount, so pre-populated values are preserved.

For sections in edit mode — where the class instance comes from the existing record rather than the form field — pass the recorded ID directly to the hook:

```tsx
// studentClassInstanceId comes from the fetched student data
const { form, studentClassInstanceId } = useStudentForm({ studentId, yearId });
const classInstanceId = form.watch('classInstanceId');

const sectionSourceId = isEditMode ? studentClassInstanceId : classInstanceId;

const { data: sectionsData } = useGetSections({
    classInstanceId: sectionSourceId ?? '',
});

// In edit mode, no dependsOn needed — the parent field isn't shown
{isEditMode && (
    <FormInput
        fieldType="select"
        name="sectionId"
        label="Section"
        placeholder="Select section"
        optionsFn={() =>
            sectionsData?.data?.map(s => ({ value: s.id, label: s.name })) ?? []
        }
        required
    />
)}
```

---

## Multi-level Chains (A → B → C → ...)

Cascading is **recursive**. When a grandparent changes, all descendants clear in the same update — you don't need any extra code. Just define each field's `dependsOn` to point at its direct parent.

```tsx
// Country → State → City → District
<FormInput name="countryId"  fieldType="select" options={countries} />
<FormInput name="stateId"    fieldType="select" dependsOn="countryId"  alwaysVisible optionsFn={...} />
<FormInput name="cityId"     fieldType="select" dependsOn="stateId"    optionsFn={...} />
<FormInput name="districtId" fieldType="select" dependsOn="cityId"     optionsFn={...} />
```

Changing `countryId` clears `stateId` → which triggers the clear of `cityId` → which triggers the clear of `districtId`. All in one React state cycle.

---

## `optionsFn` vs `options` — When to Use Which

| Scenario | Use |
|---|---|
| Static list that never changes | `options` |
| API-scoped to parent ID (re-fetches per parent) | `optionsFn` + hook at component level |
| Large pre-fetched list filtered client-side | `optionsFn` with filter logic inside |
| Options depend on multiple form fields at once | `optionsFn` (receives full `formValues`) |

---

## Hook Setup Checklist

When hooking up a new cascading chain backed by API calls:

- [ ] Add `enabled: !!parentId` to the child's query hook so it doesn't fire with an empty string
- [ ] Call `form.watch('parentFieldName')` in the component to get a reactive value
- [ ] Pass the watched value as the scoped parameter to the child hook
- [ ] Add `dependsOn="parentFieldName"` on the child `FormInput`
- [ ] Decide: `alwaysVisible` (show always, only clears) or hidden-until-parent (default)
- [ ] Use `optionsFn` to map the hook data into `{ value, label }` pairs

---

## Troubleshooting

**Child field doesn't clear when parent changes**
→ Check that `dependsOn` matches the parent's `name` exactly (case-sensitive).

**Child clears on initial render / edit mode values get wiped**
→ This is guarded by an `isMounted` ref inside `SelectField`. If values are still wiped, make sure `defaultValues` are set in `useForm` before the first render, not injected asynchronously after.

**`optionsFn` returns stale options**
→ The function is re-called on every render triggered by `useWatch` on the parent. If the options still appear stale, confirm the hook's `queryKey` includes the parent ID so React Query refetches when it changes.

**Field is hidden but `dependsOn` parent has a value**
→ Check that `alwaysVisible` is not accidentally omitted. Also confirm the parent field `name` matches exactly what's in `dependsOn`.

**API fires with empty string**
→ Add `enabled: !!classInstanceId` (or equivalent) to the query hook options.
