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
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Auth()
  @Post()
  create(
    @Req() req: any,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.create(userId, createNotificationDto);
  }

  @Auth()
  @Get()
  findForUser(@Req() req: any, @Pagination() pagination: PaginationQueryDto) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.findForUser(userId, pagination);
  }

  @Auth()
  @Patch()
  readForUser(@Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.readForUser(userId);
  }

  @Auth()
  @Patch(":id")
  readOneForUser(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.readOneForUser(id, userId);
  }

  @Auth()
  @Delete("")
  removeForUser(@Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.removeForUser(userId);
  }

  @Auth()
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.notificationsService.remove(id, userId);
  }
}
