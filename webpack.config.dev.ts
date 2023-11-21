import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.config.base';

const config: Configuration = merge(base, {
  mode: 'development',
  devtool: 'source-map',
});

export default config;
