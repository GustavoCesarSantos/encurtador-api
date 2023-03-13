import express, { Express, Router } from 'express';
import { Logger } from 'pino';
import cors from 'cors';

import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { routes } from '@infra/routes';
import { Server } from 'node:http';
import { SwaggerDoc } from '@infra/doc/swaggerDoc';
import { variables } from '@helpers/envs';

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
		this.app.use('/v1', router);
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
				'Content-Type',
				'Accept',
				'X-Access-Token',
			],
			credentials: true,
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin: variables.domainUrl,
			preflightContinue: false,
		};
		this.app.use(cors(options));
	}

	private setDocRoute(): void {
		this.app.use('/docs', SwaggerDoc.serve(), SwaggerDoc.setup());
	}
}
