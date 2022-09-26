import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '@shared/IMiddleware';

export const adaptMiddleware = (middleware: IMiddleware) => {
	return async (request: Request, response: Response, next: NextFunction) => {
		const httpResponse = await middleware.handle(request);
		if (httpResponse.status <= 399) {
			next();
		}
		response.status(httpResponse.status).json({
			error: httpResponse.body.message,
		});
	};
};
