import { Body, Controller, Delete, Param, Patch } from "@nestjs/common";

import { Auth } from "../auth/decorators/auth.decorator";
import { ToggleBanDto } from "./dto/toggle-ban.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth()
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Auth({ roles: ["ADMIN"] })
  @Patch(":id/toggle-ban")
  toggleBan(@Param("id") id: string, @Body() dto: ToggleBanDto) {
    return this.usersService.toggleBan(id, dto.isBanned);
  }

  @Auth({ roles: ["ADMIN"] })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
