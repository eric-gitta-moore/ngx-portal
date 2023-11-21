import { Request, Response } from 'express';
import { ngxRenderUrl, svg2bitmapUrl } from '../config/config';
import logger from '../util/logger';
import { stringify } from 'superjson';
import { MultiSeries } from '@swimlane/ngx-charts';

export type NgxOptions = {
  [key: string]: unknown;
  results: MultiSeries;
};

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

export interface NgxRenderApiParam extends ChartParam {
  ngxOptions?: Partial<NgxOptions>;
}

export interface SvgApiParam {
  url?: string;
  html?: string;
  locator?: string;
}

export function preprocessing(param: IndexApiParam): IndexApiParam {
  function transformString2Date(arr: any[]) {
    function isDate(str: string): boolean {
      try {
        new Date(str).toISOString();
      } catch (e) {
        return false;
      }
      return true;
    }

    if (isDate(arr?.[0].name) && new Date(arr?.[0].name)?.toISOString() === arr?.[0].name) {
      arr.map((e) => {
        if (new Date(e.name).toISOString() === e.name) {
          e.name = new Date(e.name);
        }
      });
    }
  }

  param.ngxOptions?.results && transformString2Date(param.ngxOptions?.results);
  param.ngxOptions?.results?.map((e) => transformString2Date(e.series));
  return param;
}

export async function portal(req: Request, res: Response) {
  let param: IndexApiParam = Object.assign({}, req.params, req.body) as NgxRenderApiParam;
  param = preprocessing(param);

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
