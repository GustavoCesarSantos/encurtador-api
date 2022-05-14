import express, { Express, Router } from 'express';
import { Logger } from 'pino';

import { routes } from '@infra/routes';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { Server } from 'node:http';

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

	public listen(): Server {
		return this.app.listen(this.port, () =>
			this.logger.info(`Server running in port: ${this.port}`),
		);
	}
}
