var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = function (env) {

  // console.log(env);

  return {
    context: __dirname,

    entry: {
      curriculum: './curricula/static/curricula/js/curriculum_app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
      profile: './profiles/static/profiles/js/profile_modal',
      editor: './editor/static/editor/js/app',
      classroom: './classroom/static/classroom/js/index',
    },

    output: {
      path: path.resolve('./static/bundles/'),
      filename: "[name]-[hash].js",
      // publicPath: '/' // https://github.com/webpack/webpack-dev-middleware/issues/205#issuecomment-315847782
    },

    plugins: [
      new BundleTracker({filename: './webpack-stats.json'}),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify((env && 'NODE_ENV' in env) ? env.NODE_ENV : 'production')
        }
      }),
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
          loader: 'file-loader?name=/static/bundles/images/[name].[ext]?[hash]'
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
