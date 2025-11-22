import z from 'zod';

export const forgotPasswordRequestOtpSchema = z.object({
  email: z.email('Invalid email address'),
});

export const forgotPasswordVerifyOtpSchema = z.object({
  email: z.email('Invalid email address'),
  otp: z.string('Otp is required').length(6, 'OTP must be 6 characters long'),
});

export const forgotPasswordResendOtpSchema = z.object({
  email: z.email('Invalid email address'),
});

export const forgotPasswordResetPasswordSchema = z
  .object({
    resetToken: z.string('Reset token is required'),
    password: z
      .string('password is required')
      .min(8, 'New Password must be at least 8 characters long'),
    confirmPassword: z
      .string('Confirm password is required')
      .min(8, 'Confirm Password must be at least 8 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const resetPasswordSchema = z.object({
  oldPassword: z.string().min(8, 'Old Password must be at least 8 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type ForgotPasswordRequestOtpInput = z.infer<typeof forgotPasswordRequestOtpSchema>;
export type ForgotPasswordVerifyOtpInput = z.infer<typeof forgotPasswordVerifyOtpSchema>;
export type ForgotPasswordResendOtpInput = z.infer<typeof forgotPasswordResendOtpSchema>;
export type ForgotPasswordResetPasswordInput = z.infer<typeof forgotPasswordResetPasswordSchema>;
