import { Express } from 'express';
import { Portal } from '../controller/portal';
import { index } from '../controller';
import { Parse } from '../controller/parse';

export default function setupRoute(app: Express) {
  app.all('/portal', Portal);
  app.all('/', index);
  app.all('/parse', Parse);
}
