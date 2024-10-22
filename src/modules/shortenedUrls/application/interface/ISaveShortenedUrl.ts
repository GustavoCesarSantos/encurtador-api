export interface ISaveShortenedUrl {
	execute(url: string, code: string): Promise<void | Error>;
}
