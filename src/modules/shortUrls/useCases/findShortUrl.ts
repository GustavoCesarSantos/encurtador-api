import { EventNames } from '@helpers/eventNames';
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
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'FindShortUrl',
				what: `Iniciando busca na base de dados pela url encurtada, utilizando o código: ${code}`,
			},
		});
		const shortUrl = await this.shortUrlRepository.getShortUrlByCode(code);
		if (!shortUrl || !(shortUrl instanceof ShortUrl)) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'FindShortUrl',
					what: `Url encurtada não encontrada, utilizando o código: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'FindShortUrl',
				what: `Url encurtada encontrada: ${shortUrl}, utilizando o código: ${code}`,
			},
		});
		return shortUrl;
	}
}
