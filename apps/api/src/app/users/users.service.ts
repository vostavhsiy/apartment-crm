import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { DbService } from "../db/db.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersIncludeConfig } from "./users.config";

@Injectable()
export class UsersService {
  constructor(private dbService: DbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.dbService.user.create({
        data: createUserDto,
        include: UsersIncludeConfig,
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

  async findAll() {
    return `This action returns all users`;
  }

  async findById(id: string) {
    try {
      const user = await this.dbService.user.findUnique({
        where: { id },
        include: UsersIncludeConfig,
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
        include: UsersIncludeConfig,
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
