export type Model = {
	id: number;
	ownerId: number;
	originalUrl: string;
	code: string;
	customCode: string | null;
	qrCode: string | null;
	accessCounter: number;
	lastAccess: Date | null;
	createdAt: Date;
	updatedAt: Date | null;
	removedAt: Date | null;
};
