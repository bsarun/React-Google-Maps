var path = require('path'),
webpack = require('webpack'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin'),
ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
devtool: 'source-map',

entry: {
    /* main entry point for app */
    main: './src/index.jsx'
    },

output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
},
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development'),
            'appConfig': JSON.stringify('development'),
            'basePath': JSON.stringify('')
        }
    }),
    new HtmlWebpackPlugin({
        title: 'Medwing Google Maps',
        template: './src/index.html',
        chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
        {
            from:      'app.development.config.json',
            to:        'config/app.development.config.json',
            transform: (content, path) => 'window.__APP_CONFIG__ = ' + content
        }
    ]),
    // [contenthash] forces the filename to be the hash of the file's contents,
    // guaranteeing a new, cache-busting filename on every build that contains css changes
    new ExtractTextPlugin('css/[contenthash].css', { allChunks: true }),
    // lock dependency loading order
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    /* extract vendor files into chunk */
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
    }),
    /* extract webpack runtime into manifest to avoid the manifest being exported into the vendor output */
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        chunks: ["main", "vendor"],
        minChunks: Infinity
    })
],

module: {
preLoaders: [{
  test:    /\.jsx?$/,
  exclude: [/node_modules/, /build/],
  loader: 'jscs-loader'
}],
loaders: [
  {
    test: /\.jsx?$/,
    include: path.join(__dirname, 'src'),
    loader: 'babel',
    query: { presets: ['es2015', 'react'] }
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
]
},
externals: {
'react/addons': true,
'react/lib/ExecutionEnvironment': true,
'react/lib/ReactContext': true
}
};


