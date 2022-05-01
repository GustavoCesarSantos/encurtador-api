import * as dotenv from 'dotenv';
dotenv.config();

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.handleUncaughtException();
app.handleUnhandledRejection();
app.setupRoutes();
app.listen();
