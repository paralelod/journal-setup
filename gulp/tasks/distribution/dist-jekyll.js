var gulp 	= require('gulp');
var shell   = require('gulp-shell');
var clean   = require('gulp-clean');
var runSequence = require('run-sequence');
var config = require('../../config').jekyll;

gulp.task('dist-jekyll', function() {
  runSequence(
    // 'dist-jekyll-clean',
    'dist-jekyll-copy',
    'dist-jekyll-build'
    );
});

gulp.task('dist-jekyll-copy', function() {
  return gulp.src(config.jekyllSrcDist)
 .pipe(gulp.dest(config.jekyllPathDist));
});

gulp.task('dist-jekyll-build',shell.task(config.jekyllBuildDist));



gulp.task('dist-html-copy', function() {
  return gulp.src(config.jekyllSrcDist)
 .pipe(gulp.dest(config.htmlPathDist));
});


gulp.task('dist-html-build',shell.task(config.htmlBuildDist));

gulp.task('default', function () {
    return gulp.src('app/tmp', {read: false})
        .pipe(clean());
});

gulp.task('dist-html-clean',shell.task('rm -rf '+config.htmlPathDist));