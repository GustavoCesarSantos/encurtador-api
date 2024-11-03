import { IRepository } from '../IRepository';
import { prisma } from '@infra/db/prisma/prismaClient';
import { Model } from '../model';
import { BugReport } from '@modules/monitor/domain/bugReport';
import { Mapper } from '@modules/monitor/utils/mapper';

export class Repository implements IRepository {
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = prisma;
		this.mapper = new Mapper();
	}

	public async delete(id: number): Promise<void> {
		await this.prisma.bugReports.delete({ where: { id } });
	}

	public async findAll(): Promise<BugReport[]> {
		const items: Model[] = await this.prisma.bugReports.findMany();
		return items.map(item => this.mapper.toDomain(item));
	}

	public async findById(id: number): Promise<BugReport | undefined> {
		const item = await this.prisma.bugReports.findFirst({
			where: { id },
		});
		if (!item) return undefined;
		return this.mapper.toDomain(item);
	}

	public async save(entity: BugReport): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.bugReports.create({ data });
	}

	public async update(id: number, entity: BugReport): Promise<void> {
		const data = this.mapper.toUpdate(entity);
		await this.prisma.bugReports.update({
			where: { id },
			data,
		});
	}
}
