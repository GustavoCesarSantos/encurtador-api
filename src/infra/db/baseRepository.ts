export interface BaseRepository<T> {
	save(entity: T): Promise<void>;
	findMany(): Promise<T[]>;
	findOne(identifier: string): Promise<T | null>;
	update(identifier: string, data: any): Promise<void>;
	delete(uuid: string): Promise<void>;
}
