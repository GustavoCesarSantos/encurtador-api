import { IRepository } from '../IRepository';
import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { prisma } from '@infra/db/prisma/prismaClient';
import { Mapper } from '@modules/shortenedUrls/utils/mapper';

export class Repository implements IRepository {
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = prisma;
		this.mapper = new Mapper();
	}

	public async delete(id: number): Promise<void> {
		await this.prisma.shortenedUrls.delete({ where: { id } });
	}

	public async findAll(): Promise<ShortenedUrl[]> {
		const items = await this.prisma.shortenedUrls.findMany();
		return items.map(item => this.mapper.toDomain(item));
	}

	public async findById(id: number): Promise<ShortenedUrl | undefined> {
		const item = await this.prisma.shortenedUrls.findFirst({
			where: { id },
		});
		if (!item) return undefined;
		return this.mapper.toDomain(item);
	}

	public async findByCode(code: string): Promise<ShortenedUrl | undefined> {
		const item = await this.prisma.shortenedUrls.findFirst({
			where: { code },
		});
		if (!item) return undefined;
		return this.mapper.toDomain(item);
	}

	public async findByOwnerId(ownerId: number): Promise<ShortenedUrl[]> {
		const items = await this.prisma.shortenedUrls.findMany({
			where: { ownerId },
		});
		return items.map(item => this.mapper.toDomain(item));
	}

	public async incrementAccess(code: string): Promise<void> {
		await this.prisma.shortenedUrls.update({
			where: { code },
			data: { accessCounter: { increment: 1 } },
		});
	}

	public async save(entity: ShortenedUrl): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.shortenedUrls.create({ data });
	}

	public async update(id: number, entity: ShortenedUrl): Promise<void> {
		const data = this.mapper.toUpdate(entity);
		await this.prisma.shortenedUrls.update({
			where: { id },
			data,
		});
	}
}
