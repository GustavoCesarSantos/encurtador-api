import { ShortUrl } from '@/shortUrls/shortUrl';

export interface ISaveShortUrl {
	execute(url: string, code: string): Promise<void>;
}

export class SaveShortUrl implements ISaveShortUrl {
	async execute(url: string, code: string): Promise<void> {
		const shortUrl = new ShortUrl({
			url,
			code,
		});
		return;
	}
}
