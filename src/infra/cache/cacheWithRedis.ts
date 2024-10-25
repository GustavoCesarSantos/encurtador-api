import { ICache } from './ICache';
import { redis } from '@infra/db/redis/redisClient';

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

	async setWithExpiration(
		key: string,
		value: string,
		expireTime: number,
	): Promise<void> {
		await this.redisClient.connect();
		await this.redisClient.set(key, value, { EX: expireTime });
		await this.redisClient.quit();
	}

	async get(key: string): Promise<string | null> {
		await this.redisClient.connect();
		const result = await this.redisClient.get(key);
		await this.redisClient.quit();
		return result;
	}

	async del(key: string): Promise<void> {
		await this.redisClient.connect();
		await this.redisClient.del(key);
		await this.redisClient.quit();
	}
}
