import express from 'express';
import setupRoute from './route';
import logger from './util/logger';
import { processEnv } from './util/config';

const app = express();
const port = processEnv.APP_PORT || 3001;

app.use(express.json());

setupRoute(app);

app.listen(port, () => {
  logger.info('app', `ngx-portal listening on port ${port}`);
});
