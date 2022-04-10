export interface ILogger {
	info(message: string): void;
	error(error: string | Error): void;
}
