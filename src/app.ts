import express from 'express';
import setupRoute from './route';
import log from './util/logger';

const app = express();
const port = 3000;

app.use(express.json());

setupRoute(app);

app.listen(port, () => {
  log.info('app', `ngx-portal listening on port ${port}`);
});
