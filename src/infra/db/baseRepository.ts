export interface BaseRepository<T> {
	save(entity: T): Promise<void>;
	findMany(): Promise<T[]>;
	findOne(): Promise<T>;
	update(): Promise<void>;
	delete(): Promise<void>;
}
