import { Express } from 'express';
import { Portal } from '../controller/portal';
import { index } from '../controller';
import { Parse } from '../controller/parse';
import { SingleSeries } from '../controller/single-series';
import { MultiSeries } from '../controller/multi-series';

export default function setupRoute(app: Express) {
  app.all('/portal', Portal);
  app.all('/', index);
  app.all('/parse', Parse);
  app.post('/single-series', SingleSeries);
  app.post('/multi-series', MultiSeries);
}
