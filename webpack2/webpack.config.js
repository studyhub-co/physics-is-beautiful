var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = function (env) {
  const MODE = (env && 'NODE_ENV' in env) ? env.NODE_ENV : 'production'

  const outputPath = MODE === 'production'
    ? ('./static/js/bundles/')
    : ('./static/bundles/')

  return {
    context: __dirname,

    entry: {
      curriculum: './curricula/static/curricula/js/curriculum_app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
      profile_anonymous: './profiles/static/profiles/js/anonymous/profile_modal',
      profile: './profiles/static/profiles/js/authenticated/index',
      editor: './editor/static/editor/js/app',
      classroom: './classroom/static/classroom/js/index',
      resources: './resources/static/resources/js/index',
      homepage: './homepage/static/homepage/js/index',
      notifications_inbox: './notifications/static/notifications_inbox/js/index',
      trophy_inbox: './user_reputation/static/trophy_inbox/js/index',
      react_djeedit: './node_modules/@vermus/django-react-djeddit-client/dist/'
      // react_djeedit: '../django-react-djeddit/frontend/django-react-djeddit-client/dist/' // debug
    },

    output: {
      // path: path.resolve('./static/bundles/'),
      path: path.resolve(outputPath),
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-chunk.js'
      // publicPath: (env && 'NODE_ENV' in env && env.NODE_ENV === 'production') ? '/' : '/static/bundles/'
    },

    devtool: 'source-map',

    plugins: MODE === 'production' ? [
      new BundleTracker({filename: './webpack-stats.json'}),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        minChunks: 2 // used at least in 2 modules
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(MODE)
        }
      }),
      new UglifyJsPlugin(), // minify everything
      new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
    ]
      : [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendors',
          minChunks: 2 // used at least in 2 modules
        })
      ],

    module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: [/node_modules/,
            path.resolve(__dirname, '../django-react-djeddit/frontend/django-react-djeddit-client/dist/')],
          query: {
            presets: [
              ['env', {
                'targets': { 'chrome': 41 },
                'uglify': true,
                'useBuiltIns': false
              }],
              'react'
            ]
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
