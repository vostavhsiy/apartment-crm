import { Transform } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export enum SortOrder {
  ALPHABET,
  CREATED_AT,
  UPDATED_AT,
}

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
