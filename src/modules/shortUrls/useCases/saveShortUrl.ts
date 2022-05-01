import { EventNames } from '@helpers/eventNames';
import { IShortUrlRepository } from '@infra/db/shortUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { ShortUrl } from '../shortUrl';

export interface ISaveShortUrl {
	execute(url: string, code: string): Promise<void | Error>;
}

export class SaveShortUrl implements ISaveShortUrl {
	private readonly shortUrlRepository: IShortUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortUrlRepository: IShortUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortUrlRepository = shortUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(url: string, code: string): Promise<void | Error> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortUrl',
				what: `Iniciando criação da entidade url encurtada`,
			},
		});
		const shortUrlOrError = ShortUrl.create({
			url,
			code,
		});
		if (shortUrlOrError instanceof Error) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'SaveShortUrl',
					what: shortUrlOrError.message,
				},
			});
			return shortUrlOrError;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortUrl',
				what: `Entidade url encurtada criada com sucesso, utilizando url: ${url} e código: ${code}`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortUrl',
				what: `Iniciando persistencia da entidade url encurtada`,
			},
		});
		await this.shortUrlRepository.save(shortUrlOrError);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortUrl',
				what: `Persistencia da entidade url encurtada concluida com sucesso`,
			},
		});
	}
}
