import { Configuration, DefinePlugin } from 'webpack';

import WebpackBarPlugin from 'webpackbar';

const config: Configuration = {
  entry: './src/app.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', 'json', '.tsx', '.ts'],
  },
  plugins: [
    new WebpackBarPlugin(),
    new DefinePlugin({
      // 定义环境变量，区分开发和生产环境
      // 具体详情可查看DefinePlugin文档
      'process.env.NODE_ENV':
        process.env.NODE_ENV === 'production'
          ? JSON.stringify('production')
          : JSON.stringify('development'),
    }),
  ],
  watchOptions: {
    ignored: ['**/node_modules'],
  },
};

export default config;
