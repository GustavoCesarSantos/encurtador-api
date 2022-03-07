export interface BaseRepository<T> {
	save(entity: T): Promise<void>;
	findMany(): Promise<T[]>;
	findOne(identifier: string): Promise<T | null>;
	update(uuid: string, data: object): Promise<void>;
	delete(uuid: string): Promise<void>;
}
