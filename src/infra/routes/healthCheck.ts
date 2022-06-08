import { Router } from 'express';

export const healthCheck = (router: Router): void => {
	router.get('/status', (request, response) =>
		response.status(200).json({ status: 'ok' }),
	);
};
