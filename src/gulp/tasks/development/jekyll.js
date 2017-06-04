var gulp = require('gulp');
var lodash = require('lodash');
var shell = require('gulp-shell');
var browsersync = require('browser-sync');
var config = require('../../config').jekyll;

gulp.task('jekyll',shell.task([config.build]));

gulp.task('jekyll-rebuild', ['jekyll'], function() {
  browsersync.reload();
});

gulp.task('theme-rebuild', ['jekyll'], function() {
  browsersync.reload();
});

