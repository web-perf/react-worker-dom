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
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['es2015', 'react', 'stage-0']
            }
        }]
    },
    resolve: {
        alias: {
            'reactworker-onWorker': path.resolve(__dirname, './../src/worker/index.js'),
            'reactworker-onPage': path.resolve(__dirname, './../src/page/index.js'),
        }
    },
};
