import { MultiSeries, SingleSeries } from '@swimlane/ngx-charts';

export interface SingleSeriesValueDefine {
  name: string;
  value: string;
  extra?: string;
  min?: string;
  max?: string;
  label?: string;
}

export interface MultiSeriesValueDefine {
  name: string;
  series: SingleSeriesValueDefine;
}

export type ValueDefine = SingleSeriesValueDefine | MultiSeriesValueDefine;

export type NgxOptions = {
  [key: string]: unknown;
  results: MultiSeries | SingleSeries;
};

export enum ChartType {
  AdvancedPieChartComponent = 'AdvancedPieChartComponent',
  AreaChartComponent = 'AreaChartComponent',
  AreaChartNormalizedComponent = 'AreaChartNormalizedComponent',
  AreaChartStackedComponent = 'AreaChartStackedComponent',
  BarHorizontalComponent = 'BarHorizontalComponent',
  BarHorizontalNormalizedComponent = 'BarHorizontalNormalizedComponent',
  BarHorizontalStackedComponent = 'BarHorizontalStackedComponent',
  BarVerticalComponent = 'BarVerticalComponent',
  BarVerticalNormalizedComponent = 'BarVerticalNormalizedComponent',
  BarVerticalStackedComponent = 'BarVerticalStackedComponent',
  BoxChartComponent = 'BoxChartComponent',
  BubbleChartComponent = 'BubbleChartComponent',
  GaugeComponent = 'GaugeComponent',
  HeatMapComponent = 'HeatMapComponent',
  LineChartComponent = 'LineChartComponent',
  NumberCardComponent = 'NumberCardComponent',
  PieChartComponent = 'PieChartComponent',
  PieGridComponent = 'PieGridComponent',
  PolarChartComponent = 'PolarChartComponent',
  TreeMapComponent = 'TreeMapComponent',
}

export interface ChartParam {
  type: ChartType;
  externalCSS?: string;
  ngxOptions?: Partial<NgxOptions>;
}

export interface NgxRenderApiChartParam extends ChartParam {
  ngxOptions?: {
    [key: string]: unknown;
    results: any;
  };
}

export type IndexApiParam = NgxRenderApiParam;

export enum SeriesType {
  SingleSeries = 'SingleSeries',
  MultiSeries = 'MultiSeries',
  BubbleChartMultiSeries = 'BubbleChartMultiSeries',
  BoxChartMultiSeries = 'BoxChartMultiSeries',
  TreeMapData = 'TreeMapData',
  SankeyData = 'SankeyData',
}

export interface NgxRenderApiParam {
  translator?: SingleSeriesValueDefine | MultiSeriesValueDefine;
  translatorFn?: string;
  chartParam: NgxRenderApiChartParam;
  debug?: boolean;
  seriesType?: SeriesType;
}

export interface SvgApiParam {
  url?: string;
  html?: string;
  locator?: string;
}
