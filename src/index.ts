import { appRouter } from '@presentation/app-router';
import bodyParser from 'body-parser';
import express from 'express';
import * as core from 'express-serve-static-core';
import * as process from 'process';

const app: core.Express = express();

app.use(bodyParser.json());

app.use('/', appRouter);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
