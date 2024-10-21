import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

const logger = PinoLogger.create();

function closeServer(server: any, event: string) {
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

export function gracefullShutdown(server: any) {
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

	process.on('SIGINT', closeServer(server, 'SIGINT'));

	process.on('SIGTERM', closeServer(server, 'SIGTERM'));

	process.on('exit', code => {
		logger.info({
			where: 'index',
			what: `'exit sigint received, code: ${code}`,
		});
	});
}
