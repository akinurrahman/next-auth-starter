import { UserRole } from '@/constants/ROLES';
import type { BaseEntity } from '@/types';

export type User = BaseEntity & {
  fullName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  lastLogin: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
};
