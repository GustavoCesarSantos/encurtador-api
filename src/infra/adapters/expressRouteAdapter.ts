import { Request, Response } from 'express';

import { IController } from '@shared/IController';

export const expressRouteAdapter = (controller: IController) => {
	return async (request: Request, response: Response) => {
		const httpResponse = await controller.handle(request);
		if (httpResponse.status > 399) {
			return response
				.status(httpResponse.status)
				.json({ error: httpResponse.body });
		}
		if (httpResponse.status === 302) {
			const { rootUrl } = httpResponse.body as { rootUrl: string };
			return response.redirect(rootUrl);
		}
		return response.status(httpResponse.status).json(httpResponse.body);
	};
};
