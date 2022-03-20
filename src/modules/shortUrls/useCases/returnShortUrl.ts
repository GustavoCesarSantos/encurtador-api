export interface IReturnShortUrl {
	execute(code: string): string;
}

export class ReturnShortUrl implements IReturnShortUrl {
	execute(code: string): string {
		return `${process.env.DOMAIN_URL}/${code}`;
	}
}
