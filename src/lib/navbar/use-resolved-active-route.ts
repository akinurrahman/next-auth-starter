import { usePathname } from 'next/navigation';

export function useResolvedActiveRoute(resolvedUrl: (url: string) => string) {
  const pathname = usePathname();

  const isRouteActive = (url: string) => {
    const resolved = resolvedUrl(url);
    return pathname === resolved || pathname.startsWith(`${resolved}/`);
  };

  const isExact = (url: string) => {
    const resolved = resolvedUrl(url);
    return pathname === resolved;
  };

  return { pathname, isRouteActive, isExact };
}
