import { ICache } from '@infra/cache/ICache';

export class CacheDummy implements ICache {
	async set(key: string, value: string): Promise<void> {
		return;
	}
	async get(key: string): Promise<any> {
		return;
	}
	async del(key: string): Promise<void> {
		return;
	}
}
