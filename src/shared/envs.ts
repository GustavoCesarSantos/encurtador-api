import * as dotenv from 'dotenv';
dotenv.config();

export const variables = {
	nodeEnv: process.env.NODE_ENV ?? 'development',
	port: process.env.PORT ?? '3001',
	domainUrl: process.env.DOMAIN_URL ?? 'http://localhost:3001/v1',
	cacheUrl: process.env.CACHE_URL ?? 'redis://localhost:6379',
	rateLimitFixedWindowInMinutes: Number(
		process.env.RATE_LIMIT_FIXED_WINDOW_IN_MINUTES ?? 90,
	),
	rateLimitToken: Number(process.env.RATE_LIMIT_TOKEN ?? 1000),
	password_hash_salt: Number(process.env.PASSWORD_HASH_SALT ?? 10),
	accessTokenSecret: process.env.ACCESS_TOKEN_SECRET ?? 'teste',
	refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'teste',
	accessTokenExpirationTime:
		process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15m',
	refreshTokenExpirationTime:
		process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '7d',
	internalId: process.env.INTERNAL_ID ?? 1,
	internalEmail: process.env.INTERNAL_EMAIL ?? 'dev@dev.com',
	internalAuthVersion: process.env.INTERNAL_AUTH_VERSION ?? 1,
};
