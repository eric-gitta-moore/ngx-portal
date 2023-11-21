import { Request, Response } from 'express';
import { ngxRenderUrl, svg2bitmapUrl } from '../config/config';
import logger from '../util/logger';
import { stringify } from 'superjson';

export type NgxOptions = Record<string, unknown>;

export enum ChartType {
  AdvancedPieChartComponent = 'AdvancedPieChartComponent',
  AreaChartComponent = 'AreaChartComponent',
  AreaChartNormalizedComponent = 'AreaChartNormalizedComponent',
  AreaChartStackedComponent = 'AreaChartStackedComponent',
  BarHorizontal2DComponent = 'BarHorizontal2DComponent',
  BarHorizontalComponent = 'BarHorizontalComponent',
  BarHorizontalNormalizedComponent = 'BarHorizontalNormalizedComponent',
  BarHorizontalStackedComponent = 'BarHorizontalStackedComponent',
  BarVertical2DComponent = 'BarVertical2DComponent',
  BarVerticalComponent = 'BarVerticalComponent',
  BarVerticalNormalizedComponent = 'BarVerticalNormalizedComponent',
  BarVerticalStackedComponent = 'BarVerticalStackedComponent',
  BoxChartComponent = 'BoxChartComponent',
  BubbleChartComponent = 'BubbleChartComponent',
  GaugeComponent = 'GaugeComponent',
  HeatMapComponent = 'HeatMapComponent',
  LineChartComponent = 'LineChartComponent',
  LinearGaugeComponent = 'LinearGaugeComponent',
  NumberCardComponent = 'NumberCardComponent',
  PieChartComponent = 'PieChartComponent',
  PieGridComponent = 'PieGridComponent',
  PolarChartComponent = 'PolarChartComponent',
  SankeyComponent = 'SankeyComponent',
  TreeMapComponent = 'TreeMapComponent',
}

export interface ChartParam {
  type: ChartType;
  externalCSS?: string;
  ngxOptions?: Partial<NgxOptions>;
}

export type IndexApiParam = Partial<ChartParam>;

export type NgxRenderApiParam = Partial<ChartParam>;

export interface SvgApiParam {
  url?: string;
  html?: string;
  locator?: string;
}

export async function portal(req: Request, res: Response) {
  const param: NgxRenderApiParam = Object.assign({}, req.params, req.body) as IndexApiParam;

  try {
    logger.info(`portal`, `requesting ${ngxRenderUrl}`);
    let response = await fetch(ngxRenderUrl, {
      method: 'POST',
      body: stringify(param),
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
