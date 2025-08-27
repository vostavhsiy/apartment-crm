export interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  count: number;
  perPage: number;
  hasMore: boolean;
}
