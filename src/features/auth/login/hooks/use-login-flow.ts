import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/error';
import { useAuthStore } from '@/stores/auth.store';

import { LoginInput, loginSchema } from '../validators/auth.schema';
import { useLogin } from './use-auth';

export function useLoginFlow() {
  const loginMutation = useLogin();
  const authStoreLogin = useAuthStore(s => s.login);

  const form = useForm<LoginInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const handleSubmit: SubmitHandler<LoginInput> = async data => {
    try {
      const response = await loginMutation.mutateAsync(data);

      authStoreLogin({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        user: response.data.user,
      });

      toast.success('Login successful');

      // router.push(
      //   DEFAULT_ROUTES_BY_ROLE[response.data.user.role]
      // );
    } catch (error) {
      form.setError('password', {
        type: 'manual',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    form,
    mutation: loginMutation,
    actions: { handleSubmit },
  };
}
