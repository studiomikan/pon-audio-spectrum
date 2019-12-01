const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            'max_line_len': 255
          }
        },
      }),
    ],
  },
}
