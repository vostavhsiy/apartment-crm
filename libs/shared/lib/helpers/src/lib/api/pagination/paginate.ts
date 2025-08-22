// src/common/utils/paginate-prisma.ts
import { PaginatedResult } from "./paginated-result.interface";
import { PaginationQueryDto, SortOrder } from "./pagination-query.dto";

type PrismaModelDelegate<T> = {
  findMany: Function;
  count: Function;
};

export async function paginate<T, F = object>(
  model: PrismaModelDelegate<T>,
  pagination: PaginationQueryDto,
  findManyArgs: F = {} as F,
): Promise<PaginatedResult<T>> {
  const limit = pagination.limit;
  const offset = pagination.offset;
  const currentPage = pagination.page ?? 1;

  const [data, total] = await Promise.all([
    model.findMany({
      ...findManyArgs,
      skip: offset,
      take: limit,
      orderBy: {
        ...(findManyArgs as any)?.orderBy,
        createdAt:
          pagination.sortOrder === SortOrder.CREATED_AT ? "asc" : undefined,
        updatedAt:
          pagination.sortOrder === SortOrder.UPDATED_AT ? "asc" : undefined,
      },
    }),
    model.count({ where: (findManyArgs as any)?.where || {} }),
  ]);

  const totalPages = Math.ceil(total / limit);
  const hasMore = currentPage < totalPages;

  return {
    data,
    currentPage,
    totalPages,
    perPage: limit,
    hasMore,
  };
}
