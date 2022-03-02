import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type ShortUrlSchema = {
	id: string;
	url: string;
	code: string;
	hits: number;
};

type ShortUrlConstructor = {
	uuid?: string;
	url: string;
	code: string;
	hits?: number;
	ownerid?: number;
};

export class ShortUrl {
	private readonly uuid: string;
	private readonly url: string;
	private readonly code: string;
	private readonly hits: number;
	private readonly ownerid: number;
	private createdat!: Date;

	private shortUrls: ShortUrlSchema[] = [
		{
			id: '1',
			url: 'teste',
			code: '12345',
			hits: 0,
		},
	];

	constructor(props: ShortUrlConstructor) {
		this.uuid = props.uuid ?? randomUUID();
		this.url = props.url;
		this.code = props.code;
		this.hits = props.hits ?? 0;
		this.ownerid = props.ownerid ?? 0;
		this.uuid = undefined ?? randomUUID();
	}

	setCreatedDate() {
		this.createdat = new Date();
	}

	public generateCode() {
		return randomUUID().slice(0, 5);
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
