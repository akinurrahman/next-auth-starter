'use client';

import LoginForm from '../components/login-form';
import { useLoginFlow } from '../hooks/use-login-flow';

export default function LoginPage() {
  const { form, mutation, actions } = useLoginFlow();
  return (
    <div className="from-background via-background to-primary/5 relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-linear-to-br p-6 md:p-10">
      {/* Subtle decorative blobs */}
      <div className="bg-primary/8 pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl" />
      <div className="relative w-full max-w-sm md:max-w-4xl">
        <LoginForm form={form} onSubmit={actions.handleSubmit} mutation={mutation} />
      </div>
    </div>
  );
}
