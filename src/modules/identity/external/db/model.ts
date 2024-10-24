export type Model = {
	id: number;
	name: string;
	email: string;
	password: string;
	active: boolean;
	authTokenVersion: number;
	createdAt: Date;
	updatedAt: Date | null;
	removedAt: Date | null;
};
