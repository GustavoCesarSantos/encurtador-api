import { adaptMiddleware } from '@infra/adapters/expressMiddlewareAdapter';
import { CacheWithRedis } from '@infra/cache/cacheWithRedis';
import { RateLimit } from '@infra/middlewares/rateLimit';

const redisClient = new CacheWithRedis();

export const rateLimit = adaptMiddleware(new RateLimit(redisClient));
