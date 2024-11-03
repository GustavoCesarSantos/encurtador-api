export interface IMapper<Domain = any> {
	toDomain(raw: any): Domain | undefined;
	toPersistence(entity: Domain): any;
	toUpdate(entity: Domain): any;
}
