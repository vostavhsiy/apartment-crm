import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { type Request, type Response } from "express";

import { AuthService } from "./auth.service";
import { Auth } from "./decorators/auth.decorator";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post("sign-in")
  signIn(@Res({ passthrough: true }) res: Response, @Body() dto: SignInDto) {
    return this.authService.signIn(res, dto);
  }

  @Post("sign-out")
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }

  @Get("refresh")
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshTokens(req, res);
  }

  @Get("activate/:token")
  async activate(@Res() res: Response, @Param("token") token: string) {
    const result = await this.authService.activateAccount(token);
    if (result.ok) {
      return res.redirect(
        `${process.env.CLIENT_URL}/dashboard/activation/success`,
      );
    } else {
      return res.redirect(
        `${process.env.CLIENT_URL}/dashboard/activation/failure`,
      );
    }
  }

  @Auth({ checkActivation: false })
  @Post("activation-mail")
  sendActivationmail(@Req() req: any) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException();
    return this.authService.generateActivationToken(userId);
  }

  @Auth({ checkActivation: false })
  @Get("profile")
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }
}
