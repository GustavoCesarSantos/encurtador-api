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
	}

	getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}

	getShortUrlOwnedByOwnerId(ownerId: number): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}

	update(uuid: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
