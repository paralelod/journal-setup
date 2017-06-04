var gulp = require('gulp');
var clean   = require('gulp-clean');
var yamlMerge = require('gulp-yaml-merge');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');
var config = require('../../config').yaml;


gulp.task('yamlDistGhPages', function() {
  runSequence(
      'yaml-clean',
      'yaml-buildDistGhPages'
    );
});

gulp.task('yamlDistHtml', function() {
  runSequence(
    'yaml-clean',
    'yaml-buildDistHtml' 
    );
});

gulp.task('yaml-buildDistGhPages', function() {
  return gulp.src(config.yamlDistGhPagesSrc)
    .pipe(yamlMerge(config.yamlBuild))
    .pipe(gulp.dest(config.pathBuild));
});

gulp.task('yaml-buildDistHtml', function() {
  return gulp.src(config.yamlDistHtmlSrc)
    .pipe(yamlMerge(config.yamlBuild))
    .pipe(gulp.dest(config.pathBuild));
});