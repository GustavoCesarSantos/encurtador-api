import * as dotenv from 'dotenv';
dotenv.config();

import { ExpressApp } from '@infra/http/express';
import { gracefullShutdown } from '@utils/gracefullShutdown';

const app = new ExpressApp();
const server = app.listen();
gracefullShutdown(server);
