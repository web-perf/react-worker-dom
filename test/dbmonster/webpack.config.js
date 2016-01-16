var path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        'main-normal': './main-normal.jsx',
        'main-worker': './main-worker.js',
        'worker-impl': './worker-impl.jsx'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../../dist'),
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
        }]
    }
};
