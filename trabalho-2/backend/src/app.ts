import 'reflect-metadata';
import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app: Express = express();

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

export default app;
