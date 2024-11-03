import { z } from 'zod';

export const ListAllUserUrlsInput = z.object({
	ownerId: z.number().int(),
});

export type ListAllUserUrlsInput = z.infer<typeof ListAllUserUrlsInput>;
