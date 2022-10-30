type BodyResponse = {
	message?: string;
};

export type Response = {
	status: number;
	body: BodyResponse;
};
