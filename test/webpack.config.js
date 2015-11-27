var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'app'),
    entry: {
        'main.js': './main.jsx',
        'html': './index.html',
        'react-worker-dom.js': './../../src/page/index.js',
    },
    output: {
        filename: '[name]',
        path: path.join(__dirname, '../dist'),
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /.html/,
            loader: 'file',
            query: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react', 'stage-0'],
                cacheDirectory: true
            }
        }]
    },
    plugins: []
};
