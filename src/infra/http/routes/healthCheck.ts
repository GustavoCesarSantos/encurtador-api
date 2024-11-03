import { Router } from 'express';

export const healthCheck = (router: Router): void => {
	router.get('/health', (_, response) =>
		response.status(200).json({ message: 'ok' }),
	);
};
