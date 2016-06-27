var path = require('path');
module.exports = {
    context: __dirname,
    entry: {
        // DB Monster
        'dbmonster/main-normal': './dbmonster/main-normal.jsx',
        'dbmonster/main-worker': './dbmonster/main-worker.js',
        'dbmonster/worker-impl': './dbmonster/worker-impl.jsx',

        // ToDo App
        'todo/normal': './todo/normal.jsx',
        'todo/worker': './todo/worker.jsx',
        'todo/server': './todo/server.jsx',
        'todo/worker-impl': './todo/worker-impl.jsx'
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
