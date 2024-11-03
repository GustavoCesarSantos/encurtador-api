import { z } from 'zod';

export const ListAllUserUrlsOutput = z
	.array(
		z.object({
			originalUrl: z.string(),
			code: z.string().max(5),
			customCode: z.string().optional(),
			qrCode: z.string().optional(),
			accessCounter: z.number().int(),
			createdAt: z.string().date(),
			lastAccess: z.string().date().optional(),
		}),
	)
	.transform(val => {
		return val.map(item => {
			return {
				originalUrl: item.originalUrl,
				code: item.code,
				customCode: item.customCode,
				qrCode: item.qrCode,
				access: item.accessCounter,
				createdAt: item.createdAt,
				lastAccess: item.lastAccess,
			};
		});
	});
