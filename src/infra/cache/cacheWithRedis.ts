import { redis } from '@infra/db/redis/redisHelper';

import { ICache } from './ICache';

export class CacheWithRedis implements ICache {
	private readonly redisClient;

	constructor() {
		this.redisClient = redis;
	}

	async set(key: string, value: string): Promise<void> {
		await this.redisClient.connect();
		await this.redisClient.set(key, value);
		await this.redisClient.quit();
	}

	async get(key: string): Promise<any> {
		await this.redisClient.connect();
		const result = await this.redisClient.get(key);
		await this.redisClient.quit();
		return result;
	}
}
