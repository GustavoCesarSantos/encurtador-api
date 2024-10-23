type BodyResponse = {
	message?: string;
	resource?: string;
};

export type Response = {
	status: number;
	body: BodyResponse;
};
