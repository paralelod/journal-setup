var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('dist-webpack',shell.task(['webpack --config webpack.dist.config.js']));