import { EventNames } from '@helpers/eventNames';
import { IShortenedUrlRepository } from '@infra/db/shortenedUrlRepository';
import { IEventManager } from '@infra/listeners/eventManager';

export interface IIncrementHit {
	execute(uuid: string): Promise<void>;
}

export class IncrementHit implements IIncrementHit {
	private readonly shortenedUrlRepository: IShortenedUrlRepository;
	private readonly eventManager: IEventManager;

	constructor(
		shortenedUrlRepository: IShortenedUrlRepository,
		eventManager: IEventManager,
	) {
		this.shortenedUrlRepository = shortenedUrlRepository;
		this.eventManager = eventManager;
	}

	public async execute(uuid: string): Promise<void> {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'IncrementHit',
				what: `Iniciando incremento da propriedade hit.`,
			},
		});
		await this.shortenedUrlRepository.incrementHit(uuid);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'IncrementHit',
				what: `Propriedade hit incrementada.`,
			},
		});
	}
}
