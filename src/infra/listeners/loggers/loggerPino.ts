import pino from 'pino';

const transport = pino.transport({
	target: 'pino-pretty',
	options: {
		translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
		ignore: 'pid,hostname',
	},
});

export const logger = pino(transport);
