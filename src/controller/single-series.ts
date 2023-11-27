import { Request, Response } from 'express';
import { Parse } from './parse';

export function SingleSeries(req: Request, res: Response) {
  const payload = {
    chartParam: {
      type: 'PieChartComponent',
      externalCSS: '',
      ngxOptions: {
        results: req.body,
        view: [700, 300],
      },
    },
  };
  req.body = payload;
  Parse(req, res);
}
