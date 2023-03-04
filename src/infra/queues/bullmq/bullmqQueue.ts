import { Queue } from 'bullmq';

import { IQueue } from '../IQueue';
import { ioRedis } from '@infra/db/redis/ioRedisHelper';

export class BullMQQueue implements IQueue {
	private queue: Queue;

	constructor(queueName: string) {
		this.queue = new Queue(queueName, { connection: ioRedis });
	}

	async add(jobName: string, data: string): Promise<void> {
		await this.queue.add(jobName, data);
	}
}
