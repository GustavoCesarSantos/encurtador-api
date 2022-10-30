import { adaptMiddleware } from '@infra/adapters/expressMiddlewareAdapter';
import { RedisClient } from '@infra/cache/redisClient';
import { RateLimit } from '@infra/middlewares/rate-limit/rateLimit';

const redisClient = new RedisClient();

export const rateLimit = adaptMiddleware(new RateLimit(redisClient));
