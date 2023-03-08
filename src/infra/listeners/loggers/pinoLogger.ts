import pino, { Logger } from 'pino';

import { EventNames } from '@helpers/eventNames';
import { IListener, Payload } from '../IListener';
import { ILogger, Message } from './ILogger';
import { variables } from '@helpers/envs';

export class PinoLogger implements ILogger, IListener {
	private transport: any = {};
	private readonly logger!: Logger<any>;

	private constructor() {
		if (variables.nodeEnv === 'development') {
			this.transport = pino.transport({
				target: 'pino-pretty',
				options: {
					translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
					ignore: 'pid,hostname',
				},
			});
		}
		this.logger = pino(this.transport);
	}

	public update(payload: Payload): void {
		const message: Message = payload.message;
		if (payload.eventName === EventNames.info) return this.info(message);
		if (payload.eventName === EventNames.warn) return this.warn(message);
		if (payload.eventName === EventNames.error) return this.error(message);
		this.error({
			where: 'PinoLogger',
			what: `Incapaz de gerar logs para este tipo de evento: ${payload.eventName}`,
		});
	}

	public static create(): PinoLogger {
		return new PinoLogger();
	}

	public child(binding: pino.Bindings): Logger<any> {
		return this.logger.child(binding);
	}

	public info(message: Message): void {
		this.logger.info(message);
	}

	public warn(message: Message): void {
		this.logger.warn(message);
	}

	public error(error: Message): void {
		this.logger.error(error);
	}
}
