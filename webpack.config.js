var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    context: __dirname,

    entry: {
        curriculum: './curricula/static/curricula/js/curriculum_app', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
        profile: './profiles/static/profiles/js/profile_modal',
	editor: './editor/static/editor/js/app',
    },

    output: {
        path: path.resolve('./static/bundles/'),
        filename: "[name]-[hash].js",
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
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
            }
        ],
    },

    resolve: {
        modulesDirectories: ['static/js/common', 'node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    },
    watchOptions: { // fix watch for Windows
        poll: 1000
    }
}
