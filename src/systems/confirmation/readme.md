# Confirmation System

A reusable confirmation dialog system built with Zustand for managing confirmation prompts across your application.

## Setup

Add the `ConfirmationDialog` component to your root layout:

```tsx
import { ConfirmationDialog } from '@/systems/confirmation/components/confirmation-dialog';

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <ConfirmationDialog />
    </>
  );
}
```

## Usage

```tsx
import { useConfirmation } from '@/systems/confirmation/hooks/use-confirmation';

function UserActions() {
  const { confirm } = useConfirmation<User>();

  const handleDelete = (user: User) => {
    confirm({
      item: user,
      title: 'Delete User',
      description: 'Are you sure you want to delete this user?',
      variant: 'delete',
      onConfirm: async (user) => {
        await deleteUser(user.id);
      },
    });
  };

  return <Button onClick={() => handleDelete(user)}>Delete</Button>;
}
```

## Options

- `item` - The item being confirmed (typed)
- `title` - Dialog title
- `description` - String or function returning ReactNode
- `variant` - `'delete' | 'confirm' | 'warning'` (default: `'delete'`)
- `confirmText` - Custom confirm button text
- `cancelText` - Custom cancel button text
- `onConfirm` - Async/sync function called on confirmation
