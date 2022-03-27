import { randomUUID } from 'crypto';

import { MissingParams } from '@helpers/errors/missingParams';
import { Guard } from '@utils/guard';

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
		this.ownerid = props.ownerid ?? 1;
	}

	public static create(props: ShortUrlConstructor) {
		const result = Guard.againstEmptyOrUndefined([
			{ propName: 'root url', value: props.url },
			{ propName: 'code', value: props.code },
		]);
		if (!result.isSuccess) return new MissingParams(`${result.isError}`);
		return new ShortUrl(props);
	}

	public getUUID() {
		const uuid = this.uuid;
		return uuid;
	}

	public getCode(): string {
		const code = this.code;
		return code;
	}

	public getHits(): number {
		const hits = this.hits;
		return hits;
	}

	public getRootUrl(): string {
		const rootUrl = this.rootUrl;
		return rootUrl;
	}

	public getOwnerId(): number {
		const id = this.ownerid;
		return id;
	}

	public setCreatedDate(): void {
		this.createdat = new Date();
	}

	public getCreatedDate(): Date {
		const createdAt = this.createdat;
		return createdAt;
	}
}
