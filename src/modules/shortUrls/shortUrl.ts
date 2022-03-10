import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

type ShortUrlConstructor = {
	uuid?: string;
	url: string;
	code: string;
	hits?: number;
	ownerid?: number;
};

export class ShortUrl {
	private readonly uuid: string;
	private readonly rootUrl: string;
	private readonly code: string;
	private readonly hits: number;
	private readonly ownerid: number;
	private createdat!: Date;

	constructor(props: ShortUrlConstructor) {
		this.uuid = props.uuid ?? randomUUID();
		this.rootUrl = props.url;
		this.code = props.code;
		this.hits = props.hits ?? 0;
		this.ownerid = props.ownerid ?? 0;
	}

	setCreatedDate() {
		this.createdat = new Date();
	}

	// public returnShortUrl(code: string): string {
	// 	return `${process.env.DOMAIN_URL}/${code}`;
	// }
}
