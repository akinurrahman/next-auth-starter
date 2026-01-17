# Form Input System

A type-safe, reusable form input component system built on React Hook Form with comprehensive field type support.

## Quick Start

```tsx
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '@/systems/form-input';

function MyForm() {
  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      role: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          fieldType="input"
          name="username"
          label="Username"
          placeholder="Enter username"
          required
        />
        
        <FormInput
          fieldType="select"
          name="role"
          label="Role"
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
          required
        />
        
        <FormInput
          fieldType="checkbox"
          name="agreeToTerms"
          label="I agree to the terms and conditions"
          required
        />
        
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Field Types

### Text Input
```tsx
<FormInput
  fieldType="input"
  type="text" // default
  name="fullName"
  label="Full Name"
  placeholder="John Doe"
  description="Enter your full legal name"
  required
/>
```

### Number Input
```tsx
<FormInput
  fieldType="input"
  type="number"
  name="age"
  label="Age"
  placeholder="25"
  max={120}
  required
/>
```

### Password Input
```tsx
<FormInput
  fieldType="input"
  type="password"
  name="password"
  label="Password"
  placeholder="••••••••"
  description="Must be at least 8 characters"
  required
/>
```

### Multi-Item Input
```tsx
<FormInput
  fieldType="input"
  type="multi-item"
  name="tags"
  label="Tags"
  placeholder="Add tags"
  description="Press Enter to add a tag"
/>
```

### Date & Time Input
```tsx
<FormInput
  fieldType="input"
  type="date"
  name="birthDate"
  label="Birth Date"
  required
/>

<FormInput
  fieldType="input"
  type="time"
  name="appointmentTime"
  label="Appointment Time"
/>
```

### Textarea
```tsx
<FormInput
  fieldType="textarea"
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  rows={5}
  maxLength={500}
  description="Maximum 500 characters"
/>
```

### Select Dropdown
```tsx
<FormInput
  fieldType="select"
  name="country"
  label="Country"
  placeholder="Select a country"
  options={[
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ]}
  required
/>
```

### Radio Group
```tsx
<FormInput
  fieldType="radio-group"
  name="plan"
  label="Subscription Plan"
  options={[
    {
      value: 'free',
      label: 'Free',
      description: 'Basic features for personal use',
    },
    {
      value: 'pro',
      label: 'Pro',
      description: 'Advanced features for professionals',
    },
    {
      value: 'enterprise',
      label: 'Enterprise',
      description: 'Full suite for organizations',
    },
  ]}
  required
/>
```

### Checkbox
```tsx
<FormInput
  fieldType="checkbox"
  name="newsletter"
  label="Subscribe to newsletter"
  description="Get weekly updates about new features"
/>
```

### Switch
```tsx
<FormInput
  fieldType="switch"
  name="notifications"
  title="Enable Notifications"
  details="Receive push notifications for important updates"
/>
```

### Slider
```tsx
<FormInput
  fieldType="slider"
  name="budget"
  label="Monthly Budget"
  sliderLabel="Budget Amount"
  suffix="USD"
  max={10000}
  marks={[0, 2500, 5000, 7500, 10000]}
  description="Set your monthly spending limit"
/>
```

## Common Props

All field types support these base properties:

```typescript
interface BaseFieldProps {
  name: string;              // Field name (required)
  label?: string;            // Field label
  description?: string;      // Help text below field
  placeholder?: string;      // Placeholder text
  required?: boolean;        // Show required indicator
  disabled?: boolean;        // Disable field
  title?: string;            // Tooltip title
  max?: number;              // Max value (for numbers/sliders)
  className?: string;        // Additional CSS classes
}
```

## Field-Specific Props

### InputFieldProps
```typescript
{
  fieldType: 'input';
  type?: 'text' | 'number' | 'multi-item' | 'password' | 'date' | 'time';
}
```

### TextareaFieldProps
```typescript
{
  fieldType: 'textarea';
  rows?: number;             // Number of visible rows
  maxLength?: number;        // Maximum character length
}
```

### SelectFieldProps
```typescript
{
  fieldType: 'select';
  options: Array<{
    label: string;
    value: string;
  }>;
}
```

### RadioGroupProps
```typescript
{
  fieldType: 'radio-group';
  options: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}
