import express, { Express, Router } from 'express';

import { routes } from '@infra/routes';

export class ExpressApp {
	private readonly app: Express;
	private readonly port: string = process.env.PORT ?? '3000';

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
		this.app.listen(this.port);
	}
}
