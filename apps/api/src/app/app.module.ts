import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { DbModule } from "./db/db.module";
import { MailModule } from "./mail/mail.module";
import { S3Module } from "./s3/s3.module";
import { UsersModule } from "./users/users.module";
import { WebsocketsModule } from "./websockets/websockets.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        ".env.local",
        ".env",
      ],
    }),
    CacheModule,
    JwtModule.register({
      global: true,
    }),
    DbModule,
    WebsocketsModule,
    AuthModule,
    UsersModule,
    S3Module,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
