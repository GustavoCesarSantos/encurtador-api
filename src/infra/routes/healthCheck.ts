import { Router } from 'express';

export const healthCheck = (router: Router): void => {
	router.get('/healthCheck', (request, response) =>
		response.status(200).json({ healthCheck: 'ok' }),
	);
};
