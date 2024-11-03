import { adaptMiddleware } from '@infra/adapters/expressMiddlewareAdapter';
import { Authenticate } from '@infra/middlewares/auth';
import { Repository } from '@modules/identity/external/db/prisma/repository';

const repository = new Repository();

export const auth = adaptMiddleware(new Authenticate(repository));
