import { io, Socket } from "socket.io-client";

import { ROUTES } from "./routes";

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = io(ROUTES.ws, {
        transports: ["websocket"],
      });

      this.socket.on("connect", () => {
        console.log("Connected to WebSocket.");
        resolve();
      });

      this.socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });
    });
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    this.socket?.on(event, callback);
  }

  public off(event: string, callback?: (...args: any[]) => void): void {
    this.socket?.off(event, callback);
  }

  public emit(event: string, data?: any): void {
    this.socket?.emit(event, data);
  }
}

export const socketService = SocketService.getInstance();
