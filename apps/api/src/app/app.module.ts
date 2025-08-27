import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";

import { AiModule } from "./ai/ai.module";
import { ApartmentsModule } from "./apartments/apartments.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CacheModule } from "./cache/cache.module";
import { ClientsModule } from "./clients/clients.module";
import { CollectionsModule } from "./collections/collections.module";
import { DbModule } from "./db/db.module";
import { FilesModule } from "./files/files.module";
import { MailModule } from "./mail/mail.module";
import { NotificationsModule } from "./notifications/notifications.module";
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
    ApartmentsModule,
    FilesModule,
    ClientsModule,
    CollectionsModule,
    NotificationsModule,
    AiModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
