import { createKeyv } from "@keyv/redis";
import { CacheModule as RedisModule } from "@nestjs/cache-manager";
import { Global, Module } from "@nestjs/common";
import { CacheableMemory } from "cacheable";
import { Keyv } from "keyv";

const redisModule = RedisModule.registerAsync({
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
});

@Global()
@Module({
  imports: [redisModule],
  exports: [redisModule],
})
export class CacheModule {}
