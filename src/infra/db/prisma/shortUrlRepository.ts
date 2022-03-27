import { PrismaClient } from '@prisma/client';

import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { BaseRepository } from '../baseRepository';
import { ShortUrlMapper } from '@utils/mappers/shortUrlMapper';

export interface ISShortUrlRepository extends BaseRepository<ShortUrl> {
	getShortUrlByCode(code: string): Promise<ShortUrl | null>;
}

export class ShortUrlRepository implements ISShortUrlRepository {
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

	findMany(): Promise<ShortUrl[]> {
		throw new Error('Method not implemented.');
	}

	findOne(identifier: string): Promise<ShortUrl | null> {
		throw new Error('Method not implemented.');
	}

	update(identifier: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
