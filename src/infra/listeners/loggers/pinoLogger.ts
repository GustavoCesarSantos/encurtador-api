import pino, { Logger } from 'pino';
import { ILogger } from './logger';

export class PinoLogger implements ILogger {
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
