import { Worker } from 'bullmq';

import { QueueName } from '@helpers/queue';
import { ioRedis } from '@infra/db/redis/ioRedisHelper';
import { WorkersFactory } from '@infra/factories/workers/workersFactory';
import { PinoLogger } from '@infra/listeners/loggers/pinoLogger';

const logger = PinoLogger.create();
const workerFactory = new WorkersFactory();
const shortenedUrlCreatedWorker = workerFactory.makeShortenedUrlCreatedWorker();
const incrementShortenedUrlHitsWorker =
	workerFactory.makeIncrementShortenedUrlHitsWorker();

const shortenedUrlCreated = new Worker(
	QueueName.ShortenedUrlCreated,
	shortenedUrlCreatedWorker.execute.bind(shortenedUrlCreatedWorker),
	{ connection: ioRedis },
);

const incrementShortenedUrlHits = new Worker(
	QueueName.ShortenedUrlHitsUpdated,
	incrementShortenedUrlHitsWorker.execute.bind(
		incrementShortenedUrlHitsWorker,
	),
	{ connection: ioRedis },
);

shortenedUrlCreated.on('failed', job => {
	if (job) {
		logger.error({
			where: 'workers.bullmq.index.shortenedUrlCreated',
			what: `Job: ${job.id} failed`,
		});
	}
});

incrementShortenedUrlHits.on('failed', job => {
	if (job) {
		logger.error({
			where: 'workers.bullmq.index.incrementShortenedUrlHits',
			what: `Job: ${job.id} failed`,
		});
	}
});
