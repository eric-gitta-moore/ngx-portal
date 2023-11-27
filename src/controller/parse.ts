import { Request, Response } from 'express';
import { ChartParam, NgxRenderApiParam } from '../interface/portal';
import { applyTranslator } from '../util/hepler';
import { Portal } from './portal';
import logger from '../util/logger';

export async function Parse(req: Request, res: Response) {
  const param: NgxRenderApiParam = Object.assign(
    {},
    req.query,
    req.params,
    req.body,
  ) as NgxRenderApiParam;

  try {
    const puredParam: NgxRenderApiParam = applyTranslator({ param, req, res });
    const chartParam: ChartParam = puredParam.chartParam;
    if (param.debug) {
      res.send(chartParam);
      return;
    }
    req.body = chartParam;
    Portal(req, res);
  } catch (e) {
    logger.warn(`parse`, JSON.stringify(e));
    res.send(e);
  }
}
