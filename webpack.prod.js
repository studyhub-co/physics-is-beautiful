const merge = require('webpack-merge')
const common = require('./webpack.common.js')
var BundleTracker = require('webpack-bundle-tracker')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  // output: {
  //   publicPath: 'https://assets-dev.physicsisbeautiful.com/js/bundles/'
  // },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]

})
