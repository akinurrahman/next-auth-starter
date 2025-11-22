'use client';

import { RequestOtpForm, ResetPasswordForm, VerifyOtpForm } from '../components';
import { useForgotPasswordFlow } from '../hooks/use-forgot-password-flow';

export default function ForgotPasswordPage() {
  const { step, actions, email, mutations } = useForgotPasswordFlow();

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        {step === 1 && (
          <RequestOtpForm onSubmit={actions.handleRequestOtp} mutation={mutations.requestOtp} />
        )}
        {step === 2 && (
          <VerifyOtpForm
            email={email}
            onSubmit={actions.handleVerifyOtp}
            mutation={mutations.verifyOtp}
            onResend={actions.resendOtp}
            isResending={mutations.requestOtp.isPending}
          />
        )}
        {step === 3 && (
          <ResetPasswordForm
            onSubmit={actions.handleResetPassword}
            mutation={mutations.resetPassword}
          />
        )}
      </div>
    </div>
  );
}
