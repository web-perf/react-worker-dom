var path = require('path');
module.exports = {
    context: __dirname,
    entry: {
        'todo/server': './server.jsx'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/react-worker-dom/dist'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
        }]
    },
    resolve: {
        alias: {
            'react-worker-dom': path.resolve(__dirname, './../src/page/index.js'),
            'react-worker-dom-worker': path.resolve(__dirname, './../src/worker/index.js')
        }
    },
};
