'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseMutationResult } from '@tanstack/react-query';
import { LockOpen } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

import { FormInput } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldTitle } from '@/components/ui/field';

import {
  ForgotPasswordResetPasswordInput,
  forgotPasswordResetPasswordSchema,
} from '../validators/forgot-password.schema';

type Props = {
  onSubmit: (data: ForgotPasswordResetPasswordInput) => void;
  mutation: UseMutationResult<unknown, unknown, ForgotPasswordResetPasswordInput>;
};

const ResetPasswordForm = ({ onSubmit, mutation }: Props) => {
  const form = useForm<ForgotPasswordResetPasswordInput>({
    resolver: zodResolver(forgotPasswordResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      resetToken: '', // flow hook injects this
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-8 items-center justify-center rounded-md">
              <LockOpen className="size-6" />
            </div>
            <FieldTitle className="text-xl leading-tight font-bold">Create New Password</FieldTitle>
            <FieldDescription className="leading-tight">
              Choose a strong password you haven&apos;t used before.
            </FieldDescription>
          </div>
          <FormInput
            name="password"
            label="New Password"
            placeholder="••••••••"
            type="password"
            fieldType="input"
          />
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            fieldType="input"
          />
          <Field>
            <Button className="w-full" type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Reset Password'}
            </Button>
          </Field>
          <p className="text-muted-foreground -mt-3 text-center text-sm">
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
export default ResetPasswordForm;
