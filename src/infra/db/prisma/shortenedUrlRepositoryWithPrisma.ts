import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { ShortenedUrlMapper } from '@utils/mappers/shortenedUrlMapper';
import { IShortenedUrlRepository } from '../shortenedUrlRepository';
import { prisma } from './prismaHelper';

type ShortenedUrlDB = {
	uuid: string;
	url: string;
	code: string;
	hits: number | null;
	createdat: Date;
	ownerid: number;
};

export class ShortenedUrlRepositoryWithPrisma
	implements IShortenedUrlRepository
{
	private readonly prisma;
	private readonly mapper;

	constructor() {
		this.prisma = prisma;
		this.mapper = new ShortenedUrlMapper();
	}

	public async save(entity: ShortenedUrl): Promise<void> {
		const data = this.mapper.toPersistence(entity);
		await this.prisma.shortUrls.create({ data });
	}

	public async getShortenedUrlByCode(
		code: string,
	): Promise<ShortenedUrl | null> {
		const shortenedUrlDB = await this.prisma.shortUrls.findUnique({
			where: { code },
		});
		if (!shortenedUrlDB) return null;
		return this.mapper.toDomain(shortenedUrlDB);
	}

	public async getShortenedUrlOwnedByOwnerId(
		ownerId: number,
	): Promise<ShortenedUrl[]> {
		const shortenedUrlsDB: ShortenedUrlDB[] =
			await this.prisma.shortUrls.findMany({
				where: { ownerid: ownerId },
			});
		const shortenedUrls: ShortenedUrl[] = [];
		const result = shortenedUrlsDB.every(shortenedUrlDB => {
			const shortenedUrl = this.mapper.toDomain(shortenedUrlDB);
			if (!shortenedUrl) return false;
			shortenedUrls.push(shortenedUrl);
			return true;
		});
		if (!result) return [];
		return shortenedUrls;
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
