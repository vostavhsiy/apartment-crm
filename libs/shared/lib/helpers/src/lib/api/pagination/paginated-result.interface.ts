export interface PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  perPage: number;
  hasMore: boolean;
}
