export interface ICache {
	set(key: string, value: string): Promise<void>;
	setWithExpiration(
		key: string,
		value: string,
		expireTime: number,
	): Promise<void>;
	get(key: string): Promise<string | null>;
	del(key: string): Promise<void>;
}
