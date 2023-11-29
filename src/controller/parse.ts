import { Request, Response } from 'express';
import { ChartParam, ChartType, NgxRenderApiParam } from '../interface/portal';
import { applyTranslator } from '../util/hepler';
import { Portal } from './portal';
import logger from '../util/logger';
import { JSONPath } from 'jsonpath-plus';

export async function Parse(req: Request, res: Response) {
  const param: any = Object.assign({}, req.query, req.params, req.body);
  let uniformParam: NgxRenderApiParam = param;
  if (!param.chartParam) {
    uniformParam = {
      chartParam: {
        type: ChartType.PieChartComponent,
        externalCSS: '',
        ngxOptions: {
          results: req.body,
          view: [700, 300],
        },
      },
    };
    const cols = JSONPath({ path: `$..trend_results[0].bucketing_attributes..value`, json: param });
    if (cols.length === 1) {
      // with one group by
      uniformParam.chartParam.type = ChartType.PieChartComponent;
    } else if (cols.length === 2) {
      // with two group by
      uniformParam.chartParam.type = ChartType.BarVertical2DComponent;
    } else {
      // without group by
      uniformParam.chartParam.type = ChartType.PieGridComponent;
    }
  }

  try {
    const puredParam: NgxRenderApiParam = applyTranslator({ param: uniformParam, req, res });
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
