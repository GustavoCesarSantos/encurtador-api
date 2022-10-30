export interface ICache {
	connect(): Promise<void>;
	set(key: string, value: string): Promise<void>;
	get(key: string): Promise<any>;
}
