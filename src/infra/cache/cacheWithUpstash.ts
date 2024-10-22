import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

import { ICache } from './ICache';
import { redis } from '@infra/db/redis/upstashClient';

export class CacheWithUpstash implements ICache {
	private readonly redisClient;
	private readonly logger = PinoLogger.create();

	constructor() {
		this.redisClient = redis;
	}

	async set(key: string, value: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithUpstash.set',
			what: `Iniciando criação de chave em cache de longa duração. Key:${key}, Value: ${value}`,
		});
		await this.redisClient.set(key, value);
		this.logger.info({
			where: 'CacheWithUpstash.set',
			what: `Chave de longa duração criada com sucesso. Key:${key}, Value: ${value}`,
		});
	}

	async setWithExpiration(
		key: string,
		value: string,
		expireTime: number,
	): Promise<void> {
		this.logger.info({
			where: 'CacheWithUpstash.setWithExpiration',
			what: `Iniciando criação de chave em cache de curta duração. Key:${key}, Value: ${value}`,
		});
		await this.redisClient.set(key, value, { ex: expireTime });
		this.logger.info({
			where: 'CacheWithUpstash.setWithExpiration',
			what: `Chave de curta duração criada com sucesso. Key:${key}, Value: ${value}`,
		});
	}

	async get(key: string): Promise<string | null> {
		this.logger.info({
			where: 'CacheWithUpstash.get',
			what: `Iniciando busca de chave em cache. Key:${key}`,
		});
		const result = await this.redisClient.get<string | null>(key);
		this.logger.info({
			where: 'CacheWithUpstash.get',
			what: `Busca de chave em cache feita com sucesso. Key:${key}`,
		});
		this.logger.info({
			where: 'CacheWithUpstash.get',
			what: `Retornando valor: ${result}`,
		});
		return result;
	}

	async del(key: string): Promise<void> {
		this.logger.info({
			where: 'CacheWithUpstash.del',
			what: `Deletando chave em cache. Key:${key}`,
		});
		await this.redisClient.del(key);
		this.logger.info({
			where: 'CacheWithUpstash.del',
			what: `Deleção da chave em cache feita com sucesso. Key:${key}`,
		});
	}
}
