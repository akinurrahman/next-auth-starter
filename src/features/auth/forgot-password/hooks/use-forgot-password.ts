import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/lib/api/api-call';
import { BaseApiResponse } from '@/types';

import {
  ForgotPasswordRequestOtpInput,
  ForgotPasswordResetPasswordInput,
  ForgotPasswordVerifyOtpInput,
} from '../validators/forgot-password.schema';

export const useForgotPasswordRequestOtp = () => {
  return useMutation<unknown, unknown, ForgotPasswordRequestOtpInput>({
    mutationFn: data => apiCall(`/auth/forgot-password/request-otp`, data, 'POST'),
  });
};

export const useForgotPasswordVerifyOtp = () => {
  return useMutation<
    BaseApiResponse<{ resetToken: string }>,
    unknown,
    ForgotPasswordVerifyOtpInput
  >({
    mutationFn: data => apiCall(`/auth/forgot-password/verify-otp`, data, 'POST'),
  });
};

export const useForgotPasswordReset = () => {
  return useMutation<unknown, unknown, ForgotPasswordResetPasswordInput>({
    mutationFn: data => apiCall(`/auth/forgot-password/reset-password`, data, 'POST'),
  });
};
