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

	public returnShortUrl(code: string): string {
		return `${process.env.DOMAIN_URL}/${code}`;
	}
}
