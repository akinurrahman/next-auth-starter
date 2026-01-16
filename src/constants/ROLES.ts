export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  ACCOUNTANT: 'ACCOUNTANT',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
