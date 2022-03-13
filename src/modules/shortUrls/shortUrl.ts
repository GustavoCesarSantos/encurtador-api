import { randomUUID } from 'crypto';
import * as dotenv from 'dotenv';
import { MissingParams } from '../../helpers/errors/missingParams';
import { Guard } from '../../utils/guard';

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

	private constructor(props: ShortUrlConstructor) {
		this.uuid = props.uuid ?? randomUUID();
		this.rootUrl = props.url;
		this.code = props.code;
		this.hits = props.hits ?? 0;
		this.ownerid = props.ownerid ?? 0;
	}

	static create(props: ShortUrlConstructor) {
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'root url', value: props.url },
			{ propName: 'code', value: props.code },
		]);
		if (!result.isSuccess) return new MissingParams(`${result.isError}`);
		return new ShortUrl(props);
	}

	setCreatedDate() {
		this.createdat = new Date();
	}
}
