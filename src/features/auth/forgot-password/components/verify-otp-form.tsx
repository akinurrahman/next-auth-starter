'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationResult } from '@tanstack/react-query';
import { KeyRound } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';

import { FormInput } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldTitle } from '@/components/ui/field';
import { useCooldownTimer } from '@/hooks/use-cooldown-timer';
import { getErrorMessage } from '@/lib/utils';
import { BaseApiResponse } from '@/types';

import {
  ForgotPasswordVerifyOtpInput,
  forgotPasswordVerifyOtpSchema,
} from '../validators/forgot-password.schema';

type Props = {
  email: string | null;
  onSubmit: (data: ForgotPasswordVerifyOtpInput) => void;
  mutation: UseMutationResult<
    BaseApiResponse<{ resetToken: string }>,
    unknown,
    ForgotPasswordVerifyOtpInput
  >;
  onResend: () => Promise<void>;
  isResending: boolean;
};

const VerifyOtpForm = ({ email, onSubmit, mutation, onResend, isResending }: Props) => {
  const { timeLeft, isCooling, start } = useCooldownTimer(30);

  const form = useForm<ForgotPasswordVerifyOtpInput>({
    resolver: zodResolver(forgotPasswordVerifyOtpSchema),
    defaultValues: { email: email || '', otp: '' },
  });

  const otp = form.watch('otp');

  const handleResendClick = async () => {
    await onResend();
    start(); // Start cooldown ONLY after successful resend
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset error on otp change
  useEffect(() => {
    if (mutation.isError) mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <KeyRound className="size-6" />
            </div>
            <FieldTitle className="text-xl leading-tight font-bold">Check Your Inbox</FieldTitle>
            <FieldDescription>
              Enter the verification code we sent to <span className="font-medium">{email}</span>
            </FieldDescription>
          </div>

          <div>
            <FormInput name="otp" label="OTP" placeholder="123456" fieldType="input" />
            {mutation.isError && (
              <p className="mt-1.5 text-sm text-red-600">{getErrorMessage(mutation.error)}</p>
            )}
          </div>

          <Field>
            <Button className="w-full" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Verifying...' : 'Verify OTP'}
            </Button>
          </Field>

          <p className="text-muted-foreground text-center text-sm">
            Didn’t receive the code?{' '}
            <button
              type="button"
              disabled={isResending || isCooling}
              onClick={handleResendClick}
              className="text-primary underline-offset-4 hover:underline disabled:opacity-50"
            >
              {isResending ? 'Resending…' : isCooling ? `Resend in ${timeLeft}s` : 'Resend'}
            </button>
          </p>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};

export default VerifyOtpForm;
