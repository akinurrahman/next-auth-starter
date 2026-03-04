export const nav = {
  create: (pathname: string) => `${pathname}/create`,
  edit: (pathname: string, id: string) => `${pathname}/${id}/edit`,
  back: (pathname: string, depth = 1) => pathname.split('/').slice(0, -depth).join('/'),
};
