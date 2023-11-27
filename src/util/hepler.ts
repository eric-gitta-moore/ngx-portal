import { MultiSeries, SingleSeries } from '@swimlane/ngx-charts';
import { NgxRenderApiParam, SeriesType } from '../interface/portal';
import { JSONPath } from 'jsonpath-plus';
import { Request, Response } from 'express';

export function transformString2Date(arr: any[]) {
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

export function isMultiSeries(arr: MultiSeries | SingleSeries): arr is MultiSeries {
  return 'series' in arr[0];
}

export function zip(...arrays: any[]): any[] {
  return arrays[0].map((_: any, i: number) => arrays.map((array) => array[i]));
}

export const defaultTranslator: Partial<Record<SeriesType, any>> = {
  [SeriesType.SingleSeries]: {
    name: '$..bucketing_attributes..value',
    value: '$..counters..result.value',
  },
  [SeriesType.MultiSeries]: {
    name: '$..bucketing_attributes[0]..value',
    series: {
      name: '$..bucketing_attributes[1]..value',
      value: '$..counters..result.value',
    },
  },
};

export type TranslatorFn = (chartResults: any) => any;

export const defaultTranslatorFn: Partial<Record<SeriesType, TranslatorFn>> = {
  [SeriesType.SingleSeries]: (chartResults: any) => {
    const translator = defaultTranslator[SeriesType.SingleSeries];
    const transKeys = Object.keys(translator);
    const matrix = transKeys.map((type: string) =>
      JSONPath({ path: translator[type], json: chartResults }),
    );
    return zip(...matrix).map((e) => {
      return Object.fromEntries(zip(transKeys, e));
    });
  },
  [SeriesType.MultiSeries]: (chartResults: any) => {},
};

export function applyTranslator({
  param,
  req,
  res,
}: {
  param: NgxRenderApiParam;
  req: Request;
  res: Response;
}): NgxRenderApiParam {
  const results: any = param.chartParam.ngxOptions?.results;
  if (!results) return param;
  const seriesType: SeriesType = param.seriesType || SeriesType.SingleSeries;

  if (!seriesType || !(seriesType in defaultTranslatorFn)) {
    throw new Error('seriesType error');
  }

  const transFn: TranslatorFn = param.translatorFn
    ? (new Function(param.translatorFn) as TranslatorFn)
    : defaultTranslatorFn[seriesType]!;
  param.chartParam.ngxOptions!.results = transFn(results);
  return param;
}

export function isString(x: any): x is string {
  return typeof x === 'string';
}
