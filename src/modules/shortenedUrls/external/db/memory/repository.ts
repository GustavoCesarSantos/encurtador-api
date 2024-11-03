import { ShortenedUrl } from '@modules/shortenedUrls/domain/shortenedUrl';
import { IRepository } from '../IRepository';

export class Repository implements IRepository {
	shortenedUrls: ShortenedUrl[] = [];

	public async delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public async findAll(): Promise<ShortenedUrl[]> {
		return this.shortenedUrls;
	}

	public async findById(id: number): Promise<ShortenedUrl | undefined> {
		return this.shortenedUrls.find(item => item.getId() === id);
	}

	async findByCode(code: string): Promise<ShortenedUrl | undefined> {
		return this.shortenedUrls.find(
			shortenedUrl => shortenedUrl.getCode() === code,
		);
	}

	public async findAllByOwnerId(ownerId: number): Promise<ShortenedUrl[]> {
		return this.shortenedUrls.filter(
			shortenedUrl => shortenedUrl.getOwnerId() === ownerId,
		);
	}

	public async incrementAccess(code: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public async save(entity: ShortenedUrl): Promise<void> {
		this.shortenedUrls.push(entity);
	}

	public async update(id: number, entity: ShortenedUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
