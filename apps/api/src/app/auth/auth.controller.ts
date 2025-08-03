import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
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

  @Auth()
  @Get("profile")
  getProfile(@Req() req: Request) {
    return this.authService.getProfile(req);
  }
}
