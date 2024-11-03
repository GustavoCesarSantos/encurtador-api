import { z } from 'zod';

export const ShortenUrlInput = z.object({
	ownerId: z.number().int(),
	originalUrl: z.string().url(),
	code: z.string().max(5),
	customCode: z.string().max(25).optional(),
	qrCode: z.string().optional(),
});

export type ShortenUrlInput = z.infer<typeof ShortenUrlInput>;
