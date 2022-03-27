export interface BaseRepository<T> {
	save(entity: T): Promise<void>;
	update(uuid: string, data: object): Promise<void>;
	delete(uuid: string): Promise<void>;
}
