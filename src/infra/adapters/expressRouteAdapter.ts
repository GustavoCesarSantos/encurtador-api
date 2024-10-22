import { Request, Response } from 'express';

import { IController } from '@shared/interfaces/IController';

export const adaptRoute = (controller: IController) => {
	return async (request: Request, response: Response) => {
		const httpResponse = await controller.handle(request);
		if (httpResponse.status > 399) {
			return response
				.status(httpResponse.status)
				.json({ error: httpResponse.body });
		}
		return response.status(httpResponse.status).json(httpResponse.body);
	};
};
