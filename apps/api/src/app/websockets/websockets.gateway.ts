import { WebSocketEvents } from "@apartment-crm/types";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { type Cache } from "cache-manager";
import { Server, Socket } from "socket.io";

import { WebsocketsAuthMiddleware } from "./websockets.middleware";
import { ClientSocketInfo } from "./websockets.types";

@WebSocketGateway({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"],
  },
  namespace: "ws",
})
export class WebsocketsGateway {
  @WebSocketServer() server!: Server;
  private logger: Logger = new Logger("WebSocketGateway");

  constructor(
    @Inject(CACHE_MANAGER) private redisService: Cache,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    this.logger.log("WebSocket Gateway initialized");
    const middleware = WebsocketsAuthMiddleware(this.jwtService);
    server.use(middleware);
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.auth.user?.sub;

    if (!userId) {
      client.disconnect(true);
      return;
    }

    await this.redisService.set(`user:${userId}:socket`, client.id);
    await this.redisService.set(`socket:${client.id}:info`, {
      userId,
      connectedAt: new Date().toISOString(),
    });

    this.logger.log(`Client connected: ${client.id}, User ID: ${userId}`);
  }

  async handleDisconnect(client: Socket) {
    const socketInfo = await this.redisService.get<
      ClientSocketInfo | undefined
    >(`socket:${client.id}:info`);
    if (socketInfo?.userId) {
      await this.redisService.del(`user:${socketInfo.userId}:socket`);
      await this.redisService.del(`socket:${client.id}:info`);
    }

    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async sendToUser(userId: string, event: WebSocketEvents, data: any) {
    const socketId = await this.redisService.get<string | undefined>(
      `user:${userId}:socket`,
    );

    if (socketId) {
      const socket = await this.getSocketById(socketId);
      if (socket) {
        socket.emit(event, data);
      }
    }
  }

  async sendToUsers(userIds: string[], event: WebSocketEvents, data: any) {
    for (const userId of userIds) {
      await this.sendToUser(userId, event, data);
    }
  }

  async broadcast(event: WebSocketEvents, data: any) {
    this.server.emit(event, data);
  }

  async getSocketById(socketId: string) {
    try {
      const sockets = await this.server.fetchSockets();
      return sockets.find((socket) => socket.id === socketId);
    } catch (error) {
      return null;
    }
  }
}
