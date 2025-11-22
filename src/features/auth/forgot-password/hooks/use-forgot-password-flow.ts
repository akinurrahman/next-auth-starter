import { useRouter } from 'next/navigation';

import { parseAsInteger, useQueryState } from 'nuqs';
import { toast } from 'sonner';

import { getErrorMessage } from '@/lib/utils';

import { useForgotPasswordStore } from '../store/store';
import {
  ForgotPasswordRequestOtpInput,
  ForgotPasswordResetPasswordInput,
} from '../validators/forgot-password.schema';
import {
  useForgotPasswordRequestOtp,
  useForgotPasswordReset,
  useForgotPasswordVerifyOtp,
} from './use-forgot-password';

export function useForgotPasswordFlow() {
  const router = useRouter();
  const { email, setEmail, resetToken, setResetToken, clear } = useForgotPasswordStore();

  const [step, setStep] = useQueryState('step', parseAsInteger.withDefault(1));

  const requestOtp = useForgotPasswordRequestOtp();
  const verifyOtp = useForgotPasswordVerifyOtp();
  const resetPassword = useForgotPasswordReset();

  const handleRequestOtp = async (data: ForgotPasswordRequestOtpInput) => {
    try {
      await requestOtp.mutateAsync(data);
      setEmail(data.email);
      setStep(2);
    } catch {}
  };

  const resendOtp = async () => {
    if (!email) return;

    try {
      await requestOtp.mutateAsync({ email });
      toast.success('OTP sent again.');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleVerifyOtp = async (data: { email: string; otp: string }) => {
    try {
      const res = await verifyOtp.mutateAsync(data);
      setResetToken(res.data.resetToken);
      setStep(3);
    } catch {}
  };

  const handleResetPassword = async (data: ForgotPasswordResetPasswordInput) => {
    try {
      if (!resetToken) throw new Error('Reset token missing');
      await resetPassword.mutateAsync({ ...data, resetToken });
      clear();
      toast.success('Password reset successful. Please log in with your new password.');
      router.push('/login');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    step,
    email,
    resetToken,

    mutations: {
      requestOtp,
      verifyOtp,
      resetPassword,
    },

    actions: {
      handleRequestOtp,
      handleVerifyOtp,
      handleResetPassword,
      resendOtp,
    },
  };
}
