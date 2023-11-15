// @ts-check
const WebpackBarPlugin = require('webpackbar');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  target: 'node',
  devtool: 'source-map',
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
  plugins: [new WebpackBarPlugin()],
};
