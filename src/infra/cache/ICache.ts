export interface ICache {
	set(key: string, value: string): Promise<void>;
	get(key: string): Promise<any>;
}
