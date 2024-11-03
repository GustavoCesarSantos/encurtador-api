import { z } from 'zod';

export const ReportBugInput = z.object({
	email: z.string().email(),
	description: z.string().max(250),
});

export type ReportBugInput = z.infer<typeof ReportBugInput>;
