'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationResult } from '@tanstack/react-query';
import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { FormInput } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldTitle } from '@/components/ui/field';
import { getErrorMessage } from '@/lib/utils';

import {
  ForgotPasswordRequestOtpInput,
  forgotPasswordRequestOtpSchema,
} from '../validators/forgot-password.schema';

type Props = {
  onSubmit: (data: ForgotPasswordRequestOtpInput) => void;
  mutation: UseMutationResult<unknown, unknown, ForgotPasswordRequestOtpInput>;
};

const RequestOtpForm = ({ onSubmit, mutation }: Props) => {
  const form = useForm<ForgotPasswordRequestOtpInput>({
    resolver: zodResolver(forgotPasswordRequestOtpSchema),
    defaultValues: {
      email: '',
    },
  });

  const emailValue = form.watch('email');

  // reset error on input change
  useEffect(() => {
    if (mutation.isError) mutation.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <KeyRound className="size-6" />
              </div>
              <span className="sr-only">Reset Password</span>
            </a>
            <FieldTitle className="text-xl leading-tight font-bold">Reset Password</FieldTitle>
            <FieldDescription className="leading-tight">
              Enter your email to receive a one-time code.
            </FieldDescription>
          </div>
          <div>
            <FormInput name="email" label="Email" placeholder="you@example.com" fieldType="input" />
            {mutation.isError && (
              <p className="mt-1.5 text-sm text-red-600">{getErrorMessage(mutation.error)}</p>
            )}
          </div>
          <Field>
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Sending...' : 'Send OTP'}
            </Button>
          </Field>
          <p className="text-muted-foreground text-center text-sm">
            Remember your password?{' '}
            <Link href="/login" className="text-primary underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </FieldGroup>
      </form>
    </FormProvider>
  );
};

export default RequestOtpForm;
