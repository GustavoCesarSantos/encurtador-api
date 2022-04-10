import pino, { Logger } from 'pino';

import { IListener } from '../listener';
import { EventNames } from '@helpers/eventNames';
import { ILogger } from './logger';

export class PinoLogger implements ILogger, IListener {
	private transport: any = {};
	private readonly logger!: Logger<any>;

	private constructor() {
		if (process.env.NODE_ENV === 'development') {
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

	public static create(): PinoLogger {
		return new PinoLogger();
	}

	public update(eventName: string, payload: string | Error): void {
		if (eventName === EventNames.info) {
			if (typeof payload === 'string') return this.info(payload);
			return this.error(
				`Tipo invalido de payload: ${typeof payload} para evento: ${eventName}`,
			);
		}
		if (eventName === EventNames.error) return this.error(payload);
		this.error(
			`Incapaz de gerar logs para este tipo de evento: ${eventName}`,
		);
	}

	public child(binding: pino.Bindings): Logger<any> {
		return this.logger.child(binding);
	}

	public info(message: string): void {
		this.logger.info(message);
	}

	public error(error: string | Error): void {
		this.logger.error(error);
	}
}
