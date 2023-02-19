import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';
import { IShortenedUrlRepository } from '../shortenedUrlRepository';

export class ShortenedUrlRepositoryWithMemory
	implements IShortenedUrlRepository
{
	shortenedUrls: ShortenedUrl[] = [];

	async save(entity: ShortenedUrl): Promise<void> {
		this.shortenedUrls.push(entity);
	}

	async getShortenedUrlByCode(code: string): Promise<ShortenedUrl | null> {
		if (code === 'success') {
			const shortenedUrl = ShortenedUrl.create({
				url: 'teste',
				code: code,
			});
			if (shortenedUrl instanceof Error) return null;
			return shortenedUrl;
		}
		if (code === 'fail') return null;
		const result = this.shortenedUrls.find(
			shortenedUrl => shortenedUrl.getCode() === code,
		);
		if (!result) return null;
		return result;
	}

	getShortenedUrlOwnedByOwnerId(ownerId: number): Promise<ShortenedUrl[]> {
		throw new Error('Method not implemented.');
	}

	update(identifier: string, data: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
