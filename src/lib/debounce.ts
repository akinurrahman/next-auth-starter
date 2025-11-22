import { debounce } from 'lodash';

/**
 * Creates a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - Additional options for lodash debounce
 * @returns A debounced function
 */
export const createDebouncedFunction = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number = 500,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
  }
): ((...args: Parameters<T>) => void) => {
  return debounce(func, wait, options);
};

/**
 * Pre-configured debounced functions for common use cases
 */

// Debounced search input (e.g., onChange in input fields)
export const debouncedSearch = createDebouncedFunction(
  (callback: (value: string) => void, value: string): void => callback(value),
  500
);

// Debounced API call with generic arguments
export const debouncedApiCall = createDebouncedFunction(
  <Args extends unknown[]>(callback: (...args: Args) => void, ...args: Args): void =>
    callback(...args),
  300
);

// Debounced resize event handler
export const debouncedResize = createDebouncedFunction(
  (callback: () => void): void => callback(),
  250
);

// Debounced scroll event handler
export const debouncedScroll = createDebouncedFunction(
  (callback: () => void): void => callback(),
  100
);
