export type Message = {
	where: string;
	what: string;
};
export interface ILogger {
	info(message: Message): void;
	error(error: Message): void;
}
