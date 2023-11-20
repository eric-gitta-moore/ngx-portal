import { Express } from 'express';
import { portal } from '../controller/portal';
import { index } from '../controller';

export default function setupRoute(app: Express) {
  app.all('/portal', portal);
  app.all('/', index);
}
