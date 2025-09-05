import { Pagination, PaginationQueryDto } from "@apartment-crm/helpers";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Role } from "@prisma/client";

import { Auth } from "../auth/decorators/auth.decorator";
import { ApartmentsService } from "./apartments.service";
import { CreateApartmentDto } from "./dto/create-apartment.dto";
import { ToggleToCollectionDto } from "./dto/toggle-to-collection.dto";
import { UpdateApartmentDto } from "./dto/update-apartment.dto";

@Controller("apartments")
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Auth()
  @Post()
  @UseInterceptors(FilesInterceptor("files"))
  create(
    @Req() req: any,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createApartmentDto: CreateApartmentDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.apartmentsService.create(userId, files, createApartmentDto);
  }

  @Auth()
  @Get()
  findForUser(@Req() req: any, @Pagination() pagination: PaginationQueryDto) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.apartmentsService.findForUser(userId, pagination);
  }

  @Auth()
  @Get("stats")
  findStatsForUser(@Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.apartmentsService.findStatsForUser(userId);
  }

  @Get("for-collection")
  findForCollection(
    @Query("collectionId") collectionId: string,
    @Pagination() pagination: PaginationQueryDto,
  ) {
    return this.apartmentsService.findForCollection(collectionId, pagination);
  }

  @Auth({ roles: ["PROSUBSCRIBER"] })
  @Get("ai")
  getApartmentInfoFromAi(@Query("url") url: string) {
    return this.apartmentsService.getApartmentInfoFromAi(url);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.apartmentsService.findOne(id);
  }

  @Auth()
  @Get(":id/for-client")
  findForClient(
    @Req() req: any,
    @Param("id") clientId: string,
    @Pagination() pagination: PaginationQueryDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.apartmentsService.findForClient(userId, clientId, pagination);
  }

  @Auth()
  @Patch(":id")
  update(
    @Req() req: any,
    @Param("id") id: string,
    @Body() updateApartmentDto: UpdateApartmentDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    const isAdmin = req?.user?.role === Role.ADMIN;

    return this.apartmentsService.update(
      id,
      userId,
      updateApartmentDto,
      isAdmin,
    );
  }

  @Auth()
  @Patch(":id/toggle-collection")
  toggleApartmentToCollection(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: ToggleToCollectionDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    const isAdmin = req?.user?.role === Role.ADMIN;
    return this.apartmentsService.toggleApartmentToCollection(
      id,
      dto.collectionId,
      userId,
      dto.connect,
      dto.order,
      isAdmin,
    );
  }

  @Auth()
  @Delete(":id")
  remove(@Req() req: any, @Param("id") id: string) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    const isAdmin = req?.user?.role === Role.ADMIN;
    return this.apartmentsService.remove(id, userId, isAdmin);
  }
}
