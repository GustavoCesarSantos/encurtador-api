import { rateLimit } from '@infra/factories/middlewares/rateLimit';
import { Router } from 'express';

export const healthCheck = (router: Router): void => {
	router.get('/health', rateLimit, (request, response) =>
		response.status(200).json({ message: 'ok' }),
	);
};
