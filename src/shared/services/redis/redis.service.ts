import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { RuntimeSessionException } from '@shared/filters/runtime-session-exception.filter';
import { RabbitmqService } from '@shared/services/rabbitmq/rabbitmq.service';
import { Channel } from 'amqplib';

type MapperList = {
  redisCacheApiName?: Object;
}

type Tokens = {
  token: string;
}

@Injectable()
export class RedisService {
  instance: Redis;
  tokensInstance: Redis;

  constructor(
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  async onModuleInit() {
    await this.createConnection();
  }

  async createConnection() {
    const { host, port, instances } = this.configService.get('redis');

    this.instance = new Redis({ host, port, });

    this.tokensInstance = new Redis({
      host,
      port,
      keyPrefix: instances.tokensInstance.keyPrefix,
      db: instances.tokensInstance.db,
    });

    this.logger.info(`Connected to Redis Server`, { host, port, });
  }

  async getTokenCacheSync(redisKey: string) {
    return this.tokensInstance.get(redisKey);
  }

  async setTokenCacheSync(redisKey: string, value: Tokens) {
    const { instances } = this.configService.get('redis');

    await this.tokensInstance.set(
      redisKey,
      JSON.stringify(value),
      'EX', instances.tokensInstance.expireSeconds,
    );
  }

  async validateCacheSync(redisKey: string) {
    const isErrorHandle = (result) => {
      return result.api_processing_result === false;
    }

    const result = await this.getCacheSync(redisKey);
    if (result) {
      if (isErrorHandle(result)) {
        throw new Error(`Redis cache api module runtimes error`);
      }

      return result;
    }

    throw new Error(`Redis cache api module runtimes error`);
  }

  async getCacheSync(redisKey: string): Promise<MapperList> {
    const result = JSON.parse(await this.instance.get(redisKey));
    if (result) {
      return typeof result === 'object' ? result : {};
    }

    return result;
  }

  async waitForApiRequestCache(redisKey: string, runtimeSessionId: string, message: any): Promise<{
    redisCache: any,
  }> {
    return new Promise(async (resolve, reject) => {
      const { requestTimeoutSecond } = this.configService.get('application');
      const { rmqQueueCache } = this.configService.get('rmq');

      let channel: Channel;

      const setTimeoutId = setTimeout(async () => {
        return reject(
          new RuntimeSessionException(`Request timeout`, { runtimeSessionId })
        );
      }, 1000 * requestTimeoutSecond);

      channel = await this.rabbitmqService.createChannel();

      if (!await this.instance.get(redisKey)) {
        await this.rabbitmqService.sendToQueue(rmqQueueCache, message, channel);
      }

      const { redisCacheApiName } = await this.waitForRedisCacheApiName(redisKey);
      const results = {};

      for await (const apiName of Object.keys(redisCacheApiName)) {
        const serviceRedisKeyName = redisCacheApiName[apiName].keyName;
        try {
          results[apiName] = await this.validateCacheSync(serviceRedisKeyName);
        } catch (error) {
          this.logger.debug(`Redis cache api module runtimes error`, {
            serviceRedisKeyName,
            runtimeSessionId,
          });

          results[apiName] = {
            api_processing_result: false,
          };
        }
      }

      // update cache data
      channel = await this.rabbitmqService.createChannel();
      await this.rabbitmqService.sendToQueue(rmqQueueCache, message, channel);

      if (channel) {
        await this.rabbitmqService.closeChannel(channel);
      }

      clearTimeout(setTimeoutId);

      const redisCache = this.extractMessage(results);

      return resolve( { redisCache, });
    });
  }

  async waitForRedisCacheApiName(redisKey: string): Promise<MapperList> {
    let result = null;

    do {
      result = await this.getCacheSync(redisKey);
    } while(!result);

    return result;
  }

  private extractMessage(cacheData: any) {
    return Object.keys(cacheData).reduce((collection, key) => {
      collection[key] = cacheData[key].message || cacheData[key];
      return collection;
    }, {});
  }
}
