var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname),
    entry: {
        'ReactWW-worker': './worker/index.js',
        'ReactWorker': './page/index.js',
    },
    output: {
        filename: '[name]' + '.js',
        path: path.join(__dirname, './../dist'),
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                cacheDirectory: true
            },
        }]
    }
};
