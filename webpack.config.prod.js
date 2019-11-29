const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin');

const devServerHost = process.env.WEBPACK_DEV_SERVER_HOST || '0.0.0.0';
const devServerPort = process.env.WEBPACK_DEV_SERVER_PORT || 8080;

module.exports = {
  mode: "production",
  entry: {
    'pon-audio-spectrum': path.join(__dirname, 'src/pon-audio-spectrum.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.ts$/, loader: "eslint-loader", exclude: /node_modules/ },
      { test: /\.ts$/, loader:'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions:['.ts']
  },
  // plugins: [
  //   new WriteFilePlugin(),
  // ],
  devServer: {
    host: devServerHost,
    port: devServerPort,
    disableHostCheck: true,
    contentBase: path.join(__dirname, 'dist_dev')
  }
}
