import { redis } from '@infra/db/redis/redisHelper';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

import { ICache } from './ICache';

export class CacheWithRedis implements ICache {
	private readonly redisClient;
	private readonly logger = PinoLogger.create();

	constructor() {
		this.redisClient = redis;
	}

	async set(key: string, value: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Iniciando criação de chave em cache. Key:${key}, Value: ${value}`,
		});
		await this.redisClient.connect();
		await this.redisClient.set(key, value);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Chave criada com sucesso. Key:${key}, Value: ${value}`,
		});
	}

	async get(key: string): Promise<any> {
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Iniciando busca de chave em cache. Key:${key}`,
		});
		await this.redisClient.connect();
		const result = await this.redisClient.get(key);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Busca de chave em cache feita com sucesso. Key:${key}`,
		});
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Retornando valor: ${result}`,
		});
		return result;
	}

	async del(key: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Deletando chave em cache. Key:${key}`,
		});
		await this.redisClient.connect();
		await this.redisClient.del(key);
		await this.redisClient.quit();
		this.logger.info({
			where: 'CacheWithRedis',
			what: `Deleção da chave em cache feita com sucesso. Key:${key}`,
		});
	}
}
