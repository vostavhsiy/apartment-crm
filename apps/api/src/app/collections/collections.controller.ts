import { Pagination, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { Role } from "@prisma/client";

import { Auth } from "../auth/decorators/auth.decorator";
import { CollectionsService } from "./collections.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Controller("collections")
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Auth()
  @Get()
  findForUser(@Req() req: any, @Pagination() pagination: PaginationQueryDto) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.collectionsService.findForUser(userId, pagination);
  }

  @Get(":id")
  findOne(@Param(":id") id: string) {
    return this.collectionsService.findOne(id);
  }

  @Auth()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Req() req: any,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    const isAdmin = req?.user?.role === Role.ADMIN;
    return this.collectionsService.update(
      id,
      userId,
      updateCollectionDto,
      isAdmin,
    );
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    const isAdmin = req?.user?.role === Role.ADMIN;
    return this.collectionsService.remove(id, userId, isAdmin);
  }
}
