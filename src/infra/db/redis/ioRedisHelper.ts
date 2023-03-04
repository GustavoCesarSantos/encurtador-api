import { variables } from '@helpers/envs';
import IORedis from 'ioredis';

export const ioRedis = new IORedis(variables.redisUrl);
