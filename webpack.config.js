var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
    context: __dirname,
    entry: {
        'worker': './src/worker/index.js',
        'page': './src/page/index.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname,
        publicPath: '/static/',
        library: 'react-worker-dom',
        libraryTarget: 'umd',
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //   compress: {
        //       warnings: false
        //   }
        // }),
        // new webpack.optimize.DedupePlugin(),
        // new webpack.DefinePlugin({
        //   'process.env': {
        //     'NODE_ENV': JSON.stringify('production')
        //   },
        // })
  ],
};
