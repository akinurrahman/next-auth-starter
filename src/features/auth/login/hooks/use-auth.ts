import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/lib/api/api-call';
import { useAuthStore } from '@/stores/auth.store';

import { AuthResponse } from '../types/auth.types';
import { LoginInput } from '../validators/auth.schema';

export const useLogin = () => {
  return useMutation<AuthResponse, unknown, LoginInput>({
    mutationFn: payload => apiCall(`/auth/login`, payload, 'POST'),
  });
};

export const useLogout = () => {
  const router = useRouter();
  const refreshToken = useAuthStore(s => s.refreshToken);
  const logout = useAuthStore(s => s.logout);

  return useMutation({
    mutationFn: () => apiCall('/auth/logout', { refreshToken }, 'POST'),
    onSuccess: () => {
      logout();
      router.push('/login');
    },
  });
};
