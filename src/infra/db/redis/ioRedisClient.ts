import Redis from 'ioredis';

import { variables } from '@shared/envs';

export const ioRedis = new Redis(variables.cacheUrl, {
	maxRetriesPerRequest: null,
});
