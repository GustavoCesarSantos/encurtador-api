import { Router } from 'express';

export const healthCheck = (router: Router): void => {
	router.get('/health', (request, response) =>
		response.status(200).json({ message: 'ok' }),
	);
};
