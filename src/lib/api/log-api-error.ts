// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logApiError(error: any) {
  if (typeof window === 'undefined') return;

  try {
    const { config, data, headers, status } = error.response || {};
    const debugKey = `api-debug-error:${config?.url || 'unknown'}:${Date.now()}`;

    localStorage.setItem(
      debugKey,
      JSON.stringify({
        url: config?.url,
        method: config?.method,
        status,
        data,
        headers,
        timestamp: Date.now(),
      })
    );
  } catch {
    /* ignore */
  }
}
