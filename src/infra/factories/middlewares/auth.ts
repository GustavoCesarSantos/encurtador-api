import { adaptMiddleware } from '@infra/adapters/expressMiddlewareAdapter';
import { Authenticate } from '@infra/middlewares/auth';

export const auth = adaptMiddleware(new Authenticate());
