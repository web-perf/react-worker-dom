var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');

var webpack = require('webpack');
var connect = require('gulp-connect');
var mainJsCfg = require('./webpack.config.js');
var moduleCfg = require('./../../src/webpack.config.js')

function webpack(config, callback) {
    webpack(config, function(callback) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        callback();
    });
}

gulp.task('mainJs', function(callback) {
    webpack(mainJsCfg, callback);
});

gulp.task('moduleJs', function(cb) {
    webpack(moduleCfg, cb);
});

gulp.task('html', function() {
    gulp.src('./index.html').pipe(gulp.dest('../../dist'));
});

gulp.task('watch', function() {
    gulp.watch('**/*.js*', ['mainJs']);
    gulp.watch('./../../src/**/*.js', ['moduleJs']);
    gulp.watch('**/*.html', ['html']);
});

gulp.task('connect', ['build'], function() {
    connect.server({
        root: '../../dist'
    });
});

gulp.task('build', ['html', 'moduleJs', 'mainJs']);
gulp.task('default', ['connect', 'watch']);
