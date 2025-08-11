import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DbService } from "../db/db.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserIncludeConfig } from "./users.config";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.dbService.user.create({
        data: createUserDto,
        include: UserIncludeConfig,
        omit: {
          password: true,
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при регистрации! Проверьте корректность введенных данных.`,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: { id },
        include: UserIncludeConfig,
        omit: {
          password: true,
        },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(`Пользователь не найден!`);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: { email },
        include: UserIncludeConfig,
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.dbService.user.update({
        where: { id },
        data: updateUserDto,
        include: UserIncludeConfig,
        omit: { password: true },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(
        `Ошибка при обновлении пользователя! Проверьте корректность введенных данных.`,
      );
    }
  }

  async toggleBan(userId: string, isBanned?: boolean) {
    try {
      const user = await this.dbService.user.update({
        where: { id: userId },
        data: {
          isBanned: !!isBanned,
        },
        include: UserIncludeConfig,
        omit: { password: true },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(`Ошибка при блокировке пользователя!`);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.dbService.user.delete({
        where: { id },
        omit: { password: true },
      });
      return user;
    } catch (error) {
      throw new BadRequestException(`Ошибка при удалении пользователя!`);
    }
  }
}
