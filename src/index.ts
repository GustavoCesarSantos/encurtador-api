import * as dotenv from 'dotenv';
dotenv.config();

import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';
import { ExpressApp } from '@infra/http/express';

const logger = PinoLogger.create();
const app = new ExpressApp();
app.setCors();
app.setDocRoute();
app.setupRoutes();
const server = app.listen();

function gracefullShutdown(event: string) {
	return (code: number) => {
		logger.info({
			where: 'index',
			what: `${event} received, code: ${code}`,
		});
		server.close(() => {
			logger.info({ where: 'index', what: 'http server closed' });
			logger.info({ where: 'index', what: 'db connection closed' });
			process.exit(code);
		});
	};
}

process.on('uncaughtException', (error, origin) => {
	logger.info({
		where: 'index',
		what: `\n${origin} signal received. \n${error}`,
	});
});

process.on('unhandledRejection', error => {
	logger.info({
		where: 'index',
		what: `signal received. \n${error}`,
	});
});

process.on('SIGINT', gracefullShutdown('SIGINT'));

process.on('SIGTERM', gracefullShutdown('SIGTERM'));

process.on('exit', code => {
	logger.info({
		where: 'index',
		what: `'exit sigint received, code: ${code}`,
	});
});
