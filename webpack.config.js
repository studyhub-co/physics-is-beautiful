var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = function (env) {
  const MODE = (env && 'NODE_ENV' in env) ? env.NODE_ENV : 'production'

  return {
    context: __dirname,

    entry: {
      curriculum: './curricula/static/curricula/js/curriculum_app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
      profile_anonymous: './profiles/static/profiles/js/anonymous/profile_modal',
      profile: './profiles/static/profiles/js/authenticated/index',
      // editor: './editor/static/editor/js/app',
      // classroom: './classroom/static/classroom/js/index',
      // resources: './resources/static/resources/js/index',
      // homepage: './homepage/static/homepage/js/index'
    },

    output: {
      path: path.resolve('./static/bundles/'),
      filename: '[name]-[hash].js',
      // publicPath: (env && 'NODE_ENV' in env && env.NODE_ENV === 'production') ? '/' : '/static/bundles/'
    },

    plugins: MODE === 'production' ? [
      new BundleTracker({filename: './webpack-stats.json'}),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(MODE)
        }
      }),
      // new webpack.optimize.UglifyJsPlugin(), // minify everything
      new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
    ]
      : [
        new BundleTracker({filename: './webpack-stats.json'})
      ],

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'react']
          }
        },
        {
          test: /\.jpe?g$|\.gif$|\.png$/,
          options: {
            name: '[name].[ext]?[hash]'
          },
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      modules: ['static/js/common', 'node_modules', 'bower_components'],
      extensions: ['.js', '.jsx']
    },
    watchOptions: { // fix watch for Windows
      poll: 1000
    }
  }
}
