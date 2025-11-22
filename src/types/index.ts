export type BaseApiResponse<T> = {
  message: string;
  data: T;
  pagination?: Pagination;
  status: string;
};

export type BaseEntity = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type FilterProps = {
  page?: string;
  limit?: string;
  search?: string;
};
