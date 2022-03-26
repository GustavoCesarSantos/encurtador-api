import * as dotenv from 'dotenv';
dotenv.config();

import { ExpressApp } from '@infra/http/express';

const app = new ExpressApp();
app.setupRoutes();
app.listen();
