# ngx-portal

api:

```ts
import { IndexApiParam } from './portal';

type IndexApiParam = {
  type?: string;
  externalCSS?: string;
  ngxOptions?: Partial<Record<string, unknown>>;
};

// 默认参数
const defaultParam: IndexApiParam = {
  type: 'BarVerticalComponent',
  externalCSS: '',
  ngxOptions: {
    results: [
      {
        name: 'Germany',
        value: 40632,
        extra: {
          code: 'de',
        },
      },
      {
        name: 'United States',
        value: 50000,
        extra: {
          code: 'us',
        },
      },
      {
        name: 'France',
        value: 36745,
        extra: {
          code: 'fr',
        },
      },
      {
        name: 'United Kingdom',
        value: 36240,
        extra: {
          code: 'uk',
        },
      },
      {
        name: 'Spain',
        value: 33000,
        extra: {
          code: 'es',
        },
      },
      {
        name: 'Italy',
        value: 35800,
        extra: {
          code: 'it',
        },
      },
    ],
    showGridLines: true,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: 'xAxisLabel',
    yAxisLabel: 'yAxisLabel',
    xAxis: true,
    yAxis: true,
    legend: true,
    view: [700, 300],
    animations: false,
  },
};
```

[example.http](docs/example.http)