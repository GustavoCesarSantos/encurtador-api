export interface Mapper<T = any> {
	toDomain(raw: any): T | null;
	toPersistence(entity: T): any;
}
