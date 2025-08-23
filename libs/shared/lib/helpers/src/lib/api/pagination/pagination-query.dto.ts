import { SortOrder } from '@apartment-crm/types';
import { Transform } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsPositive()
  perPage?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sortOrder?: SortOrder;

  get offset(): number {
    const page = this.page ?? 1;
    const perPage = this.perPage ?? 10;
    return (page - 1) * perPage;
  }

  get limit(): number {
    return this.perPage ?? 10;
  }
}
