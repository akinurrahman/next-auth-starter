import { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (
  error: unknown,
  fallback: string = 'Something went wrong'
): string => {
  if (error instanceof AxiosError) {
    // Handle Axios errors
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return fallback;
};

export const getErrorDetails = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.status || error.status,
      message: error.response?.data?.message || error.message || 'Request failed',
      error: error.response?.data?.error || error.code || 'UNKNOWN_ERROR',
      data: error.response?.data,
      config: error.config,
    };
  }

  if (error instanceof Error) {
    return {
      status: null,
      message: error.message,
      error: error.name,
      data: null,
      config: null,
    };
  }

  return {
    status: null,
    message: 'Unknown error occurred',
    error: 'UNKNOWN_ERROR',
    data: null,
    config: null,
  };
};

export const getInitials = (fullName: string | undefined) => {
  if (!fullName) return 'N/A';
  return fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const buildQuery = (
  params: Record<string, string | number | boolean | null | undefined>
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

export function getParam(param: string | string[] | undefined) {
  return Array.isArray(param) ? param[0] : param;
}

export const formatDate = (date?: string | number | Date, dateFormat?: string) => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return '-';
  }
  return dateFormat ? format(parsedDate, dateFormat) : format(parsedDate, 'dd MMM yyyy, hh:mm a');
};
