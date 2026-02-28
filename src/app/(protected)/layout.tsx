import LayoutWrapper from '@/components/layout';
import AuthGuard from '@/components/providers/auth-guard';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <LayoutWrapper>{children}</LayoutWrapper>
    </AuthGuard>
  );
}
