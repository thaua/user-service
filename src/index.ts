import * as core from 'express-serve-static-core';
import express from 'express';
import { appRouter } from '@presentation/app-router';
import * as process from 'process';
import bodyParser from 'body-parser';

const app: core.Express = express();

app.use(bodyParser.json());

app.use((err: any, _: express.Request, response: express.Response, next: any) => {
  // if (err) {
  // console.error(err.stack);

  // if (err.status) {
  //   response.status(err.status);
  // } else {
  //   response.status(500);
  // }

  response.json({ error: true });
  // }
});

app.use('/', appRouter);

const port = process.env.PORT || '3001';

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}`);
});
