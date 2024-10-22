export interface IBaseRepository<T> {
	findAll(): Promise<T[]>;
	findById(id: number): Promise<T | undefined>;
	save(entity: T): Promise<void>;
	update(id: number, entity: T): Promise<void>;
	delete(id: number): Promise<void>;
}
