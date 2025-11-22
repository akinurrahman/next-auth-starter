# GitHub Copilot Instructions

## Project Architecture & Development Guidelines

This is a **Next.js TypeScript application** with a strict architectural pattern. Follow these rules precisely:

### 📁 Project Structure
```
src/
├── features/          # Feature-based modules (auth, dashboard, settings, etc.)
├── components/        # Reusable UI components (presentation only)
├── hooks/            # Custom React hooks (business logic)
├── lib/              # Utilities and helper functions
├── stores/           # State management (Zustand/Context)
├── validators/       # Zod schemas for validation
├── types/            # TypeScript interfaces and types
└── constants/        # App-wide constants
```

### 🎯 Core Principles

**1. Single Responsibility Principle (SRP)**
- Each file/component has ONE clear purpose
- UI components are PURELY presentational
- NO business logic in components

**2. Feature-Based Development**
- Related code lives together in `src/features/[feature-name]/`
- Each feature contains its own components, hooks, and types
- Example: `src/features/auth/`, `src/features/dashboard/`

**3. Logic Separation Pattern**
- **Feature-specific business logic** → `src/features/[feature-name]/hooks/`
- **Reusable/shared business logic** → `src/hooks/`
- Hooks are called at the TOP LEVEL of components
- Hook results are passed DOWN as props to children
- Components receive data via props, never fetch directly

### 📝 Development Rules

**When creating a new feature:**
```
src/features/[feature-name]/
├── components/       # Feature-specific UI components
├── hooks/           # Feature-specific custom hooks
├── types.ts         # Feature-specific types
└── index.ts         # Public exports
```

**UI Component Pattern:**
```typescript
// ❌ WRONG - Logic in component
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);
  
  return <div>{/* UI */}</div>;
}

// ✅ CORRECT - Logic in hook, passed as props
function UserList({ users, loading, onDelete }: UserListProps) {
  return <div>{/* UI */}</div>;
}

// Parent component
function UserListContainer() {
  const { users, loading, handleDelete } = useUsers(); // Hook has all logic
  return <UserList users={users} loading={loading} onDelete={handleDelete} />;
}
```

**Custom Hook Pattern:**
```typescript
// src/hooks/use-users.ts
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  
  const handleDelete = async (id: string) => {
    // All logic here
  };
  
  useEffect(() => {
    // Fetch logic here
  }, []);
  
  return { users, loading, handleDelete };
}
```

### 🔧 Tech Stack Context
- **Framework:** Next.js (App Router)
- **UI Library:** shadcn/ui + Tailwind CSS
- **Form Handling:** React Hook Form + Zod
- **State Management:** Zustand (in `src/stores/`)
- **Data Fetching:** React Query (TanStack Query)
- **Type Safety:** TypeScript (strict mode)

### ✅ Checklist for Every Implementation

Before writing code, ensure:
- [ ] Is this a new feature? → Create in `src/features/[name]/`
- [ ] Does it have logic? → Extract to custom hook in `hooks/`
- [ ] Is it reusable UI? → Put in `src/components/ui/`
- [ ] Does it need validation? → Create Zod schema in `validators/`
- [ ] Does it need types? → Define in `types/` or feature's `types.ts`
- [ ] Components receive ALL data via props (no internal fetching)
- [ ] Hooks are called at top level and results passed down

### 🚫 What NOT to Do
- Don't put business logic in UI components
- Don't fetch data directly in presentational components
- Don't create God components (split into smaller pieces)
- Don't bypass the feature structure for quick fixes
- Don't duplicate code (create reusable hooks/utils)

### 📋 Implementation Approach

When building new features:
1. Identify if it's a new feature or enhancement
2. Create proper file structure in `src/features/` or appropriate location
3. Extract all logic into custom hooks
4. Build presentational components that receive props
5. Follow existing patterns in the codebase

**Always maintain this architecture. Never compromise on separation of concerns.**
**If asked for some bug fixed don't use patch works, find the root cause and fix it properly.**

