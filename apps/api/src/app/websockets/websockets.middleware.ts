import { ACCESS_TOKEN_NAME } from "@apartment-crm/constants";
import { parseCookieHeader } from "@apartment-crm/helpers";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

import { jwtConstants } from "../auth/auth.constants";

export const WebsocketsAuthMiddleware = (jwtService: JwtService) => {
  return async (socket: Socket, next: (err?: Error) => void) => {
    try {
      const token = parseCookieHeader(socket.handshake.headers.cookie)?.[
        ACCESS_TOKEN_NAME
      ];

      if (!token) {
        throw new Error("Authentication error: No token provided");
      }

      const payload = jwtService.verify(token, {
        secret: jwtConstants.accessSecret,
      });

      socket.handshake.auth.user = payload;
      next();
    } catch (error) {
      next(new UnauthorizedException("Authentication error: Invalid token"));
    }
  };
};
