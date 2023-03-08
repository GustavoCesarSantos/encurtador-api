export interface IQueue {
	add<DataType = any>(jobName: string, data: DataType): Promise<any | void>;
}
