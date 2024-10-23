import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { rateLimit } from '@infra/factories/middlewares/rateLimit';
import { auth } from '@infra/factories/middlewares/auth';
import { HandlerFactory } from '@modules/identity/utils/factory/handler/handlerFactory';

const controllerFactory = new HandlerFactory();

export const authenticate = (router: Router): void => {
	router.post(
		'/auth/signin',
		// rateLimit,
		adaptRoute(controllerFactory.makeSignIn()),
	);
};
