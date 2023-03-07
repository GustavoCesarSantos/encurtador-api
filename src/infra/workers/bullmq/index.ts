import { Worker } from 'bullmq';

import { QueueName } from '@helpers/queue';
import { ioRedis } from '@infra/db/redis/ioRedisHelper';
import { WorkersFactory } from '@infra/factories/workers/workersFactory';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

const logger = PinoLogger.create();
const workerFactory = new WorkersFactory();
const shortenedUrlCreatedWorker = workerFactory.makeShortenedUrlCreatedWorker();

const worker = new Worker(
	QueueName.ShortenedUrlCreated,
	shortenedUrlCreatedWorker.execute.bind(shortenedUrlCreatedWorker),
	{ connection: ioRedis },
);

worker.on('failed', job => {
	if (job) {
		logger.error({
			where: 'workers.bullmq.index',
			what: `Job: ${job.id} failed`,
		});
	}
});
