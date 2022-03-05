export interface BaseRepository<T> {
	save(entity: T): Promise<void>;
	findMany(): Promise<T[]>;
	findOne(identifier: string): Promise<T | null>;
	update(): Promise<void>;
	delete(): Promise<void>;
}
