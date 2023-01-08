import * as dotenv from 'dotenv';
dotenv.config();

export const variables = {
	domainUrl: String(process.env.DOMAIN_URL) ?? 'http://localhost:3000/v1',
	port: String(process.env.PORT) ?? '3001',
	nodeEnv: String(process.env.NODE_ENV) ?? 'development',
	rateLimitFixedWindowInMinutes:
		Number(process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES) ?? 90,
	rateLimitToken: Number(process.env.RATE_LIMIT_TOKEN) ?? 1000,
};
