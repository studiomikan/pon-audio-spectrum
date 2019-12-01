const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack')

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
  plugins: [
    new DtsBundleWebpack({
      name: 'pon-audio-spectrum',
      main: 'src/pon-audio-spectrum.d.ts',
      baseDir: 'dist',
      out: 'pon-audio-spectrum.d.ts',
      removeSource: true,
      outputAsModuleFolder: true
    })
  ],
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
