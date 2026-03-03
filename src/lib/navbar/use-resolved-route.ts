import { useMemo } from 'react';

import { resolveRoute } from './resolve-route';

type RouteParams = Record<string, string | number | null | undefined>;

export function useResolvedRoute(externalParams?: RouteParams) {
  // Placeholder params object
  const routeParams = useMemo(() => {
    return {
      // You can inject real values later
      ...externalParams,
    };
  }, [externalParams]);

  const resolvedUrl = useMemo(() => {
    return (url: string) => {
      return resolveRoute(url, routeParams);
    };
  }, [routeParams]);

  return { resolvedUrl, routeParams };
}
