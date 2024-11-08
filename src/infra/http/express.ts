import express, { Express, Router } from 'express';
import { Logger } from 'pino';
import cors from 'cors';
import { Server } from 'node:http';

import { PinoLogger } from '@infra/loggers/pinoLogger';
import { routes } from '@infra/http/routes';
import { SwaggerDoc } from '@infra/doc/swaggerDoc';
import { variables } from '@shared/envs';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';

export class ExpressApp {
	private readonly app: Express;
	private readonly port: string = variables.port;
	private readonly logger: Logger<any> = PinoLogger.create().child({
		environment: variables.nodeEnv,
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
		routes(router);
		this.app.use('/v1', rateLimit, router);
	}

	public listen(): Server {
		this.setCors();
		this.setDocRoute();
		this.setupRoutes();
		return this.app.listen(this.port, () =>
			this.logger.info(`Server running in port: ${this.port}`),
		);
	}

	private setCors() {
		const options: cors.CorsOptions = {
			allowedHeaders: [
				'Origin',
				'X-Requested-With',
				'Accept',
				'Content-Type',
				'Accept',
				'X-Access-Token',
				'Authorization',
			],
			credentials: true,
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin:
				variables.nodeEnv === 'production'
					? variables.domainUrl.split(',')
					: '*',
			preflightContinue: false,
		};
		this.app.use(cors(options));
	}

	private setDocRoute(): void {
		this.app.use('/docs', SwaggerDoc.serve(), SwaggerDoc.setup());
	}
}
