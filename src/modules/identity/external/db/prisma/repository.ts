import { IRepository } from '../IRepository';
import { prisma } from '@infra/db/prisma/prismaClient';
import { User } from '@modules/identity/domain/user';
import { Mapper } from '@modules/identity/utils/mapper';

export class Repository implements IRepository {
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = prisma;
		this.mapper = new Mapper();
	}

	public async delete(id: number): Promise<void> {
		await this.prisma.users.delete({ where: { id } });
	}

	public async findAll(): Promise<User[]> {
		const items = await this.prisma.users.findMany();
		return items.map(item => this.mapper.toDomain(item));
	}

	public async findById(id: number): Promise<User | undefined> {
		const item = await this.prisma.users.findFirst({
			where: { id },
		});
		if (!item) return undefined;
		return this.mapper.toDomain(item);
	}

	public async save(entity: User): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.users.create({ data });
	}

	public async update(id: number, entity: User): Promise<void> {
		const data = this.mapper.toUpdate(entity);
		await this.prisma.users.update({
			where: { id },
			data,
		});
	}
}
