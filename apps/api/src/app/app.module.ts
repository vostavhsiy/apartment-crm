import { createKeyv } from "@keyv/redis"
import { CacheModule } from "@nestjs/cache-manager"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { CacheableMemory } from "cacheable"
import { Keyv } from "keyv"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DbModule } from "./db/db.module"
import { WebsocketsModule } from './websockets/websockets.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        '.env'
      ]
    }),
    CacheModule.registerAsync({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: "7d", lruSize: 5000 }),
            }),
            createKeyv(
              `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
            ),
          ],
        };
      },
    }),
    JwtModule.register({
      global: true,
    }),
    DbModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
