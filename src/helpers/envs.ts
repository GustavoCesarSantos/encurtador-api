import * as dotenv from 'dotenv';
dotenv.config();

export const variables = {
	domainUrl: process.env.DOMAIN_URL ?? 'http://localhost:3001/v1',
	port: process.env.PORT ?? '3001',
	nodeEnv: process.env.NODE_ENV ?? 'development',
	cacheUrl: process.env.CACHE_URL ?? 'redis://localhost:6379',
	upstashUrl: process.env.UPSTASH_REDIS_REST_URL,
	upstashToken: process.env.UPSTASH_REDIS_REST_TOKEN,
	rateLimitFixedWindowInMinutes: Number(
		process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES ?? 90,
	),
	rateLimitToken: Number(process.env.RATE_LIMIT_TOKEN ?? 1000),
};
