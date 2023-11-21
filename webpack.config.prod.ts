import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.config.base';

const config: Configuration = merge(base, {
  mode: 'production',
});

export default config;
