// src/common/decorators/pagination.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

import { PaginationQueryDto } from "./pagination-query.dto";

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const pagination = plainToInstance(PaginationQueryDto, query, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(pagination);
    if (errors.length > 0) {
      throw new Error(`Invalid pagination query: ${JSON.stringify(errors)}`);
    }

    return pagination;
  },
);
