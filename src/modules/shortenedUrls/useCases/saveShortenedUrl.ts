import { EventNames } from '@helpers/eventNames';
import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';
import { ShortenedUrl } from '../shortenedUrl';

export interface ISaveShortenedUrl {
	execute(url: string, code: string): Promise<void | Error>;
}

export class SaveShortenedUrl implements ISaveShortenedUrl {
	private readonly shortenedUrlRepository: IShortenedUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortenedUrlRepository: IShortenedUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortenedUrlRepository = shortenedUrlRepository;
		this.eventManager = eventManager;
	}

	async execute(url: string, code: string): Promise<void | Error> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortenedUrl',
				what: `Iniciando criação da entidade url encurtada`,
			},
		});
		const shortenedUrlOrError = ShortenedUrl.create({
			url,
			code,
		});
		if (shortenedUrlOrError instanceof Error) {
			this.eventManager.notify({
				eventName: EventNames.error,
				message: {
					where: 'SaveShortenedUrl',
					what: shortenedUrlOrError.message,
				},
			});
			return shortenedUrlOrError;
		}
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortenedUrl',
				what: `Entidade url encurtada criada com sucesso, utilizando url: ${url} e código: ${code}`,
			},
		});
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortenedUrl',
				what: `Iniciando persistencia da entidade url encurtada`,
			},
		});
		await this.shortenedUrlRepository.save(shortenedUrlOrError);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'SaveShortenedUrl',
				what: `Persistencia da entidade url encurtada concluida com sucesso`,
			},
		});
	}
}
