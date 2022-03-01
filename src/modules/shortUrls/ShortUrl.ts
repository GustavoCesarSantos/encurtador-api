import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type ShortUrlSchema = {
	id: string;
	url: string;
	code: string;
	hits: number;
};

export class ShortUrl {
	private shortUrls: ShortUrlSchema[] = [
		{
			id: '1',
			url: 'teste',
			code: '12345',
			hits: 0,
		},
	];

	public generateCode() {
		return randomUUID().slice(0, 5);
	}

	public save(url: string): void {
		const id = randomUUID();
		const code = this.generateCode();
		const hits = 0;
		this.shortUrls.push({ id, url, code, hits });
	}

	public returnShortUrl(code: string): string {
		return `${process.env.DOMAIN_URL}/${code}`;
	}

	public findRegistry(code: string): ShortUrlSchema | null {
		const shortUrl = this.shortUrls.find(
			shortUrl => shortUrl.code === code,
		);
		if (!shortUrl) return null;
		return shortUrl;
	}

	public addHit(): void {
		this.shortUrls[0].hits++;
	}

	public updateHits(id: string, data: Pick<ShortUrlSchema, 'hits'>): void {
		const document = this.shortUrls.find(document => document.id === id);
		if (document) document.hits = data.hits;
	}
}
