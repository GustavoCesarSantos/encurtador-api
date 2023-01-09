import { IQueue } from '@infra/queues/IQueue';

export class QueueDummy implements IQueue {
	async add(jobName: string, data: any): Promise<any> {
		return;
	}
}
