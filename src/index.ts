import * as core from 'express-serve-static-core';
import express from 'express';
import { appRouter } from '@presentation/app-router';
import * as process from 'process';
import bodyParser from 'body-parser';

const app: core.Express = express();

app.use(bodyParser.json());

app.use('/', appRouter);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
