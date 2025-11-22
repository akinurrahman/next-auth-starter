import Image from 'next/image';
import Link from 'next/link';

import { UseMutationResult } from '@tanstack/react-query';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Warehouse } from '@/assets';
import { FormInput } from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/components/ui/field';
import { APP_NAME } from '@/constants';
import { cn } from '@/lib/utils';

import { AuthResponse } from '../types/auth.types';
import { LoginInput } from '../validators/auth.schema';

interface LoginProps {
  form: UseFormReturn<LoginInput>;
  onSubmit: (data: LoginInput) => void;
  mutation: UseMutationResult<AuthResponse, unknown, LoginInput>;
}

const LoginForm = ({ form, onSubmit, mutation }: LoginProps) => {
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <FormProvider {...form}>
            <form
              className="flex flex-col justify-center p-6 md:min-h-[500px] md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <div className="mb-4 flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your {APP_NAME} account
                  </p>
                </div>

                <FormInput
                  name="email"
                  placeholder="admin@ims.com"
                  fieldType="input"
                  label="Email"
                />
                <FormInput
                  name="password"
                  placeholder="********"
                  fieldType="input"
                  label="Password"
                  type="password"
                />

                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Field>
                  <Button type="submit" className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Logging in...' : 'Login'}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </FormProvider>
          <div className="bg-muted relative hidden md:block">
            <Image
              src={Warehouse}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6]"
              fill
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default LoginForm;
