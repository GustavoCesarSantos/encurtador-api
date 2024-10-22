import { Router } from 'express';

import { rateLimit } from '@infra/factories/middlewares/rateLimit';

export const healthCheck = (router: Router): void => {
	router.get('/health', rateLimit, (_, response) =>
		response.status(200).json({ message: 'ok' }),
	);
};
