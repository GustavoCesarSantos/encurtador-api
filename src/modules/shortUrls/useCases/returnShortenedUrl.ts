export interface IReturnShortenedUrl {
	execute(code: string): string;
}

export class ReturnShortenedUrl implements IReturnShortenedUrl {
	execute(code: string): string {
		return `${process.env.DOMAIN_URL}/${code}`;
	}
}
