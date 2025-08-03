import { comparePasswords, hashPassword } from "@apartment-crm/helpers";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";

import { UsersService } from "../users/users.service";
import {
  ACCESS_TOKEN_MAX_AGE,
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_NAME,
} from "./auth.constants";
import { JwtPayload } from "./auth.types";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const candidate = await this.usersService.findByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException(
        "Пользователь с таким email уже существует!",
      );
    }
    const password = await hashPassword(dto.password);
    if (!password) {
      throw new BadRequestException("Введите другой пароль!");
    }
    const user = await this.usersService.create({ ...dto, password });
    return user;
  }

  async signIn(res: Response, dto: SignInDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException("Пользователь с таким email не найден!");
    }
    const isPasswordValid = await comparePasswords(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Неверный пароль!");
    }
    const tokens = await this.generateTokens({ sub: user.id, role: user.role });
    if (!tokens) {
      throw new InternalServerErrorException();
    }
    await this.setAuthCookies(res, tokens);
    const { password, ...rest } = user;
    return { user: rest, accessToken: tokens.accessToken };
  }

  async signOut(res: Response) {
    await this.removeAuthCookies(res);
    return { ok: true };
  }

  async refreshTokens(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies[REFRESH_TOKEN_NAME];
      if (!refreshToken) {
        throw new UnauthorizedException("Refresh token is missing");
      }

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      if (!payload) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const tokens = await this.generateTokens({
        sub: payload.sub,
        role: payload.role,
      });
      if (!tokens) {
        throw new UnauthorizedException("Failed to generate new tokens");
      }

      res.cookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      return { accessToken: tokens.accessToken };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getProfile(req: Request & { user?: JwtPayload }) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    const authUser = await this.usersService.findById(user.sub);
    return authUser;
  }

  private async generateTokens(payload: JwtPayload) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_MAX_AGE / 1000,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_MAX_AGE / 1000,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      return null;
    }
  }

  private async setAuthCookies(
    res: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    res.cookie(ACCESS_TOKEN_NAME, tokens.accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    res.cookie(REFRESH_TOKEN_NAME, tokens.refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }

  private async removeAuthCookies(res: Response) {
    res.clearCookie(ACCESS_TOKEN_NAME, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.clearCookie(REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: "strict",
    });
  }
}
