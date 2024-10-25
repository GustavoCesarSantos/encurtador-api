export interface IIncrementAuthTokenVersion {
	execute(userId: number): Promise<number>;
}
