import { variables } from '@helpers/envs';
import Redis from 'ioredis';

export const ioRedis = new Redis(variables.redisUrl);
