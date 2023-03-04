import { EventNames } from '@helpers/eventNames';
import { IEventManager } from '@infra/listeners/eventManager';
import { randomUUID } from 'crypto';
export interface IGenerateCode {
	execute(): string;
}

export class GenerateCode implements IGenerateCode {
	private readonly eventManager: IEventManager;

	constructor(eventManager: IEventManager) {
		this.eventManager = eventManager;
	}

	execute(): string {
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'GenerateCode',
				what: 'Iniciando criação do código',
			},
		});
		const code = randomUUID().slice(0, 5);
		this.eventManager.notify({
			eventName: EventNames.info,
			message: {
				where: 'GenerateCode',
				what: `Código: ${code} gerado com sucesso`,
			},
		});
		return code;
	}
}
