import { Express } from 'express';
import { index } from '../controller';

export default function setupRoute(app: Express) {
  app.all('/', index);
}
