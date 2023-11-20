import express from 'express';
import setupRoute from './route';
import logger from './util/logger';

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(express.json());

setupRoute(app);

app.listen(port, () => {
  logger.info('app', `ngx-portal listening on port ${port}`);
});
