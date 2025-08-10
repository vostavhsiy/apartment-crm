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

import { Auth } from "../auth/decorators/auth.decorator";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { ToggleApartmentDto } from "./dto/toggle-apartment.dto";
import { ToggleCollectionDto } from "./dto/toggle-collection.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Auth()
  @Post()
  create(@Req() req: any, @Body() createClientDto: CreateClientDto) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.create(userId, createClientDto);
  }

  @Auth()
  @Get()
  findForUser(@Req() req: any, @Pagination() pagination: PaginationQueryDto) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.findForUser(userId, pagination);
  }

  @Auth()
  @Get(":id")
  findOne(@Req() req: any, @Param("id") id: string) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.findOne(id, userId);
  }

  @Auth()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Req() req: any,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.update(id, userId, updateClientDto);
  }

  @Auth()
  @Patch(":id/toggle-collection")
  toggleCollectionToClient(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: ToggleCollectionDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.toggleCollectionToClient(
      id,
      dto.collectionId,
      userId,
      dto.connect,
    );
  }

  @Auth()
  @Patch(":id/toggle-apartment")
  toggleApartmentToClient(
    @Req() req: any,
    @Param("id") id: string,
    @Body() dto: ToggleApartmentDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.toggleApartmentToClient(
      id,
      dto.apartmentId,
      userId,
      dto.connect,
    );
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.clientsService.remove(id, userId);
  }
}
