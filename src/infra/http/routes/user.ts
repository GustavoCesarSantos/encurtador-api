import { Router } from 'express';

import { adaptRoute } from '@infra/adapters/expressRouteAdapter';
import { HandlerFactory } from '@modules/identity/utils/factory/handler/handlerFactory';

const controllerFactory = new HandlerFactory();

export const user = (router: Router): void => {
	router.post('/users', adaptRoute(controllerFactory.makeRegisterUser()));
};
