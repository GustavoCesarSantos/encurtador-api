export type ShortenedUrlCreatedJob = {
	url: string;
	code: string;
};

export type IncrementShortenedUrlHitsJob = {
	code: string;
};
