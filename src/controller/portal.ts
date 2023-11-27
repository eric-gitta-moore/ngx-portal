import { Request, Response } from 'express';
import { ngxRenderUrl, svg2bitmapUrl } from '../config/config';
import logger from '../util/logger';
import { stringify } from 'superjson';
import { isMultiSeries, transformString2Date } from '../util/hepler';
import { ChartParam, NgxRenderApiChartParam, SvgApiParam } from '../interface/portal';

export function preprocessing(param: NgxRenderApiChartParam): ChartParam {
  if (!param.ngxOptions?.results) return param;

  const res = param.ngxOptions.results;
  transformString2Date(res);
  isMultiSeries(res) && res.map((e) => transformString2Date(e.series));
  return param;
}

export async function Portal(req: Request, res: Response) {
  const param: NgxRenderApiChartParam = Object.assign(
    {},
    req.params,
    req.body,
  ) as NgxRenderApiChartParam;
  const chartParam: ChartParam = preprocessing(param);

  try {
    logger.info(`portal`, `requesting ${ngxRenderUrl}`);
    let response = await fetch(ngxRenderUrl, {
      method: 'POST',
      body: stringify(chartParam),
      headers: { 'Content-Type': 'application/json' },
    });
    const html = await response.text();

    const svgApiData: SvgApiParam = {
      html: encodeURIComponent(html),
      locator: `//app-hoc`,
    };
    logger.info(`portal`, `requesting ${svg2bitmapUrl}`);
    response = await fetch(svg2bitmapUrl, {
      method: 'POST',
      body: JSON.stringify(svgApiData),
      headers: { 'Content-Type': 'application/json' },
    });
    const bitmap = await response.blob();
    res.type(bitmap.type);
    res.send(Buffer.from(await bitmap.arrayBuffer()));
  } catch (e) {
    res.send({ err: e });
  }
}
