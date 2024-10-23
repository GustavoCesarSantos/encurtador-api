export interface IIncrementAccessCounter {
	execute(code: string): Promise<void>;
}
