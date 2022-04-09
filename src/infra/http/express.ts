import express, { Express, Router } from 'express';

import { routes } from '@infra/routes';
import { logger } from '@infra/listeners/loggers/loggerPino';

export class ExpressApp {
	public readonly app: Express;
	private readonly port: string = process.env.PORT ?? '3000';

	constructor() {
		this.app = express();
		this.app.use(express.json());
	}

	public setupRoutes() {
		const router = Router();
		this.app.use('/v1', router);
		routes(router);
	}

	public listen() {
		this.app.listen(this.port, () =>
			logger.info(`Server running in port:${this.port}`),
		);
	}
}
