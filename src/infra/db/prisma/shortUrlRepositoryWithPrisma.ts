import { ShortUrl } from '@modules/shortUrls/shortUrl';
import { ShortUrlMapper } from '@utils/mappers/shortUrlMapper';
import { IShortUrlRepository } from '../shortUrlRepository';
import { prisma } from './prismaHelper';

export class ShortUrlRepositoryWithPrisma implements IShortUrlRepository {
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = prisma;
		this.mapper = new ShortUrlMapper();
	}

	public async save(entity: ShortUrl): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.shortUrls.create({ data });
	}

	public async getShortUrlByCode(code: string): Promise<ShortUrl | null> {
		const shortUrlDB = await this.prisma.shortUrls.findUnique({
			where: { code },
		});
		if (!shortUrlDB) return null;
		return this.mapper.toDomain(shortUrlDB);
	}

	public async getShortUrlOwnedByOwnerId(
		ownerId: number,
	): Promise<ShortUrl[]> {
		const shortUrlsDB: {
			uuid: string;
			url: string;
			code: string;
			hits: number | null;
			createdat: Date;
			ownerid: number;
		}[] = await this.prisma.shortUrls.findMany({
			where: { ownerid: ownerId },
		});
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
	}

	public async delete(uuid: string): Promise<void> {
		await this.prisma.shortUrls.delete({ where: { uuid } });
	}
}
