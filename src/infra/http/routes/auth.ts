import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { HandlerFactory } from '@modules/identity/utils/factory/handler/handlerFactory';
import { auth } from '@infra/factories/middlewares/auth';

const controllerFactory = new HandlerFactory();

export const authenticate = (router: Router): void => {
	router.post(
		'/auth/refreshToken',
		adaptRoute(controllerFactory.makeRefreshToken()),
	);
	router.post('/auth/signin', adaptRoute(controllerFactory.makeSignIn()));
	router.post(
		'/auth/signout',
		auth,
		adaptRoute(controllerFactory.makeSignOut()),
	);
};
