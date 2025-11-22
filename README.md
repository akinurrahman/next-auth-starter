# Next Auth Starter

A feature-based Next.js starter template focused on clean architecture, modern tooling, and a complete authentication flow.  
Originally built for personal use by **Akinur Rahman**, now shared publicly in case it helps someone skip the boring setup phase.

## Overview

This is a production-ready frontend starter built with the App Router and structured around a scalable feature-based architecture.  
It includes a full authentication flow, token refresh handling, Axios utilities, UI foundations, and the essential setup needed to start shipping features immediately.

## Features

- Feature-based folder architecture
- Next.js App Router (v15)
- Authentication (login, logout, refresh token)
- Access-denied handling & protected routes
- Zustand state with persisted auth
- Axios instance with interceptors
- Token refresh queueing and retry logic
- TanStack Query integration
- Shadcn UI with TailwindCSS v4
- Global theming (light/dark/system)
- Reusable UI components (input, loader, table, dialogs, etc.)
- Helper utilities (cookies, debounce, API logging)
- Zod validation for forms
- Husky, lint-staged, and Prettier configured

## Tech Stack

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Zustand**
- **TanStack Query**
- **Axios**
- **TailwindCSS 4**
- **Shadcn UI**
- **Zod**
- **Sonner**

## Folder Structure

```plaintext
src/
├─ app/
│  ├─ (auth)/
│  │  ├─ login/
│  │  ├─ register/          # if exists
│  │  └─ layout.tsx
│  ├─ admin/
│  ├─ access-denied/
│  ├─ layout.tsx
│  └─ page.tsx
│
├─ features/
│  ├─ auth/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  ├─ types/
│  │  └─ validators/
│  └─ dashboard/
│
├─ components/
│  ├─ form-input/
│  ├─ layout/
│  ├─ loader/
│  ├─ providers/
│  ├─ table/
│  ├─ ui/
│  └─ utils/
│
├─ lib/
│  ├─ api/
│  │  ├─ api.ts
│  │  ├─ api-call.ts
│  │  ├─ interceptors.ts
│  │  ├─ log-api-error.ts
│  │  ├─ cookie-helper.ts
│  │  ├─ debounce.ts
│  │  └─ utils.ts
│  └─ hooks/
│
├─ stores/
│  ├─ auth.store.ts
│  ├─ breadcrumb.store.ts
│  ├─ delete-confirmation.ts
│  └─ sidebar.store.ts
│
├─ constants/
├─ types/
├─ validators/
└─ assets/
```

## Notes

- Frontend-only template that works with any backend providing access and refresh tokens.
- Automatic token refreshing handled through Axios interceptors.
- Authentication state persisted through Zustand.
- Folder structure kept intentionally minimal but scalable for real production use.
- Not a demo project. This template is meant to be a solid base for real applications.

## Author

**Akinur Rahman**  
Frontend-focused Fullstack Developer  
Originally created for personal use; shared publicly for anyone who wants a head start.

## License

MIT

