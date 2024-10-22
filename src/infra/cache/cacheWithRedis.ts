import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

import { ICache } from './ICache';
import { redis } from '@infra/db/redis/redisClient';

export class CacheWithRedis implements ICache {
	private readonly redisClient;
	private readonly logger = PinoLogger.create();

	constructor() {
		this.redisClient = redis;
	}

	async set(key: string, value: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithRedis.set',
			what: `Iniciando criação de chave em cache de longa duração. Key:${key}, Value: ${value}`,
		});
		await this.redisClient.connect();
		await this.redisClient.set(key, value);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis.set',
			what: `Chave de longa duração criada com sucesso. Key:${key}, Value: ${value}`,
		});
	}

	async setWithExpiration(
		key: string,
		value: string,
		expireTime: number,
	): Promise<void> {
		this.logger.info({
			where: 'CacheWithRedis.setWithExpiration',
			what: `Iniciando criação de chave em cache de curta duração. Key:${key}, Value: ${value}`,
		});
		await this.redisClient.connect();
		await this.redisClient.set(key, value, { EX: expireTime });
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis.setWithExpiration',
			what: `Chave de curta duração criada com sucesso. Key:${key}, Value: ${value}`,
		});
	}

	async get(key: string): Promise<string | null> {
		this.logger.info({
			where: 'CacheWithRedis.get',
			what: `Iniciando busca de chave em cache. Key:${key}`,
		});
		await this.redisClient.connect();
		const result = await this.redisClient.get(key);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis.get',
			what: `Busca de chave em cache feita com sucesso. Key:${key}`,
		});
		this.logger.info({
			where: 'CacheWithRedis.get',
			what: `Retornando valor: ${result}`,
		});
		return result;
	}

	async del(key: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithRedis.del',
			what: `Deletando chave em cache. Key:${key}`,
		});
		await this.redisClient.connect();
		await this.redisClient.del(key);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis.del',
			what: `Deleção da chave em cache feita com sucesso. Key:${key}`,
		});
	}
}
