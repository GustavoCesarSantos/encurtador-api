import { createClient, RedisClientType } from 'redis';

import { ICache } from './ICache';

export class RedisClient implements ICache {
	private readonly redisClient: RedisClientType;

	constructor() {
		this.redisClient = createClient();
	}

	async connect() {
		await this.redisClient.connect();
	}

	async set(key: string, value: string): Promise<void> {
		await this.redisClient.set(key, value);
	}

	async get(key: string): Promise<any> {
		return await this.redisClient.get(key);
	}
}
