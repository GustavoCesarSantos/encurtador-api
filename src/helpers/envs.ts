import * as dotenv from 'dotenv';
dotenv.config();

export const variables = {
	domainUrl: process.env.DOMAIN_URL ?? 'http://localhost:3000/v1',
	port: process.env.PORT ?? '3001',
	nodeEnv: process.env.NODE_ENV ?? 'development',
	redisUrl: `redis://:${process.env.REDIS_PASSWORD ?? 'devTestePassword'}@${
		process.env.REDIS_HOST ?? 'localhost'
	}:${process.env.REDIS_PORT ?? '6379'}`,
	rateLimitFixedWindowInMinutes: Number(
		process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES ?? 90,
	),
	rateLimitToken: Number(process.env.RATE_LIMIT_TOKEN ?? 1000),
};
