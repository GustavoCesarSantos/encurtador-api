import express, { Express, Router } from 'express';
import { Logger } from 'pino';

import { routes } from '@infra/routes';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

export class ExpressApp {
	private readonly app: Express;
	private readonly port: string = process.env.PORT ?? '3000';
	private readonly logger: Logger<any> = PinoLogger.create().child({
		environment: `${process.env.NODE_ENV}`,
	});

	constructor() {
		this.app = express();
		this.app.use(express.json());
	}

	public getApp(): Express {
		return this.app;
	}

	public setupRoutes(): void {
		const router = Router();
		this.app.use('/v1', router);
		routes(router);
	}

	public listen(): void {
		this.app.listen(this.port, () =>
			this.logger.info(`Server running in port: ${this.port}`),
		);
	}

	public handleUncaughtException(): void {
		process.on('uncaughtException', (err: Error) => {
			this.logger.info('Caiu aqui');
			this.logger.error(err);
			process.exit(1);
		});

		process.on('unhandledRejection', (err: Error) => {
			this.logger.info('Caiu aqui');
			this.logger.error(err);
			process.exit(1);
		});
	}
}
