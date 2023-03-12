import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { ShortenedUrl } from '@modules/shortenedUrls/shortenedUrl';

export class ShortenedUrlRepositoryStub implements IShortenedUrlRepository {
	async incrementHit(code: string): Promise<void> {
		return;
	}

	async getShortenedUrlOwnedByOwnerId(
		ownerId: number,
	): Promise<ShortenedUrl[]> {
		const shortenedUrl = ShortenedUrl.create({
			url: 'teste',
			code: '12345',
		});
		if (shortenedUrl instanceof Error) return [];
		return [shortenedUrl];
	}

	async getShortenedUrlByCode(code: string): Promise<ShortenedUrl | null> {
		if (code === 'success') {
			const shortenedUrl = ShortenedUrl.create({
				url: 'teste',
				code: '12345',
			});
			if (shortenedUrl instanceof Error) return null;
			return shortenedUrl;
		}
		return null;
	}

	save(entity: ShortenedUrl): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async update(uuid: string, data: object): Promise<void> {
		return;
	}

	delete(uuid: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
