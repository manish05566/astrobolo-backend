export type PaginatedResult<T> = {
  rows: Array<T>;
  count: number;
  limit: number;
  page: number;
};
