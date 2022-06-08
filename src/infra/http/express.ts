import express, { Express, Router } from 'express';
import { Logger } from 'pino';
import cors from 'cors';

import { routes } from '@infra/routes';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { Server } from 'node:http';

export class ExpressApp {
	private readonly app: Express;
	private readonly port: string = process.env.PORT ?? '3001';
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

	public setCors() {
		const options: cors.CorsOptions = {
			allowedHeaders: [
				'Origin',
				'X-Requested-With',
				'Content-Type',
				'Accept',
				'X-Access-Token',
			],
			credentials: true,
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin: 'http://localhost:3000',
			preflightContinue: false,
		};

		// const allowedOrigins = ['*'];
		// const options: cors.CorsOptions = {
		// 	origin: allowedOrigins,
		// };
		this.app.use(cors(options));
	}

	public setupRoutes(): void {
		const router = Router();
		routes(router);
		this.app.use('/v1', router);
	}

	public listen(): Server {
		return this.app.listen(this.port, () =>
			this.logger.info(`Server running in port: ${this.port}`),
		);
	}
}
