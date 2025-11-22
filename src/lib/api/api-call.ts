import type { AxiosError, AxiosRequestConfig } from 'axios';

import { api } from './api';

interface ApiCallOptions {
  version?: keyof typeof api; // optional, defaults to v1
  contentType?: string;
  responseType?: AxiosRequestConfig['responseType'];
  headers?: Record<string, string>;
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

export async function apiCall(
  endpoint: string,
  data?: unknown,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT' = 'GET',
  options?: ApiCallOptions
) {
  try {
    const {
      version = 'v1', // default API version
      contentType = 'application/json',
      responseType = 'json',
      headers = {},
    } = options || {};

    const client = api[version]; // dynamically pick the axios instance

    const config: AxiosRequestConfig = { responseType, headers: { ...headers } };

    if (!(data instanceof FormData)) {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = contentType;
    }

    let res;

    switch (method) {
      case 'POST':
        res = await client.post(endpoint, data, config);
        break;
      case 'PATCH':
        res = await client.patch(endpoint, data, config);
        break;
      case 'PUT':
        res = await client.put(endpoint, data, config);
        break;
      case 'DELETE':
        res = await client.delete(endpoint, config);
        break;
      default:
        res = await client.get(endpoint, { ...config, params: data });
        break;
    }

    return res.data;
  } catch (err) {
    if (isAxiosError(err)) throw err;
    throw new Error('Unexpected error in apiCall');
  }
}
