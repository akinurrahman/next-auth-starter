'use client';

import LoginForm from '../components/login-form';
import { useLoginFlow } from '../hooks/use-login-flow';

export default function LoginPage() {
  const { form, mutation, actions } = useLoginFlow();
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm form={form} onSubmit={actions.handleSubmit} mutation={mutation} />
      </div>
    </div>
  );
}
