export interface IQueue {
	add(jobName: string, data: any): Promise<any | void>;
}
