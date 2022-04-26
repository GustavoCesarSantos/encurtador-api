import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { ShortUrl } from '../shortUrl';

export interface IFindShortUrl {
	execute(code: string): Promise<ShortUrl | null>;
}

export class FindShortUrl implements IFindShortUrl {
	private readonly shortUrlRepository: IShortUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortUrlRepository: IShortUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortUrlRepository = shortUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(code: string): Promise<ShortUrl | null> {
		const shortUrl = await this.shortUrlRepository.getShortUrlByCode(code);
		if (!shortUrl || !(shortUrl instanceof ShortUrl)) return null;
		return shortUrl;
	}
}
