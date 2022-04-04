import { PrismaClient } from '@prisma/client';

import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { ShortUrlMapper } from '@utils/mappers/shortUrlMapper';
import { IShortUrlRepository } from '../shortUrlRepository';

export class ShortUrlRepositoryWithPrisma implements IShortUrlRepository {
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = new PrismaClient();
		this.mapper = new ShortUrlMapper();
	}

	public async save(entity: ShortUrl): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.shortUrls.create({ data });
		await this.prisma.$disconnect();
	}

	public async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		const shortUrlDB = await this.prisma.shortUrls.findUnique({
			where: { code },
		});
		await this.prisma.$disconnect();
		if (!shortUrlDB) return null;
		return this.mapper.toDomain(shortUrlDB);
	}

	public async getShortUrlOwnedByOwnerId(
		ownerId: number,
	): Promise<ShortUrl[]> {
		const shortUrlsDB = await this.prisma.shortUrls.findMany({
			where: { ownerid: ownerId },
		});
		await this.prisma.$disconnect();
		const shortUrls: ShortUrl[] = [];
		const result = shortUrlsDB.every(shortUrlDB => {
			const shortUrl = this.mapper.toDomain(shortUrlDB);
			if (!shortUrl) return false;
			shortUrls.push(shortUrl);
			return true;
		});
		if (!result) return [];
		return shortUrls;
	}

	public async update(uuid: string, data: object): Promise<void> {
		await this.prisma.shortUrls.update({
			where: { uuid },
			data: data,
		});
		await this.prisma.$disconnect();
	}

	public async delete(uuid: string): Promise<void> {
		await this.prisma.shortUrls.delete({ where: { uuid } });
	}
}
