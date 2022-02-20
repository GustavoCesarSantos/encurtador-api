import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type Documents = {
	id: string;
	url: string;
	code: string;
	hits: number;
};

export class ShortenedUrl {
	private documents: Documents[] = [
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
		this.documents.push({ id, url, code, hits });
	}

	public returnShortenedUrl(code: string): string {
		return `${process.env.DOMAIN_URL}/${code}`;
	}

	public returnOriginalUrl(code: string): string | null {
		const document = this.documents.find(
			document => document.code === code,
		);
		if (!document) return null;
		return document.url;
	}

	public addHit(): void {
		this.documents[0].hits++;
	}

	public updateHits(id: string, data: Pick<Documents, 'hits'>): void {
		const document = this.documents.find(document => document.id === id);
		if (document) document.hits = data.hits;
	}

	public findUrlInfos(code: string): Documents | null {
		const document = this.documents.find(
			document => document.code === code,
		);
		if (!document) return null;
		return document;
	}
}
