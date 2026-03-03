type RouteParams = Record<string, string | number | null | undefined>;

interface ResolveOptions {
  strict?: boolean;
}

export function resolveRoute(
  url: string,
  params: RouteParams = {},
  options?: ResolveOptions
): string {
  return url.replace(/:([a-zA-Z0-9_]+)/g, (_, key: string) => {
    const value = params[key];

    if (value === undefined || value === null) {
      if (options?.strict) {
        throw new Error(`Missing route param: ${key}`);
      }

      // leave param untouched in non-strict mode
      return `:${key}`;
    }

    return encodeURIComponent(String(value));
  });
}
