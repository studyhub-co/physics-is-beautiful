var path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  /* --display-optimization-bailout */

  context: __dirname,

  entry: {
    main: './courses/static/courses/js/index',
    curriculum: './curricula/static/curricula/js/curriculum_app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
    profile_anonymous: './profiles/static/profiles/js/anonymous/profile_modal',
    profile: './profiles/static/profiles/js/authenticated/index',
    editor: './editor/static/editor/js/app',
    classroom: './classroom/static/classroom/js/index',
    resources: './resources/static/resources/js/index',
    // homepage: './homepage/static/homepage/js/index',
    notifications_inbox: './notifications/static/notifications_inbox/js/index',
    trophy_inbox: './user_reputation/static/trophy_inbox/js/index',
    // react_djeddit: './static/js/djedditWraper'
  },

  output: {
    path: path.resolve('./static/js/bundles/'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].js',
    // sandbox require
    jsonpFunction: 'csbJsonP',
    // web pack add publicPath to webpack stat, we need publicPath for codesanbox worker-loaders
    publicPath: '/static/js/bundles/',
    // TODO dev/prod url
    // publicPath: 'https://assets-dev.physicsisbeautiful.com/js/bundles/',
    globalObject: 'this',
  },

  optimization: {
    splitChunks: {
      minChunks: 2, // used at least in 2 modules
      cacheGroups: {
        vendors: {
          // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          test: /[\\/]node_modules[\\/]/,
          // test: function (module, chunks) {
          //   if (module.resource) {
          //     if (['django-react-djeddit-client\\dist', 'django-react-djeddit-client/dist'].some(str => module.resource.includes(str))) {
          //       console.log(module.resource)
          //       return false
          //     }
          //
          //     // include node_modules
          //     if (module.resource.includes('node_modules')) {
          //       return true
          //     }
          //   }
          //   return false
          // },
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
  },

  // additional loading on babel, enable if needed js debug mode
  devtool: 'source-map',

  // show all messages from webpack
  // stats: 'verbose',

  node: {
    // codesandbox part
    setImmediate: false,
    module: 'empty',
    child_process: 'empty',
    // codesanbdox added
    // net: 'empty',
    // tls: 'empty'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          path.resolve(
            __dirname,
            '../django-react-djeddit/frontend/django-react-djeddit-client/dist/', // todo remove this
          ), // dev version
        ],
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.(eot|otf|ttf|woff|woff2)$/,
      //   loader: 'url-loader?limit=1000000',
      // },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              // name: 'static/js/bundles/[name].[hash:8].[ext]',
            },
          },
          { loader: 'svgo-loader' },
        ],
      },
      {
        test: /\.(ico|jpe?g|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        exclude: [/\/favicon.ico$/],
        loader: 'file-loader',
        options: {
          // name: 'static/js/bundles/[name].[hash:8].[ext]',
          name: '[name].[hash:8].[ext]',
        },
      },
      // {
      //   test: /\.jpe?g$|\.gif$|\.png$/,
      //   options: {
      //     name: '[name].[ext]?[hash]'
      //   },
      //   loader: 'file-loader'
      // }
    ],
  },
  resolve: {
    modules: ['static/js/common', 'node_modules', 'bower_components'],
    // extensions: ['.js', '.jsx']
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    symlinks: false,
    alias: {
      // to exclude React versions collisions use React only from /node_modules/
      react: path.resolve('./node_modules/react'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
      'react-redux': path.resolve('./node_modules/react-redux'),
      // NodeJs modules emulators
      fs: path.resolve(
        'courses/static/courses/js/codesandbox-apps/codesandbox-browserfs/dist/shims/fs.js',
      ),
      buffer: path.resolve(
        'courses/static/courses/js/codesandbox-apps/codesandbox-browserfs/dist/shims/buffer.js',
      ),
      processGlobal: path.resolve(
        'courses/static/courses/js/codesandbox-apps/codesandbox-browserfs/dist/shims/process.js',
      ),
      bufferGlobal: path.resolve(
        'courses/static/courses/js/codesandbox-apps/codesandbox-browserfs/dist/shims/bufferGlobal.js',
      ),
      bfsGlobal: path.resolve(
        'courses/static/courses/js/codesandbox-apps/codesandbox-browserfs/dist/browserfs.js',
      ),
      /* bfsGlobal: require.resolve(
        path.join(
          '..',
          '..',
          '..',
          'codesandbox-apps',
          'codesandbox-browserfs',
          'build',
          __DEV__ ? 'browserfs.js' : 'browserfs.min.js'
        )
      ), */
    },
  },
  watchOptions: {
    // fix watch for Windows
    poll: 1000,
  },
}
