import Cookies from 'js-cookie';

export const cookieStorage = {
  getItem: (name: string): string | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value);
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};