```

### SliderFieldProps
```typescript
{
  fieldType: 'slider';
  sliderLabel: string;       // Label shown on slider
  suffix: string;            // Unit suffix (e.g., 'USD', '%')
  marks?: number[];          // Position markers on slider
  max: number;               // Maximum value (required)
}
```

### SwitchFieldProps
```typescript
{
  fieldType: 'switch';
  details?: string;          // Additional description
}
```

### FileUploadProps
```typescript
{
  fieldType: 'file';
  accept?: string;           // Accepted file types
  FileDescription?: string;  // File upload instructions
  variant: 'v1' | 'v2' | 'v3'; // UI variant
  multiple?: boolean;        // Allow multiple files
}
```

## Integration with React Hook Form

The FormInput component is designed to work seamlessly with React Hook Form:

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['admin', 'user']),
  newsletter: z.boolean(),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      role: 'user',
      newsletter: false,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormInput
          fieldType="input"
          type="text"
          name="email"
          label="Email"
          required
        />
        <FormInput
          fieldType="input"
          type="password"
          name="password"
          label="Password"
          required
        />
        <FormInput
          fieldType="select"
          name="role"
          label="Role"
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ]}
        />
        <FormInput
          fieldType="checkbox"
          name="newsletter"
          label="Subscribe to newsletter"
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
```

## Validation

Validation is handled by React Hook Form and can be configured using:

- **Zod schemas** (recommended)
- **Yup schemas**
- **Custom validation rules**

The FormInput component automatically displays validation errors via `<FormMessage />`.

## Styling

The component uses shadcn/ui components with Tailwind CSS. You can:

- Override styles using the `className` prop
- Customize the theme in your `tailwind.config.js`
- Modify individual field components in `src/systems/form-input/fields/`

## Architecture

```
form-input/
├── index.tsx                    # Main FormInput component
├── render-field-by-types.tsx    # Field type dispatcher
├── types.ts                     # TypeScript definitions
├── fields/                      # Individual field components
│   ├── check-box.tsx
│   ├── radio-group.tsx
│   ├── select-field.tsx
│   ├── slider-field.tsx
│   ├── switch-field.tsx
│   ├── text-area.tsx
│   ├── input/
│   │   ├── default-input.tsx
│   │   ├── number-input.tsx
│   │   ├── password-input.tsx
│   │   └── item-list-input.tsx
│   └── file-upload/
│       └── ...
└── hooks/
    └── use-file-upload.ts
```

## Best Practices

1. **Always wrap with FormProvider**: The component requires React Hook Form context
2. **Use TypeScript**: Leverage the type system for type-safe form configuration
3. **Validation schemas**: Use Zod or Yup for robust validation
4. **Accessibility**: Labels are automatically associated with inputs
5. **Error messages**: Validation errors are shown automatically
6. **Required fields**: Use the `required` prop to show the asterisk indicator

## Examples

### Login Form
```tsx
<FormInput fieldType="input" type="text" name="email" label="Email" required />
<FormInput fieldType="input" type="password" name="password" label="Password" required />
<FormInput fieldType="checkbox" name="remember" label="Remember me" />
```

### User Profile Form
```tsx
<FormInput fieldType="input" name="firstName" label="First Name" required />
<FormInput fieldType="input" name="lastName" label="Last Name" required />
<FormInput fieldType="textarea" name="bio" label="Bio" rows={4} maxLength={200} />
<FormInput
  fieldType="select"
  name="country"
  label="Country"
  options={countries}
  required
/>
<FormInput
  fieldType="switch"
  name="publicProfile"
  title="Public Profile"
  details="Make your profile visible to others"
/>
```

### Survey Form
```tsx
<FormInput
  fieldType="radio-group"
  name="satisfaction"
  label="How satisfied are you?"
  options={[
    { value: '1', label: 'Very Dissatisfied', description: 'Not happy at all' },
    { value: '2', label: 'Dissatisfied', description: 'Could be better' },
    { value: '3', label: 'Neutral', description: 'It\'s okay' },
    { value: '4', label: 'Satisfied', description: 'Pretty good' },
    { value: '5', label: 'Very Satisfied', description: 'Excellent!' },
  ]}
/>
<FormInput
  fieldType="slider"
  name="likelihood"
  label="Likelihood to Recommend"
  sliderLabel="Score"
  suffix="/10"
  max={10}
  marks={[0, 5, 10]}
/>
```
