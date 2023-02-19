import { EventNames } from '@helpers/eventNames';
import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { ShortenedUrl } from '../shortenedUrl';

export interface IFindShortenedUrl {
	execute(code: string): Promise<ShortenedUrl | null>;
}

export class FindShortenedUrl implements IFindShortenedUrl {
	private readonly shortenedUrlRepository: IShortenedUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortenedUrlRepository: IShortenedUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortenedUrlRepository = shortenedUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(code: string): Promise<ShortenedUrl | null> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'FindShortenedUrl',
				what: `Iniciando busca na base de dados pela url encurtada, utilizando o código: ${code}`,
			},
		});
		const shortenedUrl =
			await this.shortenedUrlRepository.getShortenedUrlByCode(code);
		if (!shortenedUrl || !(shortenedUrl instanceof ShortenedUrl)) {
			this.eventManager.notify({
				eventName: EventNames.warn,
				message: {
					where: 'FindShortenedUrl',
					what: `Url encurtada não encontrada, utilizando o código: ${code}`,
				},
			});
			return null;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'FindShortenedUrl',
				what: `Url encurtada encontrada: ${shortenedUrl}, utilizando o código: ${code}`,
			},
		});
		return shortenedUrl;
	}
}
